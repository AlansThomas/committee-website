const { body, param } = require('express-validator')
const adminValidator = (validationtype) => {

    switch (validationtype) {
        case 'SearchPage': {

            return [

                param('page')

                    .custom((value) => {
                     
                        if (value > 0) {

                            return Promise.resolve()

                        }
                        else {

                            return Promise.reject()
                        }

                    })
                    .withMessage({ error: "Page number should greater than 0", errorCode: 806 })

            ]
        }


        case 'PostImage': {

            return [

                body('PostDescription')
                    .isString()
                    .withMessage({ error: "Description should be a string", errorCode: 800 }),
               
                  ]
        }

    }
}
module.exports = { adminValidator }