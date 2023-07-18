const { error } = require("@hapi/joi/lib/types/alternatives");
const { ElasticBeanstalk } = require("aws-sdk");
const exp = require("express");
const app = exp();
const Comment = require("../models/Comment.Model");
const Post = require("../models/Post.Model");
const { verifyUser } = require('../middleware/Auth.MiddleWare.js');
const { roleGuard } = require('../middleware/RoleGuard.MiddleWare.js');
const mongoose = require('mongoose')
const bdyp = require('body-parser')
const bodyParser = require('body-parser')
app.use(bdyp.json())

app.use(bodyParser.urlencoded({ extended: false }))
const logger = require('../utils/logger.utils')
const joi = require('@hapi/joi')
const Schema = joi.object().keys({
    PostId: joi.string().alphanum(),
    Comment: joi.string(),
    postid: joi.string()
})
const { validationResult } = require('express-validator');

exports.commentPost = (async (req, res, next) => {
    try {
        const errors = validationResult(req)
        
        if (!errors.isEmpty()) {
            return res.status(400).send(errors.errors[0].msg);
        }

        const newcomment = new Comment({
            Comment: req.body.Comment,
            PostId: req.body.PostId,
            UserId: req.User._id,
            UserName: req.User.UserName,
            UserImage: req.User.UserImage
        })


        await newcomment.save().then(async (data) => {
        

            await Post.findByIdAndUpdate(req.body.PostId, { $addToSet: { Comments: data._id }, $inc: { CommentCount: 1 } })
            
                .catch((err) => {
                    res.status(400).send(err)
                })
            res.status(200).send(data)
        }).catch((er) => {
            logger.error(`${er.status || 500} - 'error' - ${er.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
            res.status(400).send(er)
        })
        next();
    }
    catch (e) {
        logger.error(`${e.status || 500} - 'error' - ${e.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        res.status(401).send(e);
    }
})

exports.editComment = async (req, res) => {

    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).send(errors.errors[0].msg);
        }
            const comment = await Comment.findById(req.body.CommentId).exec();
            if (req.User._id.valueOf() === comment.UserId.valueOf()) {
                Comment.findByIdAndUpdate(req.body.CommentId, { $set: { Comment : req.body.Comment } }).then((data) => {
                    res.status(200).send(data)
                }).catch((err) => {
                    console.log(err);
                    res.status(400).send(err)
                })
            }
            else {
                res.status(403).send("you can only edit your comment")
            }

    }
    catch (e) {
        console.log(e);
        logger.error(`${e.status || 500} - 'error' - ${e.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        res.status(400).send(e);
    }

}




exports.commentList = async (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.send(errors.errors[0].msg);
        }
        Comment.aggregate([
            {
                $match: {
                    "PostId": new mongoose.Types.ObjectId(req.params.id),
                    "Delete": 0
                }
            },
            {
                $sort: { "createdAt": -1 }
            },
            {
                $lookup: {

                    from: "userstables", localField: "UserId", foreignField: "_id", as: "userslist"

                }
            },
            {
                $project: {
                    "userslist.Password": 0,
                    "userslist.Otp": 0
                }
            }

        ]).then((result) => {
            res.status(200).send(result);
        }).catch((err) => {
            logger.error(`${err.status || 500} - 'error' - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
            res.status(404).send({ message: err.message });
        })
    }
    catch (e) {
        logger.error(`${e.status || 500} - 'error' - ${e.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        res.status(401).send(e);
    }
}


exports.deleteComment = async (req, res) => {
    try {
        const comment = await Comment.findById(req.body.CommentId).exec()
        const post = await Post.findById(req.body.PostId).exec()
        if (req.User._id.valueOf() === post.UserId.valueOf() || req.User._id.valueOf() === comment.UserId.valueOf()) {
            Comment.findByIdAndDelete(req.body.CommentId).then((data) => {
                Post.findByIdAndUpdate(req.body.PostId, { $pull: { Comments: req.body.CommentId }, $inc: { CommentCount: -1 } }).catch((er) => {
                    res.status(400).send(er)
                })
               return res.status(200).send(data)
            })
                .catch((err) => {
                    logger.error(`${err.status || 500} - 'error' - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
                    res.status(400).send(err)
                })
        }
        else {
            res.status(403).send("you can only delete your comment")
        }
    }
    catch (e) {
        logger.error(`${e.status || 500} - 'error' - ${e.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        res.status(401).send(e);
    }
}
