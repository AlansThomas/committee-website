const { ObjectId } = require('bson');

const groupData = {
  _id: new ObjectId("645e307b675225374f91a4d4"),
  GroupName: 'theepori',
  GroupImage: 'http://localhost:4005/images/Fri May 12 2023 17:56:35 GMT+0530 (India Standard Time)512763.jpg',
  GroupType: 0,
  Delete: 0,
  createdAt: " 2023-05-12T12:26:35.446Z",
  updatedAt: " 2023-05-12T12:26:35.446Z",
  __v: 0
}

const eventData = {
  _id: new ObjectId("645e30c6675225374f91a53f"),
  EventName: 'test one',
  EventDescription: 'test one',
  UserId: new ObjectId("645e2d90675225374f91a05d"),
  StartDate: new Date(),
  EndDate: new Date(),
  Status: 0,
  Delete: 0,
  File: 'http://localhost:4005/images/Fri May 12 2023 17:57:50 GMT+0530 (India Standard Time)images.jpeg',
  createdAt: "2023-05-12T12:27:50.514Z",
  updatedAt: "2023-05-23T12:51:09.265Z",
  __v: 0
}

const groupData2 = {
  _id: new ObjectId("645e307b675225374f91a4d4"),
  GroupName: 'theepori',
  GroupImage: 'http://localhost:4005/images/Fri May 12 2023 17:56:35 GMT+0530 (India Standard Time)512763.jpg',
  GroupType: 0,
  Delete: 0,
  createdAt: "2023-05-12T12:26:35.446Z",
  updatedAt: "2023-05-12T12:26:35.446Z",
  __v: 0
}
const sum = [
  {
    _id: new ObjectId("645e30c6675225374f91a53f"),
    EventName: 'test one',
    EventDescription: 'test one',
    UserId: new ObjectId("645e2d90675225374f91a05d"),
    StartDate: new Date(),
    EndDate: new Date(),
    Status: 0,
    Delete: 0,
    File: 'http://localhost:4005/images/Fri May 12 2023 17:57:50 GMT+0530 (India Standard Time)images.jpeg',
    createdAt: "2023-05-12T12:27:50.514Z",
    updatedAt: "2023-05-23T12:51:09.265Z",
    __v: 0
  }
]

const sum2 = [
  {
    _id: {
      EventId: new ObjectId("645e30c6675225374f91a53f"),
      GroupId: new ObjectId("645e307b675225374f91a4d4")
    },
    count: 89,
    grouplist: [[Object]]
  },
  {
    _id: {
      EventId: new ObjectId("645e30c6675225374f91a53f"),
      GroupId: new ObjectId("645e309b675225374f91a508")
    },
    count: 10,
    grouplist: [[Object]]
  }
]

const pointDelete = [
  {
    _id: new ObjectId("645e30ec675225374f91a589"),
    TotalPointId: new ObjectId("645e30eb675225374f91a579"),
    GameId: new ObjectId("645e30eb675225374f91a572"),
    EventId: new ObjectId("645e30c6675225374f91a53f"),
    Delete: 0,
    TotalPoint: 50,
    UniqueKeyGm: '645e30eb675225374f91a572',
    UniqueKeyGp: '645e309b675225374f91a508',
    UniqueKeyEv: '645e30c6675225374f91a53f',
    PostpondPublish: false,
    Public: false,
    PublishToInnovature: true,
    Report: null,
    NotVerify: false,
    GroupWisePublish: false,
    PublishByCommittee: true,
    RemoveFromPublish: 0,
    GroupId: new ObjectId("645e309b675225374f91a508"),
    Quarter: 0,
    StartDate: null,
    EndDate: null,
    DateSendForVerification: "2023-05-24T08:14:08.972Z",
    ExpectedDateOfVerification: "2023-05-31T08:14:08.972Z",
    ElapsedDate: "2023-06-01T08:14:08.972Z",
    createdAt: "2023-05-12T12:28:28.059Z",
    updatedAt: "2023-05-24T08:18:36.636Z",
    __v: 0
  }
]

const pointDelete2 = {
  acknowledged: true,
  modifiedCount: 1,
  upsertedId: null,
  upsertedCount: 0,
  matchedCount: 1
}
const pointDelete3 = {
  acknowledged: true,
  modifiedCount: 0,
  upsertedId: null,
  upsertedCount: 0,
  matchedCount: 1
}

const eventGroupUser = { _id: new ObjectId("645e2d90675225374f91a05d"), GroupId: '646dc784f265500a938221b1' }

const eventArray = [
  {
    _id: new ObjectId("645e30c6675225374f91a53f"),
    EventName: 'test one',
    EventDescription: 'test one',
    UserId: new ObjectId("645e2d90675225374f91a05d"),
    StartDate: new Date(),
    EndDate: new Date(),
    Status: 0,
    Delete: 0,
    File: 'http://localhost:4005/images/Fri May 12 2023 17:57:50 GMT+0530 (India Standard Time)images.jpeg',
    createdAt: "2023-05-12T12:27:50.514Z",
    updatedAt: "2023-05-23T12:51:09.265Z",
    __v: 0
  }

]

const promiseArray = [
  [
    {
      _id: [Object],
      TotalPoint: 88,
      grouplist: [Array],
      eventlist: [Array]
    }
  ]
]
const notify = [
  {
    _id: new ObjectId("646c7c0208d19ac50dcd6543"),
    PollId: new ObjectId("646c7c0108d19ac50dcd653a"),
    Message: 'Poll is active. Click to view the poll',
    verifyNotif: 0,
    Read: 0,
    NotifiedUser: new ObjectId("645e2d90675225374f91a05d"),
    Status: 0,
    TotalPoint: 0,
    PointVerificationRead: null,
    __v: 0,
    createdAt: "2023-05-23T08:40:34.465Z",
    userlist: []
  },

]

const notify2 = [{ _id: null, count: 4 }]

const notify3 = [
  {
    _id: new ObjectId("646d9ce2f265500a9381e488"),
    PostId: new ObjectId("646d9ce1f265500a9381e485"),
    Message: 'Alans tagged you in a Post',
    verifyNotif: 0,
    Read: 0,
    TaggedUser: new ObjectId("645e2d90675225374f91a05d"),
    Status: 0,
    TotalPoint: 0,
    PointVerificationRead: null,
    __v: 0,
    createdAt: "2023-05-24T05:13:06.225Z",
    Postlist: [[{ Tags: 1 }]],
    userlist: [[Object]]
  },
  {
    _id: new ObjectId("6465e3bcc6efdc475a29133c"),
    PostId: new ObjectId("6465e3bbc6efdc475a291334"),
    Message: 'Alwin tagged you in a Post',
    verifyNotif: 0,
    Read: 0,
    TaggedUser: new ObjectId("645e2d90675225374f91a05d"),
    Status: 0,
    TotalPoint: 0,
    PointVerificationRead: null,
    __v: 0,
    createdAt: "2023-05-18T08:37:16.993Z",
    Postlist: [[Object]],
    userlist: [[Object]]
  }
]
const notifyUser = {
  _id: new ObjectId("645e2d90675225374f91a05d"),
  UserName: 'Alans',
  Email: 'alans.thomas@gmail.com',
  UserNameSearch: 'alans.thomas',
  DOB: "1999-11-25T00:00:00.000Z",
  Type: 1,
  TypeSearch: 'Committee',
  GroupRole: 0,
  Designation: 'Software Engineer',
  Delete: 0,
  BirthdayStatus: 0,
  GroupId: '646dc784f265500a938221b1',
  CommitteeId: '0',
  CommitteeRole: '0',
  Password: '$2a$10$jN9Eyr4UyHsz2XZzg3JxCe6r6pYa4Gch7UtLnl2hcyNjE8q.B4bz6',
  PasswordChange: 0,
  Otp: '0',
  GroupCreateDate: "2023-05-24T00:00:00.000Z",
  CommitteCreateDate: " 2023-05-12T00:00:00.000Z",
  createdAt: "2023-05-12T12:14:08.617Z",
  updatedAt: "2023-05-25T08:33:25.377Z",
  __v: 0,
  UserImage: 'http://localhost:4005/images/Tue May 16 2023 12:15:59 GMT+0530 (India Standard Time)Smiley.png',
  GroupIdObj: new ObjectId("646dc784f265500a938221b1")
}

const userId = [{
  _id: new ObjectId("646dc784f265500a938221b1"),
  DOB: "2023-05-03T00:00:00.000Z",
  Designation: "Software Engineer",
  Email: "aparna.pb@gmail.com",
  GroupRole: 0,
  Type: 1,
  UserName: "aparna",

},
{
  _id: new ObjectId("646dc784f265500a938221b1"),
  DOB: "2023-05-03T00:00:00.000Z",
  Designation: "Software Engineer",
  Email: "aparna.pb@gmail.com",
  GroupRole: 0,
  Type: 1,
  UserName: "aparna",

}]
module.exports = { groupData, eventData, groupData2, sum, sum2, pointDelete, pointDelete2, pointDelete3, eventGroupUser, eventArray, promiseArray, notify, notify2, notify3, notifyUser, userId }