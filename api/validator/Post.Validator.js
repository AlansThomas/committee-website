const { query, body, param } = require('express-validator')
const mongoose = require('mongoose')
const Post = require("../models/Post.Model")
const Comment = require("../models/Comment.Model")
const postValidator = (validationtype) => {
    switch (validationtype) {
        case 'search': {
            return [
                query('tags')
                    .optional({ checkFalsy: true })
                    .trim()
                    .isString()
                    .withMessage({ message: "tags should be string", errorCode: 800 }),

                query('page')
                    .optional({ checkFalsy: true })
                    .trim()
                    .isNumeric()
                    .withMessage({ message: "page should be number", errorCode: 801 }),
            ] 
    }
    case 'getPost': {
        return [
            param('id')
                .trim()
                .notEmpty()
                .withMessage({ message: "id cannot be empty", errorCode: 802 })
                .isMongoId()
                .withMessage({ message: "id is invalid", errorCode: 803 })
                .custom(async (value) => {
                    const post = await Post.find({ _id: value, Delete: 0 }).exec()
                    if (post == '')
                        return Promise.reject()
                    else
                        return Promise.resolve()
                })
                .withMessage({ message: "id or post doesnot exists", errorCode: 804 }),
        ] 
}

    case 'postComment': {
        return [
            body('PostId')
                .trim()
                .notEmpty()
                .withMessage({ message: "id cannot be empty", errorCode: 802 })
                .isMongoId()
                .withMessage({ message: "id is invalid", errorCode: 803 })
                .custom(async (value) => {
                    const poll = await Post.find({ _id: value, Delete: 0 }).exec()
                    if (poll == '')
                        return Promise.reject()
                    else
                        return Promise.resolve()
                })
                .withMessage({ message: "id or post doesnot exists", errorCode: 804 }),
        ] 
    }

    case 'editComment': {
        return [
            body('CommentId')
                .trim()
                .notEmpty()
                .withMessage({ message: "id cannot be empty", errorCode: 802 })
                .isMongoId()
                .withMessage({ message: "id is invalid", errorCode: 803 })
                .custom(async (value) => {
                    const comment = await Comment.find({ _id: value, Delete: 0 }).exec()
                    if (comment == '')
                        return Promise.reject()
                    else
                        return Promise.resolve()
                })
                .withMessage({ message: "id or post doesnot exists", errorCode: 804 }),

            body('Comment')
                .trim()
                .notEmpty()
                .withMessage({ message: "Comment cannot be empty", errorCode: 802 })
        ] 
    }
}
}
module.exports = { postValidator }