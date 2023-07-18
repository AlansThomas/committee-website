const { param } = require('express-validator')
const mongoose = require('mongoose')
const TotalPoint = require("../models/TotalPoint.Model")
const pointValidator = (validationtype) => {
    if (validationtype == 'getId') {
        
        return [
                param('id')
                    .trim()
                    .notEmpty()
                    .withMessage({ message: "id cannot be empty", errorCode: 800 })
                    .isMongoId()
                    .withMessage({ message: "id is invalid", errorCode: 801 })
                    .custom(async (value) => {
                        const totalpoint = await TotalPoint.find({ _id: value }).exec()
                        if (totalpoint == '')
                            return Promise.reject()
                        else
                            return Promise.resolve()
                    })
                    .withMessage({ message: "id doesnot exists", errorCode: 802 }),
            ]

        }            
    }

module.exports = { pointValidator }