const { ObjectId } = require('bson');

const postData={
    _id: new ObjectId("6462fe81d94d0eaf9f83ca01"),
    UserId: new ObjectId("6462fe4ed94d0eaf9f83c8e4"),
    PostImage: 'http://localhost:4005/images/Tue May 16 2023 09:24:41 GMT+0530 (India Standard Time)Batmindon2.jpg',
    Tags: '1',
    PostDescription: '<p>Hiiiii</p>\r\n',
    LikeCount: 0,
    PostedUser: 'aparna',
    CommentCount: 0,
    Like: [],
    PersonalTags: [],
    GroupTags: [],
    HashTags: [],
    Dislike: [],
    Delete: 0,
    LikeStatus: false,
    Comments: [],
    createdAt: "2023-05-16T03:54:41.390Z",
    updatedAt: "2023-05-16T05:21:14.740Z",
    __v: 0
  }
  const postData1={
    _id: new ObjectId("6462fe81d94d0eaf9f83ca01"),
    UserId: new ObjectId("6462fe4ed94d0eaf9f83c8e4"),
    PostImage: 'http://localhost:4005/images/Tue May 16 2023 09:24:41 GMT+0530 (India Standard Time)Batmindon2.jpg',
    Tags: '1',
    PostDescription: '<p>Hiiiii</p>\r\n',
    LikeCount: 0,
    PostedUser: 'aparna',
    CommentCount: 0,
    Like: [new ObjectId("645e2d90675225374f91a05d")],
    PersonalTags: [],
    GroupTags: [],
    HashTags: [],
    Dislike: [],
    Delete: 0,
    LikeStatus: false,
    Comments: [],
    createdAt: "2023-05-16T03:54:41.390Z",
    updatedAt: "2023-05-16T05:21:14.740Z",
    __v: 0
  }
  const comment={
    Comment: 'GOOD',
    PostId: new ObjectId("6462fe98d94d0eaf9f83ca4f"),
    UserId: new ObjectId("6462fe4ed94d0eaf9f83c8e4"),
    UserName: 'Alans',
    UserImage: 'http://localhost:4005/images/Tue May 16 2023 12:15:59 GMT+0530 (India Standard Time)Smiley.png',
    Delete: 0,
    _id: new ObjectId("64647e9513beb12c5bbbde8d"),
    createdAt: "2023-05-17T07:13:25.713Z",
    updatedAt: "2023-05-17T07:13:25.713Z",
    __v: 0
  }
  const commentData={
    Comment: '34d4ddfdrdf',
    PostId: new ObjectId("6465ef89c6efdc475a2923d6"),
    UserId: new ObjectId("645e0f5c6a1c87d58dba810c"),
    UserName: 'AjayKumar',
    UserImage: 'https://images-dev-recreation.innovaturelabs.intra/Tue May 16 2023 17:17:23 GMT+0530 (India Standard Time)unnamed.png',
    Delete: 0,
    _id: new ObjectId("6467058130f6c935485bf31c"),
    createdAt: "2023-05-19T05:13:37.242Z",
    updatedAt: "2023-05-19T05:13:37.242Z",
    __v: 0
  }
  const commentData1={
    _id: new ObjectId("6467058130f6c935485bf31c"),
    Comment: '34d4ddfdrdf',
    PostId: new ObjectId("6465ef89c6efdc475a2923d6"),
    UserId:"645e0f5c6a1c87d58dba810c",
    UserName: 'AjayKumar',
    UserImage: 'https://images-dev-recreation.innovaturelabs.intra/Tue May 16 2023 17:17:23 GMT+0530 (India Standard Time)unnamed.png',
    Delete: 0,
    createdAt: "2023-05-19T05:13:37.242Z",
    updatedAt: "2023-05-19T05:13:37.242Z",
    __v: 0
  }
  const  postData2={
    _id: new ObjectId("6465ef89c6efdc475a2923d6"),
    UserId: "645e2d90675225374f91a05d",
    Tags: '1',
    PostDescription: '<p>jjjjjjjjjjjjjjjjjjjjjjjj</p>\r\n',
    LikeCount: 0,
    PostedUser: 'Alans',
    CommentCount: 2,
    Like: [],
    PersonalTags: [],
    GroupTags: [],
    HashTags: [],
    Dislike: [],
    Delete: 0,
    LikeStatus: false,
    Comments: [
      new ObjectId("6467053330f6c935485bf2c6"),
      new ObjectId("6467058130f6c935485bf31c")
    ],
    createdAt: "2023-05-18T09:27:37.753Z",
    updatedAt: "2023-05-19T05:13:37.649Z",
    __v: 0
  }
  const totalPoints=[
    {
      _id: new ObjectId("645e30eb675225374f91a578"),
      GameId: new ObjectId("645e30eb675225374f91a572"),
      EventId: new ObjectId("645e30c6675225374f91a53f"),
      Delete: 0,
      TotalPoint: 0,
      UniqueKeyGm: '645e30eb675225374f91a572',
      UniqueKeyGp: '645e3089675225374f91a4ea',
      UniqueKeyEv: '645e30c6675225374f91a53f',
      PostpondPublish: false,
      Public: false,
      PublishToInnovature: false,
      Report: null,
      NotVerify: false,
      GroupWisePublish: false,
      PublishByCommittee: false,
      RemoveFromPublish: 0,
      GroupId: new ObjectId("645e3089675225374f91a4ea"),
      Quarter: 0,
      StartDate: null,
      EndDate: null,
      DateSendForVerification: "2023-05-12T12:43:09.184Z",
      ExpectedDateOfVerification: "2023-05-19T12:43:09.184Z",
      ElapsedDate: "2023-05-20T12:43:09.184Z",
      createdAt: "2023-05-12T12:28:27.730Z",
      updatedAt: "2023-05-12T12:43:48.214Z",
      __v: 0
    },
    {
      _id: new ObjectId("645e30eb675225374f91a579"),
      GameId: new ObjectId("645e30eb675225374f91a572"),
      EventId: new ObjectId("645e30c6675225374f91a53f"),
      Delete: 0,
      TotalPoint: 10,
      UniqueKeyGm: '645e30eb675225374f91a572',
      UniqueKeyGp: '645e309b675225374f91a508',
      UniqueKeyEv: '645e30c6675225374f91a53f',
      PostpondPublish: true,
      Public: false,
      PublishToInnovature: false,
      Report: 'not ok',
      NotVerify: true,
      GroupWisePublish: false,
      PublishByCommittee: false,
      RemoveFromPublish: 0,
      GroupId: new ObjectId("645e309b675225374f91a508"),
      Quarter: 0,
      StartDate: null,
      EndDate: null,
      DateSendForVerification: "2023-05-12T12:43:09.184Z",
      ExpectedDateOfVerification: "2023-05-19T12:43:09.184Z",
      ElapsedDate: "2023-05-20T12:43:09.184Z",
      createdAt: "2023-05-12T12:28:27.730Z",
      updatedAt: "2023-05-12T12:43:48.214Z",
      __v: 0
    }
  ]
   const top3Groups=[
    {
      _id: { GroupId: new ObjectId("645e307b675225374f91a4d4") },
      TotalPoint: 89,
      TotalPointId: new ObjectId("645e30eb675225374f91a577"),
      grouplist: [ [Object] ]
    },
    {
      _id: { GroupId: new ObjectId("645e309b675225374f91a508") },
      TotalPoint: 10,
      TotalPointId: new ObjectId("645e30eb675225374f91a579"),
      grouplist: [ [Object] ]
    }
  ]

  const pollCreate={
    UserId: new ObjectId("645e0f5c6a1c87d58dba810c"),
    Topic: 'd32ed2qed2ed',
    StartDate:new Date(),
    EndDate: " 2023-05-22T04:12:28.637Z",
    Status: 0,
    Delete: 0,
    Options: [
      {
        option: 'edwedewdewdf',
        Vote: [],
        VoteCount: 0,
        _id: new ObjectId("646aebac2d5f3b730ade7a0a")
      },
      {
        option: '3d3d3wd3wd3d',
        Vote: [],
        VoteCount: 0,
        _id: new ObjectId("646aebac2d5f3b730ade7a0b")
      }
    ],
    _id: new ObjectId("646aebac2d5f3b730ade7a09"),
    createdAt:" 2023-05-22T04:12:28.637Z",
    updatedAt: " 2023-05-22T04:12:28.637Z",
    __v: 0
  }
  const pollUser= [
    {
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
      GroupId: '0',
      CommitteeId: '645e2f9e675225374f91a36e',
      CommitteeRole: '0',
      Password: '$2a$10$jN9Eyr4UyHsz2XZzg3JxCe6r6pYa4Gch7UtLnl2hcyNjE8q.B4bz6',
      PasswordChange: 0,
      Otp: '0',
      GroupCreateDate: "2023-05-12T12:14:08.616Z",
      CommitteCreateDate: "2023-05-12T00:00:00.000Z",
      createdAt:" 2023-05-12T12:14:08.617Z",
      updatedAt: "2023-05-19T12:11:26.684Z",
      __v: 0,
      UserImage: 'http://localhost:4005/images/Tue May 16 2023 12:15:59 GMT+0530 (India Standard Time)Smiley.png'
    },
    {
      _id: new ObjectId("6462fe4ed94d0eaf9f83c8e4"),
      UserName: 'aparna',
      Email: 'aparna.pb@gmail.com',
      UserNameSearch: 'aparna.pb',
      DOB: "1999-11-25T00:00:00.000Z",
      Type: 1,
      TypeSearch: 'Committee',
      GroupRole: 0,
      Designation: 'Software Engineer',
      Delete: 0,
      BirthdayStatus: 0,
      GroupId: '0',
      CommitteeId: '645e2f9e675225374f91a36e',
      CommitteeRole: '0',
      Password: '$2a$10$97D32CQisuAOT6sKtuWShegAwtqN2A7JOpC7wx.s1rmCp9Fm7tQ4.',
      PasswordChange: 0,
      Otp: '0',
      GroupCreateDate: "2023-05-12T12:14:08.616Z",
      CommitteCreateDate: "2023-05-12T00:00:00.000Z",
      createdAt:" 2023-05-12T12:14:08.617Z",
      updatedAt: "2023-05-19T12:11:26.684Z",
      __v: 0
    },
    {
      _id: new ObjectId("6465e0b5c6efdc475a290edf"),
      UserName: 'Alwin',
      Email: 'alwin.kc@gmail.com',
      UserNameSearch: 'alwin.kc',
      DOB: "1999-11-25T00:00:00.000Z",
      Type: 1,
      TypeSearch: 'Committee',
      GroupRole: 0,
      Designation: 'Software Engineer',
      Delete: 0,
      BirthdayStatus: 0,
      GroupId: '0',
      CommitteeId: '645e2f9e675225374f91a36e',
      CommitteeRole: '0',
      Password: '$2a$10$yae214Remo5wdWAO9k./runtD8maKbtHDIxzfUtSIcKd1uvMBCZvu',
      PasswordChange: 0,
      Otp: '0',
      GroupCreateDate: "2023-05-12T12:14:08.616Z",
      CommitteCreateDate: "2023-05-12T00:00:00.000Z",
      createdAt:" 2023-05-12T12:14:08.617Z",
      updatedAt: "2023-05-19T12:11:26.684Z",
      __v: 0
    }
  ]

  const poll2={
    _id: new ObjectId("646afe6b99a3ef87d0ad1061"),
    UserId: new ObjectId("645e0f5c6a1c87d58dba810c"),
    Topic: 'd32ed2qed2ed',
    StartDate: "2023-05-22T00:00:00.000Z",
    EndDate: "2023-05-22T00:00:00.000Z",
    Status: 0,
    Delete: 0,
    Options: [
      {
        option: 'edwedewdewdf',
        Vote: [],
        VoteCount: 0,
        _id: new ObjectId("646afe6b99a3ef87d0ad1062")
      },
      {
        option: '3d3d3wd3wd3d',
        Vote: [],
        VoteCount: 0,
        _id: new ObjectId("646afe6b99a3ef87d0ad1063")
      }
    ],
    createdAt: "2023-05-22T05:32:27.338Z",
    updatedAt: "2023-05-22T05:32:27.338Z",
    __v: 0
  }
  const pollVote={
    _id: new ObjectId("646afe6b99a3ef87d0ad1061"),
    UserId: new ObjectId("645e0f5c6a1c87d58dba810c"),
    Topic: 'd32ed2qed2ed',
    StartDate: "2023-05-22T00:00:00.000Z",
    EndDate: "2023-05-22T00:00:00.000Z",
    Status: 1,
    Delete: 0,
    Options: [
      {
        option: 'edwedewdewdf',
        Vote: [Array],
        VoteCount: 1,
        _id: new ObjectId("646afe6b99a3ef87d0ad1062")
      },
      {
        option: '3d3d3wd3wd3d',
        Vote: [],
        VoteCount: 0,
        _id: new ObjectId("646afe6b99a3ef87d0ad1063")
      }
    ],
    createdAt: "2023-05-22T05:32:27.338Z",
    updatedAt: "2023-05-22T06:18:55.165Z",
    __v: 0
  }

  const listPolls=[
   
    {
      _id: new ObjectId("646afc0a3addb97207b19597"),
      UserId: new ObjectId("645e0f5c6a1c87d58dba810c"),
      Topic: 'd32ed2qed2ed',
      StartDate: "2023-05-22T00:00:00.000Z",
      EndDate: "2023-05-22T00:00:00.000Z",
      Status: 1,
      Delete: 0,
      Options: [ [Object], [Object] ],
      createdAt: "2023-05-22T05:22:18.749Z",
      updatedAt: "2023-05-22T05:22:19.160Z",
      __v: 0
    },
    
    {
      _id: new ObjectId("646af5acab13c5f33f958f07"),
      UserId: new ObjectId("645e0f5c6a1c87d58dba810c"),
      Topic: 'd32ed2qed2ed',
      StartDate: "2023-11-12T00:00:00.000Z",
      EndDate: "2023-11-20T00:00:00.000Z",
      Status: 0,
      Delete: 0,
      Options: [ [Object], [Object] ],
      createdAt: "2023-05-22T04:55:08.612Z",
      updatedAt: "2023-05-22T04:55:08.612Z",
      __v: 0
    }
    
  ]

  const pollByID={
    _id: new ObjectId("646afe6b99a3ef87d0ad1061"),
    UserId: new ObjectId("645e0f5c6a1c87d58dba810c"),
    Topic: 'd32ed2qed2ed',
    StartDate: "2023-05-22T00:00:00.000Z",
    EndDate: "2023-05-22T00:00:00.000Z",
    Status: 1,
    Delete: 0,
    Options: [
      {
        option: 'edwedewdewdf',
        Vote: [Array],
        VoteCount: 1,
        _id: new ObjectId("646afe6b99a3ef87d0ad1062")
      },
      {
        option: '3d3d3wd3wd3d',
        Vote: [],
        VoteCount: 0,
        _id: new ObjectId("646afe6b99a3ef87d0ad1063")
      }
    ],
    createdAt: "2023-05-22T05:32:27.338Z",
    updatedAt: "2023-05-22T06:18:55.165Z",
    __v: 0
  }
  const activrPolls=[
    {
      _id: new ObjectId("646afe6b99a3ef87d0ad1061"),
      Topic: 'd32ed2qed2ed',
      Status: 1,
      StartDate: "2023-05-22T00:00:00.000Z",
      EndDate: "2023-05-22T00:00:00.000Z",
      totalVotes: [ new ObjectId("645e2d90675225374f91a05d") ],
      Options: [ [Object], [Object] ]
    },
    {
      _id: new ObjectId("646afc0a3addb97207b19597"),
      Topic: 'd32ed2qed2ed',
      Status: 1,
      StartDate: "2023-05-22T00:00:00.000Z",
      EndDate: "2023-05-22T00:00:00.000Z",
      totalVotes: [],
      Options: [ [Object], [Object] ]
    }
  ]
  const pollUpdate={
    _id: new ObjectId("646c7c2708d19ac50dcd658c"),
    UserId: new ObjectId("645e0f5c6a1c87d58dba810c"),
    Topic: 'd32ed2qed2ed',
    StartDate: new Date(),
    EndDate: new Date(),
    Status: 0,
    Delete: 0,
    Options: [
      {
        option: 'edwedewdewdf',
        Vote: [],
        VoteCount: 0,
        _id: new ObjectId("646c7c2708d19ac50dcd658d")
      },
      {
        option: '3d3d3wd3wd3d',
        Vote: [],
        VoteCount: 0,
        _id: new ObjectId("646c7c2708d19ac50dcd658e")
      }
    ],
    createdAt:" 2023-05-23T08:41:11.675Z",
    updatedAt: "2023-05-23T08:41:11.675Z",
    __v: 0
  }
  const pollUpdate2={
    _id: new ObjectId("646c7ec20a433947e9d995a6"),
    UserId: new ObjectId("645e0f5c6a1c87d58dba810c"),
    Topic: 'd32ed2qed2ed',
    StartDate: new Date(),
    EndDate: new Date(),
    Status: 0,
    Delete: 0,
    Options: [
      {
        option: 'edwedewdewdf',
        Vote: [],
        VoteCount: 0,
        _id: new ObjectId("646c7ec20a433947e9d995a7")
      },
      {
        option: '3d3d3wd3wd3d',
        Vote: [],
        VoteCount: 0,
        _id: new ObjectId("646c7ec20a433947e9d995a8")
      }
    ],
    createdAt: "2023-05-23T08:52:18.311Z",
    updatedAt: "2023-05-23T08:52:18.311Z",
    __v: 0
  }
  const deletePolls={
    _id: new ObjectId("646c7c2708d19ac50dcd658c"),
    UserId: new ObjectId("645e0f5c6a1c87d58dba810c"),
    Topic: 'efeeddder',
    StartDate: new Date(),
    EndDate: new Date(),
    Status: 1,
    Delete: 0,
    Options: [
      {
        option: 'efefefef',
        Vote: [],
        VoteCount: 0,
        _id: new ObjectId("646c7c3b08d19ac50dcd65bb")
      },
      {
        option: 'ferfefefe',
        Vote: [],
        VoteCount: 0,
        _id: new ObjectId("646c7c3b08d19ac50dcd65bc")
      }
    ],
    createdAt:" 2023-05-23T08:41:11.675Z",
    updatedAt: "2023-05-23T08:41:32.495Z",
    __v: 0
  }
  const totalPointArray=[
    {
      _id: new ObjectId("645e30eb675225374f91a576"),
      GameId: new ObjectId("645e30eb675225374f91a572"),
      EventId: new ObjectId("645e30c6675225374f91a53f"),
      Delete: 0,
      TotalPoint: 0,
      UniqueKeyGm: '645e30eb675225374f91a572',
      UniqueKeyGp: '645e306e675225374f91a4c1',
      UniqueKeyEv: '645e30c6675225374f91a53f',
      PostpondPublish: false,
      Public: false,
      PublishToInnovature: false,
      Report: null,
      NotVerify: false,
      GroupWisePublish: false,
      PublishByCommittee: false,
      RemoveFromPublish: 0,
      GroupId: new ObjectId("645e306e675225374f91a4c1"),
      Quarter: 0,
      StartDate: null,
      EndDate: null,
      DateSendForVerification: "2000-02-01T13:35:06.054Z",
      ExpectedDateOfVerification: "2000-02-01T13:35:06.054Z",
      ElapsedDate:" 2000-02-01T13:35:06.054Z",
      createdAt: "2023-05-12T12:28:27.730Z",
      updatedAt: "2023-05-12T12:28:27.730Z",
      __v: 0,
      gamelist: [ {StartDate:new Date()} ]
    }
  ]
  module.exports={postData,postData1,comment,commentData,commentData1,postData2,totalPoints,top3Groups,pollCreate,pollUser,poll2,pollVote,listPolls,pollByID,activrPolls,pollUpdate,pollUpdate2,deletePolls,totalPointArray}
