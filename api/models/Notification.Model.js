const mongoose = require('mongoose');
const { boolean } = require('webidl-conversions');
const notificationSchema = mongoose.Schema({
    PostId:{
        type: mongoose.Schema.Types.ObjectId, ref: "posts",
    },
    PollId: {
        type: mongoose.Schema.Types.ObjectId, ref: "poll",
    },
    Message: {

        type: String
    },
    PostedUser: {
        type: mongoose.Schema.Types.ObjectId, ref: "userstable"

    },
    verifyNotif : { 
        type : Number,
        default: 0

    },
    Read: {
        
        require: true,
        type: Number,
        default: 0
    },
    TaggedGroup: { type: mongoose.Schema.Types.ObjectId, ref: "Groups" },
    TaggedUser: {
        type: mongoose.Schema.Types.ObjectId, ref: "userstable"

    },
    NotifiedUser : {
        type: mongoose.Schema.Types.ObjectId, ref: "userstable"

    },
     Status:{
        type:Number,
        default: 0
    },

    TotalPointId: {
        type: mongoose.Schema.Types.ObjectId, ref: "totalpoints",
    },
    TotalPoint:{
        type:Number,
        default: 0
    },
    CommitteeId: {
        type:String,
    },
    PointVerificationRead : {
        require: true,
        type: Number,
        default: null
    }
}, { timestamps: true })
module.exports = mongoose.model("notification", notificationSchema);
