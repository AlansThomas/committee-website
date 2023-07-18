const mongoose = require('mongoose')
const pollSchema = mongoose.Schema({
    UserId: {
        type: mongoose.Schema.Types.ObjectId, ref: "userstable"
    },
    Topic : { 
        type : String,
        require : true
    },
    StartDate:{
        type:Date,
        default: "",
        require: true
    }
    ,
    EndDate:{
        type:Date,
        default: "",
        require: true
    },
    Status:{
        type:Number,
        default: 0
    },
    Delete:{
        type:Number,
        default:0
    },

    Options:[{option:String, Vote:[{ type: mongoose.Schema.Types.ObjectId, ref: "userstable" }],VoteCount: { type: Number, default: 0 }}],

}, { timestamps: true })
module.exports = mongoose.model("poll", pollSchema)




        

