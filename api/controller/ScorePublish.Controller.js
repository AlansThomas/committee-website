const NotificationModel = require("../models/Notification.Model");
const totalPoint = require("../models/TotalPoint.Model")
const totalPointBackup = require("../models/TotalPointBackup.Model")
const logger = require('../utils/logger.utils');


exports.addSumTable = (async (req, res) => {
    try {
        const functions = async () => {
            let options = { upsert: true };
            await NotificationModel.insertMany([{ "Message": "Admin published new points ", "verifyNotif": 1 }], options)
                .catch((err) => {
                    res.status(400).send(err)
                })
        }

        await totalPoint.updateMany({ GroupId: { $in: req.body.list } },
            { $set: { PublishByCommittee: true, RemoveFromPublish: 0 } }).then(async () => {

                const totalPointId = await totalPoint.find({ _id: { $in: req.body.firstcity } }).exec();
                if(totalPointId.length<=0){
                    return res.status(400).send("totalPoints is empty")
                }

                totalPointId.forEach((element) => {

                    totalPointBackup.updateMany({ TotalPointId: element._id }, {
                        $set: {
                            TotalPoint: element.TotalPoint, NotVerify: false, PostpondPublish: false,
                            PublishByCommittee: true, PublishToInnovature: true, RemoveFromPublish: 0
                        }
                    }).exec();

                })
                await functions();


             return   res.status(200).send("updated")

            }).catch((er) => {

                logger.error(`${er.status || 500} - 'error' - ${er.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
                res.status(400).send(er);
            })
    }
    catch (e) {
        res.status(401).send(e)
    }
})



exports.findSumTable = (req, res) => {
    try {
        totalPoint.aggregate([
            { $match: { PublishByCommittee: true, NotVerify: false, PublishToInnovature: true, PostpondPublish: false } },
            {
                $group: {
                    _id: {

                        "GroupId": "$GroupId"
                    }, TotalPoint: { $sum: "$TotalPoint" }, "first_city": { $first: "$_id" }
                }
            },
            { $sort: { "TotalPoint": -1 } },
            {
                $lookup: {
                    from: "groups", localField: "_id.GroupId", foreignField: "_id", as: "grouplist"
                }
            }
        ]).then(result => {
            res.status(200).send(result)
        })
    } catch (error) {
        res.status(401).send(error)
    }
}





exports.topThreeGroups = async (req, res) => {
    const totalpoints = await totalPoint.aggregate([
        {
            $match: {
                $and: [
                    { PublishByCommittee: true },
                    { NotVerify: false },
                    { PublishToInnovature: true },
                    { PostpondPublish: false }
                ]
            }
        },
        {
            $group: {
                _id: { "GroupId": "$GroupId" },
                TotalPoint: { $sum: "$TotalPoint" },
                TotalPointId: { $first: "$_id" }
            }
        },
        { $sort: { TotalPoint: -1 } },
        { $lookup: { from: "groups", localField: "_id.GroupId", foreignField: "_id", as: "grouplist" } }
    ]).catch((error) => {
        logger.error(`${error.status || 500} - 'error' - ${error.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        res.status(400).send(error)
    })

    if (totalpoints) {

        let positions = {};
        let rank = 0;
        let prevScore = -1;

        totalpoints.forEach((item) => {
            let currentScore = item.TotalPoint;

            if (currentScore != prevScore) {
                rank++;
            }
            positions[item._id.GroupId] = rank;
            prevScore = currentScore;
        });

        const groupsWithPosition = totalpoints.map((item) => {
            return {
                _id: item._id,
                TotalPointId: item.TotalPointId,
                Position: positions[item._id.GroupId],
                TotalPoint: item.TotalPoint,
                grouplist: item.grouplist,
            };
        });
        res.status(200).send(groupsWithPosition);
    }
}
