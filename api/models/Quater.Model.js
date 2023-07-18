const mongoose = require('mongoose')
const quaterSchema = mongoose.Schema({

    EventId: {
        type: mongoose.Schema.Types.ObjectId, ref: "events"

    },
    QuaterName: {
        type: String,
        unique: true,
    
                
    },
    QuaterNumber: {
        type: Number,
        
        
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
    QuaterYear:{
        type:String
       
    },
    Status:{
        type:Number,
        default: 0
    },
   ResetStatus:{
        type:Number,
        default: 1
    },
    YearlyResetStatus:{
        type:Number,
        default: 1
    },

},
{ timestamps: true })
module.exports = mongoose.model("quarters", quaterSchema)