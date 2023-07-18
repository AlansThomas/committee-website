const exp = require("express");
const express = require('express');
const app = express();
const router = express.Router();
const bdyp = require('body-parser');
const bodyParser = require('body-parser');
app.use(bdyp.json());
app.use(bodyParser.urlencoded({ extended: false }));
const Comment = require("../models/Comment.Model");
const Post = require("../models/Post.Model");
const { verifyUser } = require('../middleware/Auth.MiddleWare.js');
const { roleGuard } = require('../middleware/RoleGuard.MiddleWare.js');
const mongoose = require('mongoose')
const logger = require('../utils/logger.utils')

const joi = require('@hapi/joi')
const Schema = joi.object().keys({
    UserId: joi.string().alphanum(),
    PostId: joi.string().alphanum()
})


exports.likePost = async (req, res, next) => {
    try {
        let Validation = Schema.validate(req.body)
        if (!Validation.error) {
            const UserId = req.User._id;
            const PostId = req.body.PostId;
            const posts = await Post.findById(req.body.PostId).exec();

            if (posts.Like.indexOf(UserId) === -1) {

                await Post.findByIdAndUpdate(PostId, {
                    $addToSet: { Like: UserId },
                    $inc: { LikeCount: 1 },
                    $pull: { Dislike: UserId }
                }).then(res.status(200).send("Post is Liked"))

            }
            else {
                res.status(400).send("cannot like a post twice")
            }
        }
        else {
            logger.error(`${error.status || 500} - 'error' - ${error.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
            res.status(400).send(Validation.error)
        }
    }
    catch (e) {
        logger.error(`${e.status || 500} - 'error' - ${e.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        res.status(401).send(e);
    }

}

exports.disLikePost = async (req, res, next) => {

    try {
        let Validation = Schema.validate(req.body)
        if (!Validation.error) {

            const UserId = req.User._id;
            const PostId = req.body.PostId;
            const posts = await Post.findById(req.body.PostId).exec();
            if (posts.Like.indexOf(UserId) === -1) {
                res.status(400).send("not liked yet")
            }
            else {
                await Post.findByIdAndUpdate(PostId, {
                    $addToSet: { Dislike: UserId },
                    $inc: { LikeCount: -1 },
                    $pull: { Like: UserId }
                }).then(res.status(200).send("Post is DisLiked"))
            }
        }
        else {
            logger.error(`${error.status || 500} - 'error' - ${error.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
            res.status(400).send(Validation.error)
        }

    }
    catch (e) {
        logger.error(`${e.status || 500} - 'error' - ${e.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        res.status(401).send(e);
    }
}
