const { body } = require('express-validator')
const { isString } = require('validator');
const glimpseValidator = (validationtype) => {

    if (validationtype == "glimpseDelete") {
        return [
            body('glimpseId')
                .trim()
                .notEmpty()
                .withMessage({ message: "glimpseId is required", errorCode: 602 })
                .isMongoId()
                .withMessage({ message: "glimpseId is invalid", errorCode: 601 }),



        ]

    }

    if (validationtype == "imageDelete") {
        return [
            body('imageId')
                .trim()
                .notEmpty()
                .withMessage({ message: "imageId is required", errorCode: 602 })
                .isMongoId()
                .withMessage({ message: "imageId is invalid", errorCode: 601 }),



        ]

    }


}

module.exports = { glimpseValidator }