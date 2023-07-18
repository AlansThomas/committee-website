const { body, param, query } = require('express-validator')
const mongoose = require('mongoose')
const group = require("../models/Groups.Model")
const user = require("../models/User.Model")
const groupValidator = (validationtype) => {
    switch (validationtype) {
        case 'id' : {
            return [
                param('id')
                    .trim()
                    .notEmpty()
                    .withMessage({ message: "id cannot be empty", errorCode: 804 })
                    .isMongoId()
                    .withMessage({ message: "id is invalid", errorCode: 801 })
                    .custom(async (value) => {
                        const usr = await user.findById(value).exec()
                        if (usr == null){
                            const grp = await group.findById(value).exec()
                            if (grp == null)
                                return Promise.reject()
                            else
                                return Promise.resolve()   
                        }
                        else
                            return Promise.resolve()
                    })
                    .withMessage({ message: "User or group does not exist", errorCode: 805 }),
            ]
        }
        case 'posts' : {
            return [
                param('id')
                    .trim()
                    .notEmpty()
                    .withMessage({ message: "id cannot be empty", errorCode: 804 })
                    .isMongoId()
                    .withMessage({ message: "id is invalid", errorCode: 801 })
            ]
        }
}
}
module.exports = { groupValidator }