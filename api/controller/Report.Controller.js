const Report = require("../models/Report.Model");
const logger = require('../utils/logger.utils');
const { validationResult } = require("express-validator");
const NotificationModel = require("../models/Notification.Model");
const PostModel = require("../models/Post.Model");
const ReportModel = require("../models/Report.Model");
exports.createReport = async(req, res) => {
    const errors = validationResult(req)
    const sendReport = async (request, response) => {
        let notificationModelSchema = new NotificationModel({ "PostId": request.body.PostId, "Message": request.body.Message, "Status": 1 })
       await NotificationModel.create(notificationModelSchema).catch((err) => {
            response.status(400).send(err)
        })
    }
    const deletePost = async (request, responsep) => {
      await ReportModel.countDocuments({ "PostId": request.body.PostId }).then((response) => {
            switch (response) {
                case 50:
                    PostModel.deleteOne({ "_id": request.body.PostId }).then((resp) => {
                        NotificationModel.deleteMany({ PostId: new mongoose.Types.ObjectId(request.body.PostId) }).then(() => {
                            responsep.status(200).send("deleted")
                        })
                    })
                    break;

                case 0:
                    break;

                default:
                    break;

            }
        })
    }
    if (!errors.isEmpty()) {

        return res.status(400).send(errors.errors[0].msg);
    }
    const reportSchema = new Report({ "PostId": req.body.PostId, "Message": req.body.Message, "ReportedUser": req.User._id, "Read": 1 })
  await  Report.create(reportSchema).then(async (resp) => {
        await sendReport(req, res);
        await deletePost(req, res);
        res.status(200).send("Report Submitted")
    }).catch((error) => {
        logger.error(`${error.status || 500} - 'error' - ${error.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        res.status(400).send(error)
    })
}


exports.findReport = async(req, res) => {
    try {
      await Report.aggregate([
            {
                $match: { Delete: 0 }
            },
            {
                $sort: { "createdAt": -1 }
            },
            {
                $lookup: {
                    from: "posts",
                    localField: "PostId",
                    foreignField: "_id",
                    as: "Postlist"
                }
            },
            {
                $lookup: { from: "userstables", localField: "ReportedUser", foreignField: "_id", as: "userlist" }
            },
            {
                $project: {
                    "userlist.Password": 0,
                    "userlist.Otp": 0,
                    "userlist.GroupRole": 0,
                    "userlist.Designation": 0,
                    "userlist.Delete": 0,
                    "userlist.GroupId": 0,
                    "userlist.CommitteeId": 0,
                    "userlist.CommitteeRole": 0,
                    "userlist.PasswordChange": 0,
                    "PostedUser": 0,
                    "Postlist.PersonalTags": 0,
                    "Postlist.GroupTags": 0,
                    "Postlist.Delete": 0,
                    "userlist.createdAt": 0,
                    "userlist.updatedAt": 0,
                    "userlist.GroupCreateDate": 0,
                    "userlist.CommitteCreateDate": 0,
                },
            }
        ]).then(async (response) => {
           

            
            await Report.aggregate([
                {
                    "$match": { 'Read': 1 }
                },
                { $group: { _id: null, count: { $sum: 1 } } }
            ]).then((resp) => {
                
                    const reversedResponse = response.reverse();
                    
                    let list = [];
                    list.push(resp);
                 

                    list.push(reversedResponse);
                   
                   res.status(200).send(list)
                  
            })
        }).catch((error) => {
           
            logger.error(`${error.status || 500} - 'error' - ${error.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
            res.status(401).send(error)
        })
    } catch (e) {
       

        logger.error(`${e.status || 500} - 'error' - ${e.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        res.status(400).send(e)
    }
}


exports.reedReport = (req, res) => {
    try {
        ReportModel.findOneAndUpdate({ $and: [{ _id: req.params.id }, { Delete: 0 }] }, { $set: { Read: 0 } }).then((resp) => {
            res.status(200).send(resp)
        })
    } catch (error) {
        logger.error(`${error.status || 500} - 'error' - ${error.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        res.status(400).send(error)
    }
}
