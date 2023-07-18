const mongoose=require('mongoose')
const GameSchema=mongoose.Schema({
    GamePointTableId: { type: mongoose.Schema.Types.ObjectId, 
        ref: "gamepointtable"  },
    GameName:{
        require:true,
        type:String
    },
    GameDesc:{
        type:String
    },
    RulesPdf:{
        type:String
    },
    GroupId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Groups" 
    },

    UserId:{
        type:String
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
    Quarter: {
        type:Number,
        default: 0
    },
    Status:{
        type:Number,
        default: 0
    },
    Delete:{
        type:Number,
        default:0
    }
    ,
    EventId:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: "events" 
    },
    QuarterId: {
        type: mongoose.Schema.Types.ObjectId, ref: "quarters"

    },
},{timestamps:true})
module.exports=mongoose.model("game",GameSchema);