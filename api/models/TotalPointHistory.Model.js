const mongoose = require('mongoose')

const totalPointHistorySchema = mongoose.Schema({
  GameId: { type: mongoose.Schema.Types.ObjectId, ref: "game" },
  QuarterId: {
    type: mongoose.Schema.Types.ObjectId, ref: "quarters"

},
  EventId:
    { type: mongoose.Schema.Types.ObjectId, ref: "Event" },
  Delete: {

    type: Number,
    default: 0

  },
  TotalPoint: {

    type: Number

  }, UniqueKeyGm: {
    type: String
  }, UniqueKeyGp: {
    type: String
  },
  UniqueKeyEv: {
    type: String
  },
  PostpondPublish: 
  {
    type: Boolean,
    default: false
  },
  Public:{
    type: Boolean,
    default: false

  },
  PublishToInnovature:{
    type: Boolean,
    default: false
  },
  Report:{
    type:String,
    default:null

  },
  NotVerify: {
    type:Boolean,
    default:false

  },  GroupWisePublish: {
    type:Boolean,
    default:false

  },
  PublishByCommittee:{
    type:Boolean,
    default:false
  },
  RemoveFromPublish:{
    type:Number,
    default:0

  },
  GroupId: { type: mongoose.Schema.Types.ObjectId, ref: "Groups" },

  Quarter: {
    type: Number,
    default:0
  },
  VerifiedBy: {
    type: String
  },
  DateSendForVerification:{
    type:Date,
    default:"2000-02-01T13:35:06.054+00:00"

  },
  ExpectedDateOfVerification:{
    type:Date,
    default:"2000-02-01T13:35:06.054+00:00"

  },
  ElapsedDate:{
    type:Date,
    default:"2000-02-01T13:35:06.054+00:00"

  },
}, { timestamps: true })

module.exports = mongoose.model("TotalPointHistory", totalPointHistorySchema);