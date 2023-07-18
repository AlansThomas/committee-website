const mongoose = require('mongoose')
const postSchema = mongoose.Schema({
    ReportMessage: {
        type: String,

    },
    PostId: { type: mongoose.Schema.Types.ObjectId, ref: "posts" },
    Message: {

        type: String
    },
    ReportedUser: {
        type: mongoose.Schema.Types.ObjectId, ref: "userstable"

    }, Read: {
        require: true,
        type: Number,
        default: 0
    }, type: {
        require: true,
        type: Number,
        default: 0
    },
    Delete:{
        type:Number,
        default:0
    }
}, { Timestamp: true })
module.exports = mongoose.model("Reports", postSchema)
