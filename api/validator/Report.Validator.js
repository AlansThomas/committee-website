const { body } = require('express-validator');
const PollModel = require('../models/Poll.Model');
const PostModel = require('../models/Post.Model');
const ReportModel = require('../models/Report.Model');
const reportValidator = (validationtype) => {
    if(validationtype == 'Create') {
            return [
                body('PostId')
                    .optional({ checkFalsy: true })
                    .trim()
                    .notEmpty()
                    .withMessage({ message: "PostId cannot be empty", errorCode: 804 })
                    .isMongoId()
                    .withMessage({ message: "PostId is invalid", errorCode: 801 })
                    .custom(async (value) => {
                        const Post = await PostModel.findById(value).exec()
                        if (Post == null)
                            return Promise.reject()
                        else
                            return Promise.resolve()
                    })
                    .withMessage({ message: "PostId doesnot exists", errorCode: 805 }),


                body('Message')
                    .trim()
                    .notEmpty()
                    .withMessage({ message: "Message cannot be empty", errorCode: 804 })

                    .custom(async (value) => {

                        if (value.length > 1000)
                            return Promise.reject()
                        else
                            return Promise.resolve()
                    })
                    .withMessage({ message: "Report must be less than 1000 letters", errorCode: 805 }),
            ]
        }
    }


module.exports = { reportValidator }