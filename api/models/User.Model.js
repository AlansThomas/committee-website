const { string } = require('@hapi/joi');
const mongoose = require('mongoose')


const UserSchema = new mongoose.Schema({
    UserName: {
        type: String,
        required: true,


    },
    Email: {
        type: String,
        required: true,
        unique: true

    },
    UserNameSearch: {
        type: String,
        required: true,
        unique: true
    },
    DOB: {
        type: Date,
        required: true
    },
    Type: {
        type: Number,
        default: 0
    },
    TypeSearch: {
        type: String
    },
    GroupRole: {
        type: Number,
        default: 0
    },
    Designation: {
        type: String,
        require: true

    }
    ,
    Delete: {
        type: Number,
        default: 0
    }
    ,
    BirthdayStatus: {
        type: Number,
        default: 0
    }
    ,
    GroupId: {
        type: String,
        default: 0

    }
    ,
    UserImage: {
        type: String
    }
    ,
    CommitteeId: {
        default: 0,
        type: String

    }
    ,
    CommitteeRole: {
        type: String,
        default: 0,
    },
    Password: {
        default: 0,
        type: String
    },
    PasswordChange:{
        type: Number,
        default: 0
    },
    GroupIdObj: { type: mongoose.Schema.Types.ObjectId, ref: "Groups" },

    Otp: {
        default: 0,
        type: String
    },
    GroupCreateDate: {
        type: Date,
        default: Date.now,

    }
    ,
    CommitteCreateDate: {
        type: Date,
        default: Date.now,

    },
    BirthdayCard : {
        type: String
    }

}, { timestamps: true })
module.exports = mongoose.model("userstable", UserSchema);