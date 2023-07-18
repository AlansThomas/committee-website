


  const mongoose = require('mongoose')
const postSchema = mongoose.Schema({
    
    PointId: { type: mongoose.Schema.Types.ObjectId, ref: "TotalPoints" },
    StartDate:{
        type:Date,
        default:""
    
      },
      EndDate:{
        type:Date,
        default:""
    
      },

      point:{
        type:Number,
        default:0
      }

}, { Timestamp: true })
module.exports = mongoose.model("VerifyModel", postSchema)
