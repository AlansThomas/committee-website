const { body } = require('express-validator')
const passwordValidator = (validationtype) => {
  if (validationtype == "password") {
    return [
      body('Password')
        .isLength({ min: 8 }).withMessage({errorCode:902,errMsg:'Password must be at least 8 characters long'})
        .matches(/[A-Z]/).withMessage({errorCode:903,errMsg:'Password must contain at least one uppercase letter'})
        .matches(/[a-z]/).withMessage({errorCode:904,errMsg:'Password must contain at least one lowercase letter'})
        .matches(/[0-9]/).withMessage({errorCode:905,errMsg:'Password must contain at least one number'})
        .matches(/[!@#$%^&*(),.?":{}|<>]/).withMessage({errorCode:906,errMsg:'Password must contain at least one special character'}),
    ]
  }
  if (validationtype == "password1") {
    return [
      body('Password')
      .isLength({ min: 8 }).withMessage({errorCode:902,errMsg:'Password must be at least 8 characters long'})
      .matches(/[A-Z]/).withMessage({errorCode:903,errMsg:'Password must contain at least one uppercase letter'})
      .matches(/[a-z]/).withMessage({errorCode:904,errMsg:'Password must contain at least one lowercase letter'})
      .matches(/[0-9]/).withMessage({errorCode:905,errMsg:'Password must contain at least one number'})
      .matches(/[!@#$%^&*(),.?":{}|<>]/).withMessage({errorCode:906,errMsg:'Password must contain at least one special character'}),
      body('Email')
        .notEmpty()
        .withMessage({errorCode:907,errMsg:'Email field is required'})
        .isEmail()
        .withMessage({errorCode:908,errMsg:'Invalid email address'}),
    ]
  }
}

module.exports = { passwordValidator }