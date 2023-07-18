let nodemailer = require('nodemailer');
const otpGenerator = require('otp-generator')
const logger = require('../utils/logger.utils');
const User = require("../models/User.Model");
const usersTable = require("../models/User.Model");
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
let cookieParser = require('cookie-parser');
const { application } = require("express");
application.use(cookieParser())
require('dotenv').config();

const userTable = require("../models/User.Model");
const { validationResult } = require('express-validator');


exports.newjwtauth = (async (req, res) => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const users = new User({
        UserName: req.body.username, Email: req.body.email, Password: hash, DOB: req.body.dob, Designation: req.body.designation,
    })
    await users.save().then((data) => {
        res.status(200).send({ "data": data })
    }).catch((error) => {
        logger.error(`${error.status || 500} - 'error' - ${error.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        res.status(401).json(error)
    })
})

exports.newjwtlogin = async (req, res) => {
    try {
        const users = await User.findOne({
            $and: [{ Email: req.body.email }, { Delete: 0 }],
        }).exec();

        if (users) {
            const passmatch = await bcrypt.compareSync(
                req.body.password,
                users.Password
            );
            const envtoken = "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.VFb0qJ1LRg_4ujbZoRMXnVkUgiuKq5KxWqNdbKq_G9Vvz-S1zZa9LPxtHWKa64zDl2ofkT8F6jBt_K4riU-fPg";
            if (passmatch) {
                await User.findOneAndUpdate({ Email: req.body.email }, { $set: { PasswordChange: 0 } }
                ).exec();
                const data = {
                    _id: users._id, CommitteCreateDate: users.CommitteCreateDate, CommitteeId: users.CommitteeId, CommitteeRole: users.CommitteeRole, DOB: users.DOB, Delete: users.Delete, Designation: users.Designation, Email: users.Email, GroupCreateDate: users.GroupCreateDate, GroupId: users.GroupId, GroupRole: users.GroupRole, Type: users.Type, UserImage: users.UserImage, UserName: users.UserName
                }
                const token = jwt.sign(
                    { id: users._id, isAdmin: users.isAdmin },
                    envtoken,
                    { expiresIn: 60 * 120 }
                );
                const refreshtoken = jwt.sign(
                    { id: users._id, isAdmin: users.isAdmin },
                    envtoken,
                    { expiresIn: "1d" }
                );

                res.status(200).cookie("accesstoken", token, { httpOnly: true }).send({ data: data, token: token, RefreshToken: refreshtoken });
            } else {
                res.status(401).json({
                    Success: 0,
                    Message: "Invalid credentials",
                });
            }
        } else {
            res.status(401).json({
                Success: 0,
                Message: "No user exist ",
            });
        }
    } catch (e) {
        logger.error(`${e.status || 500} - 'error' - ${e.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        res.status(401).json({
            Success: 0,
            Message: "No user exist ",
        });
    }
}


exports.refreshToken = (async (req, res) => {
    try {
        const envtoken = "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.VFb0qJ1LRg_4ujbZoRMXnVkUgiuKq5KxWqNdbKq_G9Vvz-S1zZa9LPxtHWKa64zDl2ofkT8F6jBt_K4riU-fPg";
        const decodedid = await jwt.verify(req.body.token, envtoken)
        const users = await userTable.findOne({ $and: [{ _id: decodedid.id }, { Delete: 0 }] }).exec();
        const data = {
            id: users._id, CommitteCreateDate: users.CommitteCreateDate, CommitteeId: users.CommitteeId, CommitteeRole: users.CommitteeRole, DOB: users.DOB, Delete: users.Delete, Designation: users.Designation, Email: users.Email, GroupCreateDate: users.GroupCreateDate, GroupId: users.GroupId, GroupRole: users.GroupRole, Type: users.Type, UserImage: users.UserImage, UserName: users.UserName
        }
        const token = jwt.sign({ _id: users._id, isAdmin: users.isAdmin }, envtoken, { expiresIn: 60 * 60 })
        const refreshtoken = req.body.token

        res.status(200).cookie("accesstoken", token, { httpOnly: true }).send({ "data": data, "token": token, "RefreshToken": refreshtoken })
    } catch (error) {
        logger.error(`${error.status || 500} - 'error' - ${error.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        res.status(403).json("refreshToken expires")
    }
})


exports.NewPassword = (async (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).send(errors.errors[0].msg);
        }
        const users = await User.findOne({ Email: req.body.Email }).exec();
        if (!users) {
            return res.status(400).json("user does not exist")
        }

        const passmatch = await bcrypt.compareSync(req.body.oldpassword, users.Password);

        if (passmatch) {
            const passupdate = await bcrypt.compareSync(req.body.Password, users.Password);
            if (!passupdate) {
                const salt = await bcrypt.genSaltSync(10);
                const HashedPassword = await bcrypt.hashSync(req.body.Password, salt);


                await User.findByIdAndUpdate(users._id, { $set: { Password: HashedPassword } }).then((response) => {

                    res.status(200).json("password saved successfully")
                }).catch((error) => {
                    logger.error(`${error.status || 500} - 'error' - ${error.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
                    res.status(400).json(error)
                })
            }
            else {
                res.status(400).json({errorCode:101,errMsg:"New password and old password cannot be the same"})
            }
        }
        else {
            res.status(400).json({errorCode:102,errMsg:"Password Mismatch"})
        }
    }
    catch (e) {
        logger.error(`${e.status || 500} - 'error' - ${e.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        res.status(401).send(e)
    }
})


exports.SendOtp = (async (req, res) => {
    try {

        const new_otp = await otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false });


        await User.findOneAndUpdate({ Email: req.body.email },
            { $set: { Otp: new_otp } }).then(async (response) => {

                try {
                    let transporter = await nodemailer.createTransport({
                        service: 'gmail',
                        auth: {
                            user: 'recreation.committee@innovaturelabs.com',
                            pass: 'sevwuhlnivavstyd'
                        }
                    });


                    let mailOptions = {
                        from: 'recreation.committee@innovaturelabs.com',
                        to: req.body.email,
                        subject: 'OTP to reset password',
                        text: new_otp
                    };

                    transporter.sendMail(mailOptions, function (error, info) {
                        if (error) {


                            res.status(401).send(error)
                        }
                    });

                    await res.status(200).json("Otp sended")
                } catch (error) {
                    logger.error(`${error.status || 500} - 'error' - ${error.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
                    res.status(401).json({
                        Success: 0,
                        Message: 'invalid otp'
                    })
                }
            }).catch((err) => {
                logger.error(`${err.status || 500} - 'error' - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
                res.status(403).json(err)
            })
    } catch (e) {
        logger.error(`${e.status || 500} - 'error' - ${e.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        res.status(401).send(e)
    }
})

exports.ResetPassword = (async (req, res) => {

    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).send(errors.errors[0].msg);
        }
        // const sendmail = async () => {
        //     let str = "your password is changed  ,your current password is " + req.body.Password
        //     let transporter = await nodemailer.createTransport({
        //         service: 'gmail',
        //         auth: {
        //             user: 'recreation.committee@innovaturelabs.com',
        //             pass: 'sevwuhlnivavstyd'
        //         }
        //     });
        //     let mailOptions = {
        //         from: 'ajaydvrj@gmail.com',
        //         to: req.body.Email,
        //         subject: 'Password changed',
        //         text: str
        //     };
        //     transporter.sendMail(mailOptions)
        //         .then((info) => {
        //             console.log('Email sent successfully:', info);
        //         })
        //         .catch((error) => {
        //             console.error('Error occurred while sending email:', error);
        //         });
        // }

        if (req.body.Password && req.body.Email) {

            const users = await User.findOne({ Email: req.body.Email }).exec();
            const salt = await bcrypt.genSaltSync(10);
            const HashedPassword = await bcrypt.hashSync(req.body.Password, salt);
            await User.findByIdAndUpdate(users._id, { $set: { Password: HashedPassword, PasswordChange: 1 } }).then(() => {
                // sendmail()
                return res.status(200).json("Password changed Successfully")
            }).catch(() => {
                return res.status(403).json("password reset failed")
            })
        }
        else {

            res.status(403).json()
        }
    } catch (error) {
        res.status(400).send(error)
    }

})


exports.NewCreatedPassword = (async (req, res) => {
    try {
        if (req.body.otp != "") {

            const users = await User.findOne({ Email: req.body.email }).exec();


            if (req.body.otp === users.Otp) {


                User.findByIdAndUpdate(users._id, { $set: { Otp: "" } }).then((response) => {
                    res.status(200).json("otp matched")

                }).catch((err) => {
                    logger.error(`${err.status || 500} - 'error' - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
                    res.status(404).json("otp validation error")
                })
            }
            else {


                res.status(401).json({
                    Success: 0,
                    Message: 'invalid otp'
                })
            }
        }
        else {

            return res.status(403).json("otp incorrect");
        }
    }
    catch (e) {


        logger.error(`${e.status || 500} - 'error' - ${e.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        return res.status(401).send(e)
    }
})



