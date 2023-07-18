const { body } = require('express-validator')
const { isString } = require('validator');
const quaterValidator = (validationtype) => {

    if (validationtype == "quater") {
        return [
            body('quaterName')

                .trim()
                .isString()
                .withMessage({ errorCode: 711, errMsg: "quaterName must be a string" })
                .isLength({ min: 2 }).withMessage({ errorCode: 702, errMsg: "quaterName must be greater than or equal to 2 characters long" })
                .isLength({ max: 15 }).withMessage({ errorCode: 703, errMsg: "quaterName must be lesser than or equal to 15 characters long" }),
            body('quaterNumber')

                .trim()
                .notEmpty()
                .withMessage({ errorCode: 704, errMsg: "quaterNumber field is required" })
                .isNumeric()
                .withMessage({ errorCode: 705, errMsg: "quaterNumber must be a number" }),



            body('startDate')
                .trim()
                .notEmpty()
                .withMessage({ errorCode: 706, errMsg: "startDate field is required" })
                .isDate()
                .withMessage({ errorCode: 707, errMsg: "Invalid startDate" }),


            body('endDate')
                .trim()
                .notEmpty()
                .withMessage({ errorCode: 708, errMsg: "endDate field is required" })
                .isDate()
                .withMessage({ errorCode: 709, errMsg: "Invalid endDate" }),

        ]

    }
    if (validationtype == "editQuater") {
        return [

            body('quarterId')
                .trim()
                .notEmpty()
                .isMongoId()
                .withMessage({ errorCode: 601, errMsg: "quarterId is invalid" }),

            body('quaterName')

                .trim()
                .isString()
                .withMessage({ errorCode: 711, errMsg: "quaterName must be a string" })
                .isLength({ min: 2 }).withMessage({ errorCode: 702, errMsg: "quaterName must be greater than or equal to 2 characters long" })
                .isLength({ max: 15 }).withMessage({ errorCode: 703, errMsg: "quaterName must be lesser than or equal to 15 characters long" }),

            body('startDate')
            .notEmpty().withMessage('startDate field is required')
            .custom((value) => {
                const dateRegex = /^\d{4}\/\d{2}\/\d{2}$/;
                if (dateRegex.test(value)) {
                  throw new Error('Invalid startDate format');
                }
                return true;
              })
              .isDate({ format: 'YYYY-MM-DD' }).withMessage({ errorCode: 707, errMsg: "Invalid startDate" }),

            body('endDate')
            .notEmpty().withMessage('endDate field is required')
            .custom((value) => {
                const dateRegex = /^\d{4}\/\d{2}\/\d{2}$/;
                if (dateRegex.test(value)) {
                  throw new Error('Invalid endDate format');
                }
                return true;
              })
              .isDate({ format: 'YYYY-MM-DD' }).withMessage({ errorCode: 707, errMsg: "Invalid endDate" })
            ]

    }
}

module.exports = { quaterValidator }