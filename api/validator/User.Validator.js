const { body, param, query } = require('express-validator')
const mongoose = require('mongoose')
const group = require("../models/Groups.Model")
const user = require("../models/User.Model")

const userValidator = (validationtype) => {
    if (validationtype == 'search') {
            return [
                query('UserName')
                    .optional({ checkFalsy: true })
                    .isAlpha('en-US', { ignore: '\s' })
                    .withMessage({ message: "UserName must be string", errorCode: 800 }),

                query('Designation')
                    .optional({ checkFalsy: true })
                    .trim()
                    .isAlpha('en-US', { ignore: '\s' })
                    .withMessage({ message: "Designation must be string", errorCode: 800 }),
 
                query('Type')
                    .optional({ checkFalsy: true })
                    .trim()
                    .isAlphanumeric()
                    .withMessage({ message: "Type should be string", errorCode: 800 }),

                query('fromDOB')
                    .optional({ checkFalsy: true })
                    .trim()
                    .isDate()
                    .withMessage({ message: "DOB should be in date format", errorCode: 803 }),


                query('toDOB')
                    .optional({ checkFalsy: true })
                    .trim()
                    .isDate()
                    .withMessage({ message: "DOB should be in date format", errorCode: 803 })
                    .custom(async (value, { req }) => {
                        const { fromDOB } = req.query;
                        if (value < fromDOB)
                            return Promise.reject()
                        else
                            return Promise.resolve()
                    })
                    .withMessage({ message: "toDOB should not be before fromDOB", errorCode: 806 }),
            
                body('GroupId')
                    .optional({ checkFalsy: true })
                    .trim()
                    .notEmpty()
                    .withMessage({ message: "GroupId cannot be empty", errorCode: 804 })
                    .isMongoId()
                    .withMessage({ message: "GroupId is invalid", errorCode: 801 })
                    .custom(async (value) => {
                        const grp = await group.findById(value).exec()
                        if (grp == null)
                            return Promise.reject()
                        else
                            return Promise.resolve()
                    })
                    .withMessage({ message: "GroupId doesnot exists", errorCode: 805 }),

                body('Committee')
                    .optional({ checkFalsy: true })
                    .trim()
                    .notEmpty()
                    .withMessage({ message: "Type cannot be empty", errorCode: 804 })
                    .isNumeric()
                    .withMessage({ message: "Type must number", errorCode: 800 })
                    .custom(async (value) => {
                        if (value != 1)
                            return Promise.reject()
                        else
                            return Promise.resolve()
                    })
                    .withMessage({ message: "Type must be equal to 1", errorCode: 805 }),
            ]
        }
    }

module.exports = { userValidator }