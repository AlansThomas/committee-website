const mongoose = require('mongoose')
const postSchema = mongoose.Schema({
    UserId: {
        type: mongoose.Schema.Types.ObjectId, ref: "userstable"

    },
    PostImage: {
        type: Array,
    },

    Tags: {
        type: String,
        default: "1"
    },
    PostDescription: {
        type: String
    },
    LikeCount: {
        type: Number,
        default: 0,
    },
    PostedUser: {
        type: String
    }
    ,
    CommentCount: {
        type: Number,
        default: 0,
    },

    Like: [{ type: mongoose.Schema.Types.ObjectId, ref: "userstable" }],
    PersonalTags: [{ type: mongoose.Schema.Types.ObjectId, ref: "userstable" }],
    GroupTags: [{ type: mongoose.Schema.Types.ObjectId, ref: "group" }],
    HashTags: [{ type:String }],

    Dislike: [{ type: mongoose.Schema.Types.ObjectId, ref: "userstable" }],

    Delete: {
        type: Number,
        default: 0
    },
    LikeStatus: {
        type: Boolean,
        default: false,
    },
    Comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "comment" }]
}, { timestamps: true })
module.exports = mongoose.model("posts", postSchema)