const { body, param, query } = require('express-validator')
const mongoose = require('mongoose')
const group = require("../models/Groups.Model")
const eventValidator = (validationtype) => {
    switch (validationtype) {
        case 'search': {
            return [
                query('EventName')
                    .optional({ checkFalsy: true })
                    .isAlphanumeric('en-US', { ignore: '\s' })
                    .withMessage({ message: "EventName must be string", errorCode: 800 }),
            ]

        }
        case 'search': {
            return [
                query('StartDate')
                    .optional({ checkFalsy: true })
                    .trim()
                    .isDate()
                    .withMessage({ message: "StartDate should be in date format", errorCode: 803 }),
            ]
        }
        case 'search': {
            return [
                query('EndDate')
                    .optional({ checkFalsy: true })
                    .trim()
                    .isDate()
                    .withMessage({ message: "EndDate should be in date format", errorCode: 803 }),
            ]
        }

        case 'search' : { 
            return [
                query('status')
                    .optional({ checkFalsy: true })
                    .trim()
                    .notEmpty()
                    .withMessage({ message: "Status cannot be empty", errorCode: 801 })
                    .isNumeric()
                    .withMessage({ message: "Status must number", errorCode: 800 })
                    .custom(async (value) => {
                        if (value != 1)
                            return Promise.reject()
                        else
                            return Promise.resolve()
                    })
                    .withMessage({ message: "Status must be equal to 1", errorCode: 802 }),
            ]
        }    
        case 'addEvent' : { 
            return [
                body('quarterId')
                .trim()
                .notEmpty()
                .withMessage({ message: "quarterId is required", errorCode: 701 })
                .isMongoId()
                .withMessage({ message: "quarterId is invalid", errorCode: 601 }),
               
            ]
        }    

    }
}

module.exports = { eventValidator }