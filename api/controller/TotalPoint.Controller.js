const totalPoint = require("../models/TotalPoint.Model")
const totalPointBackup = require("../models/TotalPointBackup.Model")
const mongoose = require('mongoose')
const joi = require('@hapi/joi')
const groupTable = require("../models/Groups.Model")
const eventTable = require("../models/Event.Model")
const userTable = require("../models/User.Model")
const logger = require('../utils/logger.utils');
const isodate = require('isodate')
const event = require("../models/Event.Model");
let cron = require('node-cron');
const totalPointHistory = require("../models/TotalPointHistory.Model")
const NotificationModel = require("../models/Notification.Model");
const { check } = require("express-validator")
const VerifyModel = require("../models/Verify.Model")
const { base } = require("../models/TotalPoint.Model")
const { validationResult } = require("express-validator");
const ReportModel = require("../models/Report.Model")
const EventModel = require("../models/Event.Model")
const QuarterModel = require("../models/Quater.Model")
const TotalPointModel = require("../models/TotalPoint.Model")




exports.GetTotalPointPublishToInovature = (async (req, res) => {
    try {
        await totalPoint.aggregate([
            { $match: { GroupWisePublish: true } },
            {
                $group: {
                    _id: {
                        "GroupId": "$GroupId"
                    }, count: { $sum: "$TotalPoint" }
                }
            },
            { $sort: { "count": -1 } },
            {
                $lookup: {
                    from: "groups", localField: "_id.GroupId", foreignField: "_id", as: "grouplist"
                }
            }
        ]).then(async (response) => {
            res.status(200).send(response)
        })
    }
    catch (err) {
        logger.error(`${err.status || 500} - 'error' - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        res.status(400).send(err)
    }
})



exports.updateAll = async (req, res) => {
    try {
        const list = req.body.Data;
        const listForJson = [];
        let sendDate = new Date();
        let expectedDate = new Date(new Date().setDate(new Date().getDate() + 7))
        let elapsedDate = new Date(new Date().setDate(new Date().getDate() + 8))

        for (const element of list) {
            const data1 = {

                "EventId": req.body.EventId,
                "GroupId": req.body.GroupId,
                "GameId": element.GameId,
                "TotalPoint": element.TotalPoint

            }
            listForJson.push(data1)
        }
        for (const element of listForJson) {
            const data2 = {

                "EventId": req.body.EventId,
                "GroupId": req.body.GroupId,
                "GameId": element.GameId,
                "TotalPoint": element.TotalPoint

            }
            const eventQuarter =  await EventModel.findById(req.body.EventId, { QuarterId: true }).exec()
            await totalPoint.find({ UniqueKeyEv: req.body.EventId, UniqueKeyGp: req.body.GroupId, UniqueKeyGm: element.GameId })
                .then((response) => {
                    totalPoint.findByIdAndUpdate(response[0]._id, {
                        TotalPoint: data2.TotalPoint, NotVerify: true, QuarterId: eventQuarter.QuarterId,
                        PostpondPublish: true, PublishByCommittee: false, PublishToInnovature: false,
                        DateSendForVerification: sendDate, ExpectedDateOfVerification: expectedDate, ElapsedDate: elapsedDate
                    }).catch((error) => {
                        logger.error(`${error.status || 500} - 'error' - ${error.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
                        res.status(400).send(error)
                    })
                    backUpTotalPoints(req, res);
                })
        }
        return res.status(200).send("Points Updated")
    }
    catch (e) {
        logger.error(`${e.status || 500} - 'error' - ${e.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        res.status(400).send(e)
    }
}



async function backUpTotalPoints(req, res) {
    try {

        const list = req.body.Data;
        const listForJson = [];
        let sendDate = new Date();
        let expectedDate = new Date(new Date().setDate(new Date().getDate() + 7))
        let elapsedDate = new Date(new Date().setDate(new Date().getDate() + 8))

        for (const element of list) {
            const data1 = {

                "EventId": req.body.EventId,
                "GroupId": req.body.GroupId,
                "GameId": element.GameId,
                "TotalPoint": element.TotalPoint

            }
            listForJson.push(data1)
        }
        for (const element of listForJson) {

            const eventQuarter =  await EventModel.findById(req.body.EventId, { QuarterId: true }).exec()
            await totalPointBackup.find({ UniqueKeyEv: req.body.EventId, UniqueKeyGp: req.body.GroupId, UniqueKeyGm: element.GameId })
                .then((response) => {
                    totalPointBackup.findByIdAndUpdate(response[0]._id, {
                        NotVerify: true, PostpondPublish: true, QuarterId: eventQuarter.QuarterId,
                        PublishByCommittee: false, PublishToInnovature: false,
                        DateSendForVerification: sendDate,
                        ExpectedDateOfVerification: expectedDate, ElapsedDate: elapsedDate
                    }).exec()
                })
        }

        let options = { upsert: true };
        await groupTable.findById(req.body.GroupId)
        .then(async (data) => {
            await NotificationModel.insertMany([
                { "Message": "Admin updated new point for Group " + data.GroupName, "verifyNotif": 1 
            }], options)
        })
    }
    catch (e) {
        logger.error(`${e.status || 500} - 'error' - ${e.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        res.status(400).send(e)
    }
}







exports.findByGIdAndEvntId = ((req, res) => {
    try {

        const cd = new Date();
        const str = cd.toLocaleDateString('en-CA', { timeZone: 'Asia/Kolkata' });
        let list = [];
        totalPoint.aggregate([
            {
                $match: {
                    EventId: new mongoose.Types.ObjectId(req.body.EventId),
                    GroupId: new mongoose.Types.ObjectId(req.body.GroupId),
                    Public: false
                }
            },
            {
                $lookup: {
                    from: "games", localField: "GameId", foreignField: "_id", as: "gamelist"
                }
            }
        ]).then((response) => {
            for (let game of response) {
                let sd = game.gamelist[0].StartDate.toISOString().split('T', 1)[0];
                if (str >= sd) {
                    list.push(game)
                }
            }
            res.status(200).send(list)
        }).catch((error) => {
            logger.error(`${error.status || 500} - 'error' - ${error.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
            res.status(400).send(error)
        })
    } catch (e) {
        res.status(400).send(e)
    }
})






exports.findByGIdAndEvntIdAndSumEventWise1 = (async (req, res) => {

    try {
        await totalPoint.aggregate([
            {
                $group: {
                    _id: {
                        "EventId": "$EventId",
                        "GroupId": "$GroupId"
                    }, count: { $sum: "$TotalPoint" }
                }
            },
            { $sort: { "count": -1 } },
            {
                $lookup: {
                    from: "groups", localField: "_id.GroupId", foreignField: "_id", as: "grouplist"
                }
            },
            {
                $lookup: {
                    from: "events", localField: "_id.EventId", foreignField: "_id", as: "eventlist"
                }
            }
        ]).then(async (response) => {
            res.status(200).send(response)
        }).catch((error) => {
            logger.error(`${error.status || 500} - 'error' - ${error.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
            res.status(400).send(error)
        })

    } catch (e) {
        res.status(400).send(e)
    }
})


exports.findByGIdAndEvntIdAndSumEventWise2 = (async (req, res) => {
    let list = [];
    let list2 = [];
    let Event = "";
    let Group = '';
    list = req.body;

    try {
        for (const element of list) {
            await groupTable.findById(element._id.GroupId).then((response) => {
                Group = response
            })
            await eventTable.findById(element._id.EventId).then((response) => {

                Event = response
                let data = { "GroupDetails": Group, "TotalPoint": element.count, "EventDetails": Event }
                list2.push(data);
            })
        }
        res.status(200).send(list2)
    } catch (error) {
        logger.error(`${error.status || 500} - 'error' - ${error.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        res.status(400).send(error)
    }
})



exports.findByGIdAndEvntIdAndSumGroupWise1 = (async (req, res) => {
    try {

        await totalPoint.aggregate([
            {
                $match: {
                    $and: [
                        { "PublishToInnovature": true },
                        { "PublishByCommittee": true },
                        { "NotVerify": false },
                        { "PostpondPublish": false },
                        { "RemoveFromPublish": 0 },
                        { "Delete": 0 },
                    ]

                }
            },
            {
                $group: {
                    _id: {

                        "GroupId": "$GroupId"
                    }, count: { $sum: "$TotalPoint" }, "first_city": { $first: "$_id" }
                }
            }, { $sort: { "count": -1 } },
            {
                $lookup: {
                    from: "groups", localField: "_id.GroupId", foreignField: "_id", as: "grouplist"
                }
            }
        ]).then(async (response) => {
            res.status(200).send(response)
        })
    }
    catch (e) {
        logger.error(`${e.status || 500} - 'error' - ${e.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        res.status(400).send(e)
    }

})



exports.findByGIdAndEvntIdAndSumGroupWiseforpublish = (async (req, res) => {
    try {
        await totalPoint.aggregate([
            { $match: { PublishToInnovature: true, RemoveFromPublish: 1 } },
            {
                $group: {
                    _id: {

                        "GroupId": "$GroupId"
                    }, count: { $sum: "$TotalPoint" }, "first_city": { $first: "$_id" },
                    VerifiedBy: { $first: "$VerifiedBy" }
                }
            },
            { $sort: { "count": -1 } },
            {
                $lookup: {
                    from: "groups", localField: "_id.GroupId", foreignField: "_id", as: "grouplist"
                }
            },
            {
                $project: {
                    count: 1,
                    VerifiedBy: 1,
                    first_city: 1,
                    "grouplist.GroupName": 1
                }
            }
        ]).then(async (response) => {
            res.status(200).send(response)
        })
    } catch (error) {
        logger.error(`${error.status || 500} - 'error' - ${error.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        res.status(400).send(error)
    }

})



exports.findByGIdAndEvntIdAndSumEventWise1Winner = (async (req, res) => {
    const cd = new Date();
    const list = [];
    const Events = await event.find({
        EndDate: {
            $lte: cd,
            $lt: isodate('2024-01-15')

        }, Delete: 0
    }).exec()

    try {
        let Data = [];

        let highestScore;
        const findData = async (data) => {
            data.forEach(element => {
                Data.push(element.count)

            });

            highestScore = Math.max(...Data);
            return data.filter(item => item.count == highestScore);

        }

        for (let evnt of Events) {
            await totalPoint.aggregate([
                {
                    $match: {
                        $and: [
                            { "EventId": new mongoose.Types.ObjectId(evnt._id) },
                            { "PublishToInnovature": true },
                            { "PublishByCommittee": true },
                            { "NotVerify": false },
                            { "PostpondPublish": false },
                            { "RemoveFromPublish": 0 },
                            { "Delete": 0 },
                        ]
                    }
                },
                {
                    $group: {
                        _id: {
                            "EventId": evnt._id,
                            "GroupId": "$GroupId"
                        }, count: { $sum: "$TotalPoint" }
                    }
                },
                { $sort: { "count": -1 } },
                {
                    $lookup: {
                        from: "groups", localField: "_id.GroupId", foreignField: "_id", as: "grouplist"
                    }
                }
            ]).then(async (response) => {
                let responseBack = await findData(response)
                let data = { EventName: evnt.EventName, WinnerDEtails: responseBack }
                list.push(data)
            }).catch((error) => {
                res.status(400).send(error)
            })
        }
        const updatedEvents = list.filter(eventWinner => eventWinner.WinnerDEtails.length > 0);
        res.status(200).send(updatedEvents)
    }
    catch (e) {
        res.status(400).send(e)
    }
})





exports.findByGIdAndEvntIdAndSumEventWise1Winners = (async (req, res) => {
    const REventId = req.params.id
    try {

        await totalPoint.aggregate([
            {
                $match: {
                    $and: [
                        { "EventId": new mongoose.Types.ObjectId(REventId) },
                        { "PublishToInnovature": true },
                        { "PublishByCommittee": true },
                        { "NotVerify": false },
                        { "PostpondPublish": false },
                        { "RemoveFromPublish": 0 },
                        { "Delete": 0 },
                    ]
                }
            },
            {
                $group: {
                    _id: {
                        "EventId": REventId,
                        "GroupId": "$GroupId"
                    }, count: { $sum: "$TotalPoint" }
                }
            },
            { $sort: { "count": -1 } },
            {
                $lookup: {
                    from: "groups", localField: "_id.GroupId", foreignField: "_id", as: "grouplist"
                }
            }
        ]).then(async (response) => {
            res.status(200).send(response)
        })
    } catch (error) {
        logger.error(`${error.status || 500} - 'error' - ${error.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        res.status(400).send(error)
    }
})



exports.findByGIdAndEvntIdAndSumGrouptWise2 = (async (req, res) => {
    let list = [];
    let list2 = [];
    let Group = '';
    list = req.body;
    try {

        let Data = [];
        let highestScore;
        const findData = async (data) => {
            data.forEach(element => {
                Data.push(element.TotalPoint)
            });
            highestScore = Math.max(...Data);
            return data.map((item) => {
                if (item.TotalPoint === highestScore) {
                    return {
                        _id: item._id,
                        TotalPoint: item.TotalPoint,
                        Winner: "yes",
                        GroupDetails: item.GroupDetails
                    };
                } else {
                    return item;
                }
            }).filter((item) => item !== null);

        };

        for (const element of list) {

            await groupTable.findById(element._id.GroupId).then((response) => {
                Group = response
                let data = { "GroupDetails": Group, "TotalPoint": element.count }
                list2.push(data);
            })

        }
        let responseBack = await findData(list2)
        res.status(200).send(responseBack)

    } catch (error) {
        logger.error(`${error.status || 500} - 'error' - ${error.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        res.status(400).send(error)
    }
})


exports.publish = async (req, res) => {

    try {
        let i = 1;
        Totalpointdata.forEach(function (obj) {
            totalPoint.findByIdAndUpdate({ _id: obj._id }, { $set: { Public: true } }).then((response) => {
                i = i + 1;
                {
                    if (i === Totalpointdata.length) {
                        res.send("saved")
                    }
                }
            }).catch((error) => {
                logger.error(`${error.status || 500} - 'error' - ${error.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
                res.status(400).send(error)
            })
        })

    }
    catch (e) {
        res.status(401).send(e)
    }
}





cron.schedule('0 0 * * *', async function () {
    try {
        let notifyList = []
        let setList = []
        const cd = new Date();
        const str = cd.toLocaleDateString('en-CA', { timeZone: 'Asia/Kolkata' });
        const committee = await groupTable.findOne({ GroupType: 1, Delete: 0 }, { _id: 1 }).exec();
        const totalpointsUnverified = await totalPoint.find({ PostpondPublish: true }).exec();
        await Promise.all(totalpointsUnverified.map(async (element) => {
            if (element.ExpectedDateOfVerification.toISOString().split('T', 1)[0] == str) {

                const group = await groupTable.findById(element.GroupId, { GroupName: true }).exec()
                setList = { Message: "", TotalPointId: "", TotalPoint: "", CommitteeId: "", PointVerificationRead: "", verifyNotif: 1 }
                setList.Message = "Last day for verification ! ! !. Please verify the point " + element.TotalPoint + " of " + group.GroupName + " by end of the day, else the points will be reverted back.";
                setList.TotalPointId = element._id;
                setList.TotalPoint = element.TotalPoint;
                setList.CommitteeId = committee._id.valueOf();
                setList.PointVerificationRead = 0;
                setList.verifyNotif = 1
                notifyList.push(setList)
            }
        }))
        let options = { upsert: true };
        await NotificationModel.insertMany(notifyList, options).catch((error) => {
            console.log(error);
        })

        const updates = totalpointsUnverified.map(async (element) => {
            if (element.ElapsedDate.toISOString().split('T', 1)[0] == str) {
                const backupPoint = await totalPointBackup.findOne({ TotalPointId: element._id }).exec()
                return totalPoint.updateOne({ _id: element._id }, {
                    $set: {
                        TotalPoint: backupPoint.TotalPoint, PostpondPublish: false, DateSendForVerification: "2000-02-01T13:35:06.054+00:00",
                        ExpectedDateOfVerification: "2000-02-01T13:35:06.054+00:00", ElapsedDate: "2000-02-01T13:35:06.054+00:00"
                    }
                }).catch((error) => {
                    logger.error(`${error.status || 500} - 'error' - ${error.message}`);
                    res.status(400).send(error)
                })
            }
        })

        await Promise.all(updates);

    }
    catch (e) {
        logger.error(`${e.status || 500} - 'error' - ${e.message}`);
        console.log(e);
    }
})



exports.getpublishtoCommitty = async (req, res) => {
    try {
        totalPoint.aggregate([{ $match: { PostpondPublish: true, Delete: 0, PublishToInnovature: false } },
        { $sort: { "updatedAt": -1 } },
        {
            $lookup: {
                from: "events", localField: "EventId", foreignField: "_id", as: "Eventlist"
            }
        },
        {
            $lookup: {
                from: "groups", localField: "GroupId", foreignField: "_id", as: "grouplist"
            }
        },
        {
            $lookup: {
                from: "games", localField: "GameId", foreignField: "_id", as: "gameList"
            }
        },
        {
            "$project": {
                "_id": 1,
                "TotalPoint": 1,
                "gameList.GameName": 1,
                "grouplist.GroupName": 1,
                "Eventlist.EventName": 1,
            }
        },
        ]).then((response) => {
            res.status(200).send(response)
        }).catch((error) => {
            res.status(401).send(error)
        })
    }
    catch (e) {
        logger.error(`${e.status || 500} - 'error' - ${e.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        res.status(400).send(e)
    }
}




exports.notverifiedPoint = (req, res) => {
    try {
        totalPoint.findByIdAndUpdate(req.params.id, { $set: { Report: req.body.Report, NotVerify: true, PostpondPublish: true } }).then((data) => {
            res.status(200).send(data)
        }).catch((error) => {
            logger.error(`${error.status || 500} - 'error' - ${error.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
            res.status(400).send(error)
        })
    }
    catch (e) {
        logger.error(`${e.status || 500} - 'error' - ${e.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        res.status(401).send(e)
    }

}



exports.PublishToInnovature = (req, res) => {
    try {
        totalPoint.findByIdAndUpdate(req.params.id, { $set: { NotVerify: false, PostpondPublish: false, PublishToInnovature: true } }).then((data) => {
            res.status(200).send(data)
        }).catch((error) => {
            logger.error(`${error.status || 500} - 'error' - ${error.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
            res.status(401).send(error)
        })
    }
    catch (e) {
        logger.error(`${e.status || 500} - 'error' - ${e.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        res.status(401).send(e)
    }
}


exports.verifiedPoint = (req, res) => {
    try {
        const date = new Date();
        const lastDate = new Date(date.getTime() + (7 * 24 * 60 * 60 * 1000));

        const checkpoint = (async () => {
            VerifyModel.aggregate([{
                $match: { "PointId": new mongoose.Types.ObjectId(req.params.id) }
            }]).then((response) => {
                if (response.length !== 0) {
                    VerifyModel.updateOne({ "PointId": req.params.id }, { $set: { StartDate: date, EndDate: lastDate } }).then((resp) => {
                        return true
                    })
                }
                else {
                    const verifypoint = new VerifyModel({ "PointId": req.params.id, StartDate: date, EndDate: date })
                    VerifyModel.create(verifypoint).then(() => {
                        return true
                    })

                }
            })
        })


        totalPoint.findByIdAndUpdate(req.params.id, { $set: { NotVerify: false, PublishToInnovature: true, PostpondPublish: false, RemoveFromPublish: 1, Report: null, VerifiedBy: req.User.UserName } }).then(async (data) => {
            await checkpoint();
            res.status(200).send(data)
        }).catch((error) => {
            logger.error(`${error.status || 500} - 'error' - ${error.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
            res.status(401).send(error)
        })
    }
    catch (e) {
        logger.error(`${e.status || 500} - 'error' - ${e.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        res.status(401).send(e)
    }
}



exports.quaterlyReset = async (req, res) => {
    try {

        const currentDate = new Date()
        const dates = currentDate.toISOString().split("T")[0]
        const quater = await QuarterModel.findOne({ $and: [{ Status: 1 }, { _id: req.body.quarterId }] })
        if (!quater) {
            res.status(400).send().json({
                errorCode: 404,
                errMsg: "quater not found"
            })
        }
        if (dates <= quater.EndDate.toISOString().split("T")[0]) {
            return res.status(400).json({
                errorCode: 404,
                errMsg: "Can only reset after the end date"
            })

        }

        let quarterlyPoints = await totalPoint.find({ QuarterId: req.body?.quarterId }).exec();
        console.log(quarterlyPoints,"+++++++++++++++++++");

        const totalPointHistoryUpdated = await totalPointHistory.insertMany(quarterlyPoints).catch((error) => {
            console.log(error);
        })
        if (totalPointHistoryUpdated) {
            console.log("Previous quarter points added to history");
            const totalPointClearance = await totalPoint.deleteMany({ QuarterId: req.body?.quarterId }).catch((error) => {
                console.log(totalPointClearance, "2");
                console.log(error);
            })
            if (totalPointClearance) {
                quater.ResetStatus = 0
                await quater.save();
                res.status(200).send("Quaterly Reseted")
            }
        }

    }
    catch (e) {
        console.log(e);
    }
}


cron.schedule('* * * * * *', async function () {
    const today = new Date();
    await VerifyModel.find({ EndDate: { $gt: today } }).then(async (resp) => {
        let list = [];
        list = resp;
        for (const element of list) {

            await VerifyModel.deleteMany({ EndDate: { $gt: today } }).then((res) => {
                console.log("deleted");
            }).catch((err) => {
                logger.error(`${err.status || 500} - 'error' - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);

            })
            await totalPoint.findByIdAndUpdate({ _id: element.PointId }, { $set: { PostpondPublish: true, PublishToInnovature: false } })
                .then((data) => {
                    logger.info(`${data || 200}`);
                }).catch((error) => {
                    logger.error(`${error.status || 500} - 'error' - ${error.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
                })
        }
    })
})




exports.eventWisePerformanceOfOwnGroup = (async (req, res) => {
    try {
        const promises = [];
        const groupWisePoints = [];
        const user = await userTable.findById(req.User._id, { _id: true, GroupId: true }).exec();
        const events = await eventTable.find({ Delete: 0 }).exec();
        events.forEach(async (eventDetails) => {
            const promise = await totalPoint.aggregate([
                {
                    $match:
                    {
                        "GroupId": new mongoose.Types.ObjectId(user.GroupId),
                        "PublishToInnovature": true,
                        "PublishByCommittee": true,
                        "NotVerify": false,
                        "PostpondPublish": false,
                        'Delete': 0,
                    }
                },
                {
                    $sort: { "createdAt": -1 }
                },
                {
                    $group:
                    {
                        _id: {
                            "GroupId": "$GroupId",
                            "EventId": eventDetails._id
                        }, TotalPoint: { $sum: "$TotalPoint" }
                    }
                },
                {
                    $lookup: {
                        from: "groups", localField: "_id.GroupId", foreignField: "_id", as: "grouplist"
                    }
                },
                {
                    $lookup: {
                        from: "events", localField: "_id.EventId", foreignField: "_id", as: "eventlist"
                    }
                },
                {
                    $project: {
                        TotalPoint: 1,
                        "eventlist.EventName": 1,
                        "grouplist.GroupName": 1

                    }
                }
            ]).exec();
            promises.push(promise);
        })

        Promise.all(promises).then((data) => {


            data.forEach((groupData) => {
                groupWisePoints.push(groupData);
            });
            res.status(200).send(groupWisePoints)

        }).catch((error) => {
            logger.error(`${error.status || 500} - 'error' - ${error.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
            res.status(400).send(error);
        })
    }
    catch (e) {
        logger.error(`${e.status || 500} - 'error' - ${e.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        res.status(400).send(e);
    }
})


exports.reportedPoints = (req, res) => {
    try {
        totalPoint.aggregate([
            {
                $match: {
                    Delete: 0,
                    NotVerify: true,
                    PostpondPublish: true,
                    Report: { $ne: null }
                }
            },
            {
                $lookup: {
                    from: "games", localField: "GameId", foreignField: "_id", as: "gameList"
                }
            },
            {
                $lookup: {
                    from: "events", localField: "EventId", foreignField: "_id", as: "Eventlist"
                }
            },
            {
                $lookup: {
                    from: "groups", localField: "GroupId", foreignField: "_id", as: "grouplist"
                }
            },
            {
                $project: {
                    TotalPoint: 1,
                    Report: 1,
                    "gameList.GameName": 1,
                    "Eventlist.EventName": 1,
                    "grouplist.GroupName": 1
                }
            }
        ]).then((data) => { res.status(200).send(data) })
            .catch((error) => {
                logger.error(`${error.status || 500} - 'error' - ${error.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
                res.status(400).send(error)
            })
    }
    catch (e) {
        logger.error(`${e.status || 500} - 'error' - ${e.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        res.status(400).send(e)
    }
}


exports.deletePointsByAdminBeforePublishing = (async (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.send(errors.errors[0].msg);
        }

        const backupData = await totalPointBackup.find({ TotalPointId: req.params.id }).exec()
        const backupPoint = backupData[0];
        const update = await totalPoint.updateOne({ _id: req.params.id }, {
            $set: {
                TotalPoint: backupPoint.TotalPoint, PostpondPublish: false, PublishToInnovature: true, NotVerify: false,
                PublishByCommittee: true, RemoveFromPublish: 0, DateSendForVerification: "2000-02-01T13:35:06.054+00:00",
                ExpectedDateOfVerification: "2000-02-01T13:35:06.054+00:00", ElapsedDate: "2000-02-01T13:35:06.054+00:00"
            }
        }).catch((error) => {
            logger.error(`${error.status || 500} - 'error' - ${error.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
            res.status(400).send(error)
        })
        if (update.modifiedCount == 1) {
            res.status(200).send("Points Reverted")
        }
        else {
            res.status(401).send("Points Reverting Failed")
        }
    }
    catch (e) {
        logger.error(`${e.status || 500} - 'error' - ${e.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        res.status(400).send(e)
    }
})


exports.quarterWisePoints = async (req, res) => {
    try {
        const quarterDetails = await QuarterModel.findById(req.params.quarterId).exec()
        if (!quarterDetails) {
            return res.status(400).send({
                errCode: 1000,
                errMsg: "No Quarter Found"
            })
        }
        const quarterlyGroupWisePoints = await totalPointHistory.aggregate([
            {
                $match: {
                    $and: [
                        { "QuarterId": new mongoose.Types.ObjectId(quarterDetails._id) },
                        { "PublishToInnovature": true },
                        { "PublishByCommittee": true },
                        { "NotVerify": false },
                        { "PostpondPublish": false },
                        { "RemoveFromPublish": 0 },
                        { "Delete": 0 },
                    ]
                }
            },
            { $sort: { "createdAt": -1 } },
            {
                $group: {
                    _id: {
                        "GroupId": "$GroupId",
                        "QuarterId": "$QuarterId",
                    }, TotalPoint: { $sum: "$TotalPoint" },
                }
            },
            { $sort: { TotalPoint: -1 } },
            {
                $lookup: {
                    from: "groups", localField: "_id.GroupId", foreignField: "_id", as: "groupDetails"
                }
            },
            {
                $lookup: {
                    from: "quarters", localField: "_id.QuarterId", foreignField: "_id", as: "quarterDetails"
                }
            },
            {
                $project: {
                    _id: 1,
                    "groupDetails.GroupName": 1,
                    TotalPoint: 1,
                    "quarterDetails.QuaterNumber": 1,
                    "quarterDetails.QuaterYear": 1

                }
            }
        ]).exec()
        if (quarterlyGroupWisePoints) {
            res.status(200).send(quarterlyGroupWisePoints)
        }
    }
    catch (error) {
        console.log(error);
        res.status(400).send(error)
    }

}