const mongoose = require('mongoose')
const CommentSchema = mongoose.Schema({
    Comment: {
        require: true,
        type: String
    },
    PostId: {
        require: true,
        type: mongoose.Schema.Types.ObjectId, ref: "post",
    },
    UserId: {
        type: mongoose.Schema.Types.ObjectId, ref: "userstable",
        require: true
    },
    UserName: {
        type: String,
    },
    UserImage: {
        type: String,
    },
    Delete:{
        type:Number,
        default:0
    }
}, { timestamps: true })
module.exports = mongoose.model("comment", CommentSchema);