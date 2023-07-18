const { check, validationResult } = require('express-validator');

exports.register = [
    check('Email', 'Please enter a valid email address').matches(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/),
    check('Email', 'please check you email domain').matches('gmail.com'),
    check('UserName', 'Name length should be max 50 characters').isLength({ max: 50 }), 
    check('DOB', 'You should enter a valid date of birth').trim().isDate(),
    check('Designation','designation is missing').isLength({  max: 50 })
    , (req, res, next) => {
        const error = validationResult(req)
        if (!error.isEmpty()) {
            res.status(500).send(error)
        }
        else {
            next();
        }
    }
];
// .matches(/^[A-Za-z0-9._%+-]+@(?!innovaturelabs.com)[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/i) 
//  check('Email', 'please check you email domain').matches('innovaturelabs.com'),
