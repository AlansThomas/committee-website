const exp = require("express");
const Poll = require("../models/Poll.Model");
const User = require("../models/User.Model");
const NotificationModel = require("../models/Notification.Model")
const app = exp();
const bdyp = require('body-parser')
const bodyParser = require('body-parser')
app.use(bdyp.json())
app.use(bodyParser.urlencoded({ extended: true }))
const logger = require('../utils/logger.utils');
let cron = require('node-cron');
const { error } = require("../utils/logger.utils");
const { validationResult } = require('express-validator')
const mongoose = require('mongoose')


cron.schedule('0 0 * * *', async function () {
    try {
        const cd = new Date();
        const str = cd.toLocaleDateString('en-CA', { timeZone: 'Asia/Kolkata' });
        const currentDate = new Date(str).getTime();


        Poll.find({}).then((data) => {

            data.forEach(async (element) => {


                let sd = element.StartDate.toISOString().split('T', 1)[0];
                let beginDate = new Date(sd).getTime();

                let ed = element.EndDate.toISOString().split('T', 1)[0];
                let closeDate = new Date(ed).getTime();

                if (currentDate == beginDate) {
                    await Poll.findOneAndUpdate({ _id: element._id }, { $set: { Status: 1 } }).then(async (poll) => {
                        await notify(poll);
                    }).catch((err) => {
                        console.log(err)
                    })
                }
                else if (currentDate > closeDate) {
                    await Poll.updateOne({ _id: element._id }, { $set: { Status: 0 } }).catch((er) => {
                        console.log(er)
                    })
                }
            })
        })
    }
    catch (e) {
        console.log(e);
    }
})


async function statusUpdation(req, res, data) {
    try {
        const cd = new Date();
        const str = cd.toLocaleDateString('en-CA', { timeZone: 'Asia/Kolkata' });

        let sd = await data.StartDate.toISOString().split('T', 1)[0];

        if (sd === str) {

            Poll.findByIdAndUpdate(data._id, { $set: { Status: 1 } }).then(async (poll) => {
               

                await notify(poll);
            }).catch((err) => {
                return res.status(400).send(err)
            });
        }
    }
    catch (e) {
        logger.error(`${e.status || 500} - 'error' - ${e.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        res.status(400).send(e)
    }
}


async function notify(poll) {
    try {
        let notifyList = [];

        const users = await User.find({ Delete: 0, Type: { $ne: 2 } }).exec()
      
        if (users) {
            users.forEach((user) => {
                let set = { Message: "", PollId: "", NotifiedUser: "" }
                set.Message = "Poll is active. Click to view the poll";
                set.PollId = poll._id;
                set.NotifiedUser = user?._id
                notifyList.push(set)
            })
        }
        let options = { upsert: true };
        await NotificationModel.insertMany(notifyList, options).catch((err) => {
            logger.error(`${err.status || 500} - 'error' - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
            res.status(400).send(err);
        })
    }
    catch (e) {
        logger.error(`${e.status || 500} - 'error' - ${e.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        res.status(400).send(e);
    }

}

exports.createPoll = (async (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.send(errors.errors[0].msg);
        }
        else {

            let optionsArray = req.body.Options.map((i) => ({ "option": i }))

            const newPoll = Poll({
                Topic: req.body.Topic,
                StartDate: req.body.StartDate,
                EndDate: req.body.EndDate,
                UserId: req.User._id,
                Options: optionsArray
            })

            await newPoll.save().then(async (data) => {
                

                await statusUpdation(req, res, data);
                res.status(200).send({ success: true, message: "Poll Created" })
            }).catch((e) => {
                logger.error(`${e.status || 500} - 'error' - ${e.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
                res.status(401).send({ success: false, message: "Error in poll creation", e })
            })
        }
    }
    catch (err) {
        logger.error(`${err.status || 500} - 'error' - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        res.status(400).send(err)
    }
})




async function unvoteOtherOptions(req, res, pollId, optionId, userId) {
    try {
        const filter = {
            _id: pollId,
            "Options": {
                $elemMatch: {
                    _id: { $ne: optionId },
                    Vote: { $in: userId }
                }
            }
        };

        const update = {
            $pull: { "Options.$.Vote": userId },
            $inc: { "Options.$.VoteCount": -1 }
        };

        await Poll.updateMany(filter, update, { new: true, runValidators: true }).catch((err) => {
            logger.error(`${err.status || 500} - 'error' - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
            res.status(400).send(err)
        });

    }
    catch (e) {
        logger.error(`${e.status || 500} - 'error' - ${e.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        res.status(400).send(e);
    }
}

exports.votePoll = (async (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.send(errors.errors[0].msg);
        }
        else {

            const userId = req.User._id;

            const { optionId, pollId } = req.body;

            const filter = {
                _id: pollId,
                "Options": {
                    $elemMatch: {
                        _id: { $eq: optionId },
                        Vote: { $nin: userId }
                    }
                }
            };

            const update = {
                $addToSet: { "Options.$.Vote": userId },
                $inc: { "Options.$.VoteCount": 1 }
            };

            const updatedPoll = await Poll.findOneAndUpdate(filter, update, { new: true, runValidators: true }).catch((er) => {
                logger.error(`${er.status || 500} - 'error' - ${er.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
                res.status(400).send(er)
            });
          

            if (!updatedPoll) {
                res.status(400).send({ success: false, message: "Invalid Vote" });
                return;
            }
            else {

                unvoteOtherOptions(req, res, pollId, optionId, userId);

                res.status(200).send({ success: true, message: "User Voted" })
            }
        }
    }
    catch (err) {
        logger.error(`${err.status || 500} - 'error' - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        res.status(400).send(err)
    }
})


exports.listAllPolls = (async (req, res) => {
    try {
        const cd = new Date();

        const str = cd.toLocaleDateString('en-CA', { timeZone: 'Asia/Kolkata' });

        let filter = {};
        if (req.headers.genericvalue == 0) {
            filter = { StartDate: { $lte: str } }
        }

        const polls = await Poll.find(filter).sort({ createdAt: -1 }).catch((er) => {
            logger.error(`${er.status || 500} - 'error' - ${er.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
            res.status(400).json({ message: er })
        })
    


        const formattedPoll = polls.map((i) => ({

            _id: i._id,
            Topic: i.Topic,
            Status: i.Status,
            StartDate: i.StartDate,
            EndDate: i.EndDate,
            totalVotes: i.Options.flatMap((k) => k.Vote),
            Options: i.Options.map((j) => ({
                _id: j._id,
                "text": j.option,
                "votes": j.VoteCount,
                "vote": j.Vote,
                "percent": (((j.VoteCount) / (i.Options.flatMap((k) => k.Vote)).length) * 100)
            }))
        }));

        res.status(200).send(formattedPoll);
    }
    catch (err) {
        logger.error(`${err.status || 500} - 'error' - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        res.status(400).send(err)
    }
})



exports.getPollById = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.send(errors.errors[0].msg);
    }
    else {
        const poll = await Poll.findById(req.params.id).catch((err) => {
            logger.error(`${err.status || 500} - 'error' - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
            res.status(400).send(err)
        });
        const formattedPoll = {

            _id: poll._id,
            Topic: poll.Topic,
            Status: poll.Status,
            StartDate: poll.StartDate,
            EndDate: poll.EndDate,
            totalVotes: poll.Options.flatMap((k) => k.Vote),
            Options: poll.Options.map((j) => ({
                _id: j._id,
                "text": j.option,
                "votes": j.VoteCount,
                "vote": j.Vote,
                "percent": (((j.VoteCount) / (poll.Options.flatMap((k) => k.Vote)).length) * 100)
            }))
        }
        res.status(200).send(formattedPoll)
    }
}


exports.getActivePolls = (async (req, res) => {
    try {
        const polls = await NotificationModel.aggregate([
            { $match: { "Message": "Poll is active. Click to view the poll" } },
            {
                $group: {
                    _id: "$PollId",
                    latestNotification: { $first: "$$ROOT" }
                }
            },
            { $replaceRoot: { newRoot: "$latestNotification" } },
            { $sort: { createdAt: -1 } },
            { $lookup: { from: "polls", localField: "PollId", foreignField: "_id", as: "activePolls" } },
            { $addFields: { poll: { $arrayElemAt: ["$activePolls", 0] } } },
            {
                $project: {
                    _id: "$poll._id",
                    Topic: "$poll.Topic",
                    Status: "$poll.Status",
                    StartDate: "$poll.StartDate",
                    EndDate: "$poll.EndDate",
                    totalVotes: {
                        $reduce: {
                            input: '$poll.Options.Vote',
                            initialValue: [],
                            in: { $concatArrays: ['$$value', '$$this'] }
                        }
                    },
                    Options: {
                        $map: {
                            input: "$poll.Options",
                            as: "option",
                            in: {
                                _id: "$$option._id",
                                text: "$$option.option",
                                votes: "$$option.VoteCount",
                                vote: "$$option.Vote",
                            }
                        }
                    }
                }
            }
        ]).catch((e) => {
            logger.error(`${e.status || 500} - 'error' - ${e.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
            res.status(400).send(e)
        })
        let arr = [];
        const pollList = [];
        for (const poll of polls) {
            arr.length = 0
            let userId = req.User._id.toString()
            poll.totalVotes.map((i) => arr.push(i.toString()));
            const voted = arr.includes(userId)
            if (!voted && poll.Status == 1) {
                const formattedPoll = {
                    _id: poll._id,
                    Topic: poll.Topic,
                    Status: poll.Status,
                    StartDate: poll.StartDate,
                    EndDate: poll.EndDate,
                    totalVotes: poll.totalVotes,
                    Options: poll.Options.map((option) => ({
                        _id: option._id,
                        text: option.text,
                        votes: option.votes,
                        vote: option.vote,
                        percent: (option.votes / poll.totalVotes.flatMap((votedOption) => votedOption.votes)) * 100,
                    })),
                };
                pollList.push(formattedPoll);
            }
        }
        res.status(200).send(pollList.slice(0, 2));
    }
    catch (err) {

        logger.error(`${err.status || 500} - 'error' - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        res.status(400).send(err)
    }
})


async function statusUpdate(req, res, data) {
    try {
        const cd = new Date();
        const str = cd.toLocaleDateString('en-CA', { timeZone: 'Asia/Kolkata' });

        const poll = await Poll.findById(req.params.id).exec();

        if (poll.StartDate.toISOString().split('T', 1)[0] === str) {

           await Poll.findByIdAndUpdate(poll._id, { $set: { Status: 1 } }).catch((err) => {
                res.status(400).send(err)
            })

        }
    }
    catch (e) {
        logger.error(`${e.status || 500} - 'error' - ${e.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        res.status(400).send(e);
    }
}


exports.updatePoll = (async (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.send(errors.errors[0].msg);
        }
        if (req.headers.genericvalue == 1) {

            const cd = new Date();

            const str = cd.toLocaleDateString('en-CA', { timeZone: 'Asia/Kolkata' });
            const currentDate = new Date(str).getTime();

            const poll = await Poll.findById(req.params.id).exec()

            const sd = poll.StartDate.getTime();
            if (sd > currentDate) {

                let optionsArray = req.body.Options.map((i) => ({ "option": i }))

             await   Poll.findByIdAndUpdate(req.params.id, {
                    $set: {
                        Topic: req.body.Topic,
                        StartDate: req.body.StartDate,
                        EndDate: req.body.EndDate,
                        Options: optionsArray
                    }
                }).then(async (data) => {
                    if (data) {

                        await statusUpdate(req, res, data);
                        res.status(200).send("Poll Updated")
                    }
                    else
                        res.status(400).send("Updation failed")
                }).catch((e) => {
                    logger.error(`${e.status || 500} - 'error' - ${e.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
                    res.status(400).send(e)
                })
            }
            else {
                res.status(400).send("Poll started further updation not possible")
            }
        }
        else {
            res.status(403).send("Only recreation committee can update poll")
        }

    }
    catch (err) {

        logger.error(`${err.status || 500} - 'error' - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        res.status(400).send(err)
    }
})


exports.deletePoll = (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.send(errors.errors[0].msg);
        }
        else {
            if (req.headers.genericvalue == 1) {

                Poll.findByIdAndDelete(req.params.id).then((data) => {
                    if (data) {
                        NotificationModel.deleteMany({ PollId: new mongoose.Types.ObjectId(req.params.id) })
                            .catch((err) => {

                                logger.error(`${err.status || 500} - 'error' - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
                                res.status(400).send(err)
                            })
                        res.status(200).send("Poll Deleted")
                    }
                    else
                        res.status(400).send("Deletion failed")
                }).catch((er) => {
                    logger.error(`${er.status || 500} - 'error' - ${er.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
                    res.status(400).send(er)
                })

            }
            else {
                res.status(403).send("Only recreation committee can delete poll")
            }
        }
    }
    catch (e) {

        logger.error(`${e.status || 500} - 'error' - ${e.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        res.status(400).send(e)
    }
}