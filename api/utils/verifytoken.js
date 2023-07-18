const jwt = require('jsonwebtoken');
let express = require('express');
let cookieParser = require('cookie-parser');
let app = express();
require('dotenv').config();
app.use(cookieParser());
require('dotenv').config();

exports.verifytoken = (req, res, next) => {
    const token = req.rawHeaders[15];
    const accesstoken = token.replace("accesstoken=", '')
    if (!token) {
        return next();

    }
    else {
        jwt.verify(accesstoken, process.env.tk1, (err, user) => {

            if (err) {

                res.send(err)
            }
            else {
                res.user = user;
                next();
            }

        })

    }
}
exports.verifyuser = (req, res, next) => {



    let token = req.rawHeaders[15];

    const accesstoken = token.replace("accesstoken=", '')
    if (!token) {
        return next();

    }
    else {
        jwt.verify(accesstoken, process.env.tk1, (err, user) => {

            if (err) {

                res.send(err)
            }
            else {
                res.user = user;

                if (user.id == req.params.id) {

                    next();
                }
                else {
                    res.send("error")
                }
            }

        })

    }
}


    exports.verifyadmin = (req, res, next) => {


        let token = req.rawHeaders[15];
    
        const accesstoken = token.replace("accesstoken=", '')
        if (!token) {
            return next();
    
        }
        else {
            jwt.verify(accesstoken, process.env.tk1, (err, user) => {
    
                if (err) {
    
                    res.send(err)
                }
                else {
                    res.user = user;

                    if (user.id == req.params.id || user.isAdmin) {
                        next();
                    }
                    else {
                        res.send("error")
                    }
                }
    
            })
    
        }
}


