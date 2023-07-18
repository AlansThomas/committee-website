const { body, param } = require('express-validator')
const mongoose = require('mongoose')
const Poll = require("../models/Poll.Model")


function validatePollData() { 
    return [
        body('Topic')
                    .trim()
                    .notEmpty()
                    .withMessage({ message: "Topic cannot be empty", errorCode: 800 })
                    .isLength({ min: 1, max: 100 })
                    .withMessage({ message: "Topic must only contain between 1 & 100 characters", errorCode: 801 }),

                body('StartDate')
                    .trim()
                    .notEmpty()
                    .withMessage({ message: "StartDate cannot be empty", errorCode: 800 })
                    .isDate()
                    .withMessage({ message: "StartDate should be in date format", errorCode: 802 })
                    .custom(async (startdate) => {
                        const date = new Date(); 
                        const currentDate = date.toLocaleDateString('en-CA', { timeZone: 'Asia/Kolkata' });
                        if (startdate < currentDate)
                            return Promise.reject()
                        else
                            return Promise.resolve()
                    })
                    .withMessage({ message: "StartDate should not be before currentdate", errorCode: 804 }),

                body('EndDate')
                    .trim()
                    .notEmpty()
                    .withMessage({ message: "EndDate cannot be empty", errorCode: 800 })
                    .isDate()
                    .withMessage({ message: "EndDate should be in date format", errorCode: 802 })
                    .custom(async (value, { req }) => {
                        const { StartDate } = req.body;
                        if (value < StartDate)
                            return Promise.reject()
                        else
                            return Promise.resolve()
                    })
                    .withMessage({ message: "EndDate should not be before startdate", errorCode: 803 })
                    .custom(async (enddate) => {
                        const date = new Date(); 
                        const currentDate = date.toLocaleDateString('en-CA', { timeZone: 'Asia/Kolkata' });
                        if (enddate < currentDate)
                            return Promise.reject()
                        else
                            return Promise.resolve()
                    })
                    .withMessage({ message: "EndDate should not be before currentdate", errorCode: 804 }),

                body('Options')
                    .isArray({ min: 2 })
                    .withMessage({ message: 'Options must contain at least two elements', errorCode: 806 })
                    .isArray({ max: 10 })
                    .withMessage({ message: 'Options must contain only ten elements', errorCode: 807 }),

                body('Options.*')
                    .trim()
                    .notEmpty()
                    .withMessage({ message: "Option cannot be empty", errorCode: 800 })
                    .isLength({ min: 1, max: 50 })
                    .withMessage({ message: "Option must only contain between 1 & 50 characters", errorCode: 808 })
                    .custom((value, { req }) => {
                        const lowerCaseValue = value.toLowerCase();
                        if (req.body.Options.filter((option) => option.toLowerCase() === lowerCaseValue).length > 1)
                            return Promise.reject()
                        else
                            return Promise.resolve()
                    })
                    .withMessage({ message: 'Options must be unique', errorCode: 809 }),
    ]
}

function validatePollUpdate () {
    return [
        param('id')
            .trim()
            .notEmpty()
            .withMessage({ message: "id cannot be empty", errorCode: 800 })
            .isMongoId()
            .withMessage({ message: "id is invalid", errorCode: 810 })
            .custom(async (value) => {
                const poll = await Poll.find({ _id: value }).exec()
                if (poll == '')
                    return Promise.reject()
                else
                    return Promise.resolve()
            })
            .withMessage({ message: "id doesnot exists", errorCode: 811 }),

    ]
}




const pollValidator = (validationtype) => {
    switch (validationtype) {


        case 'createPoll': {
            
            return validatePollData();
        }

        case 'updatePoll': {

            return validatePollUpdate().concat(validatePollData());

        }

        case 'getPoll': {
            
            return validatePollUpdate()

        }

        case 'votePoll': {
            return [
                body('optionId')
                    .trim()
                    .notEmpty()
                    .withMessage({ message: "OptionId cannot be empty", errorCode: 800 })
                    .isMongoId()
                    .withMessage({ message: "OptionId is invalid", errorCode: 810 })
                    .custom(async (value) => {
                        const poll = await Poll.find({
                            "Options": {
                                $elemMatch: {
                                    _id: { $eq: value }
                                }
                            }
                        }).exec()
                        if (poll == '')
                            return Promise.reject()
                        else
                            return Promise.resolve()
                    })
                    .withMessage({ message: "optionId doesnot exists", errorCode: 811 }),


                body('pollId')
                    .trim()
                    .notEmpty()
                    .withMessage({ message: "PollId cannot be empty", errorCode: 800 })
                    .isMongoId()
                    .withMessage({ message: "PollId is invalid", errorCode: 810 })
                    .custom(async (pollId) => {
                        const poll = await Poll.find({ _id: pollId }).exec()
                        if (poll == '')
                            return Promise.reject()
                        else
                            return Promise.resolve()
                    })
                    .withMessage({ message: "pollId doesnot exists", errorCode: 811 }),

            ]

        }
        
    }
}

module.exports = { pollValidator }