const mongoose = require('mongoose')

const TotalPointBackupSchema = mongoose.Schema({
  TotalPointId: {
     type: mongoose.Schema.Types.ObjectId, ref: "TotalPoints" 
  },
  GameId: { type: mongoose.Schema.Types.ObjectId, ref: "game" },
  EventId:
    { type: mongoose.Schema.Types.ObjectId, ref: "Event" },
  Delete: {

    type: Number,
    default: 0

  },
  QuarterId: {
    type: mongoose.Schema.Types.ObjectId, ref: "quarters"
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
  StartDate:{
    type:Date,
    default:""

  },
  EndDate:{
    type:Date,
    default:""

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

module.exports = mongoose.model("TotalPointBackup", TotalPointBackupSchema);