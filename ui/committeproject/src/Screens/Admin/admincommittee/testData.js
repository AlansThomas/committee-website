export const LocalData = {
  data: {
    _id: "645e0f5c6a1c87d58dba810c",
    CommitteCreateDate: "2023-05-12T10:05:16.461Z",
    CommitteeId: "0",
    CommitteeRole: "0",
    DOB: "2022-07-05T00:00:00.000Z",
    Delete: 0,
    Designation: "Test Engineer",
    Email: "ajay.kumar@gmail.com",
    GroupCreateDate: "2023-05-12T10:05:16.461Z",
    GroupId: "0",
    GroupRole: 0,
    Type: 2,
    UserImage:
      "https://images-dev-recreation.innovaturelabs.intra/Tue May 16 2023 17:17:23 GMT+0530 (India Standard Time)unnamed.png",
    UserName: "AjayKumar",
  },
  token:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NWUwZjVjNmExYzg3ZDU4ZGJhODEwYyIsImlhdCI6MTY4NDQwNTE0NSwiZXhwIjoxNjg0NDEyMzQ1fQ.g0NFXlFLGbcbRw8dyiojSLsoTdlsQpdAWaTH1Y-gGQM",
  RefreshToken:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NWUwZjVjNmExYzg3ZDU4ZGJhODEwYyIsImlhdCI6MTY4NDQwNTE0NSwiZXhwIjoxNjg0NDkxNTQ1fQ.udbtSh16yXSOyryT1xjhfm29y4E6h65u7CYTqp5dhOY",
};

export const PointListData = [
  {
    _id: "6465b256510fc24e44265b11",
    EventName: "tessty",
    EventDescription: "tessty",
    UserId: "6417f2687ffa40703e9a1c55",
    StartDate: "2023-05-18T00:00:00.000Z",
    EndDate: "2023-05-19T00:00:00.000Z",
    Status: 1,
    Delete: 0,
    File: "https://images-dev-recreation.innovaturelabs.intra/Thu May 18 2023 10:36:30 GMT+0530 (India Standard Time)Screenshot from 2023-04-10 15-39-59.png",
    createdAt: "2023-05-18T05:06:30.420Z",
    updatedAt: "2023-05-18T05:06:30.427Z",
    __v: 0,
  },
];
export const groupListData = [
  {
    _id: {
      EventId: "6465b256510fc24e44265b11",
      GroupId: "642137ae51cc2efe51ff7ba7",
    },
    count: 20,
    grouplist: [
      {
        _id: "642137ae51cc2efe51ff7ba7",
        GroupName: "Zeusssssssssssssssssssssssssss",
        GroupImage:
          "https://images-dev-recreation.innovaturelabs.intra/Tue Mar 28 2023 16:10:46 GMT+0530 (India Standard Time)cartoon-boy-images-2.jpg",
        GroupType: 0,
        Delete: 0,
        createdAt: "2023-03-27T06:29:02.293Z",
        updatedAt: "2023-04-12T09:11:42.244Z",
        __v: 0,
      },
    ],
  },
];

export const grpPointData = [
  {
    TotalPoint: 12501,
    Winner: "yes",
    GroupDetails: {
      _id: "641a72c506eef8fd5a3d971d",
      GroupName: "Nettooranszzzzzzzzzzzzzzzzzzzz",
      GroupImage:
        "https://images-dev-recreation.innovaturelabs.intra/Wed Mar 29 2023 09:28:52 GMT+0530 (India Standard Time)Screenshot (121).png",
      GroupType: 0,
      Delete: 0,
      createdAt: "2023-03-22T03:15:17.541Z",
      updatedAt: "2023-04-12T09:12:35.070Z",
      __v: 0,
    },
  },
];
export const gameListData = [
  {
    _id: "6465b274510fc24e44266468",
    GameName: "tessstt",
    GameDesc: "tessstt",
    UserId: "6417f2687ffa40703e9a1c55",
    StartDate: "2023-05-18T00:00:00.000Z",
    EndDate: "2023-05-19T00:00:00.000Z",
    Status: 1,
    Delete: 0,
    EventId: "6465b256510fc24e44265b11",
    RulesPdf:
      "https://images-dev-recreation.innovaturelabs.intra/Thu May 18 2023 10:37:00 GMT+0530 (India Standard Time)Screenshot from 2023-04-17 14-35-46.png",
    createdAt: "2023-05-18T05:07:00.733Z",
    updatedAt: "2023-05-18T05:07:00.812Z",
    __v: 0,
  },
];

export const groupListforEventHisory = [
  {
    _id: {
      GroupId: "641ae96115f57948180a822b",
    },
    grouplist: [
      {
        _id: "641ae96115f57948180a822b",
        GroupName: "Sky Walkerssssssssssssssssssss",
        GroupImage:
          "https://images-dev-recreation.innovaturelabs.intra/Wed Mar 22 2023 17:11:21 GMT+0530 (India Standard Time)low-compression-high-quality-jpg.jpg",
        GroupType: 0,
        Delete: 0,
        createdAt: "2023-03-22T11:41:21.681Z",
        updatedAt: "2023-04-12T09:12:14.074Z",
        __v: 0,
      },
    ],
  },
];

export const gameListforEventHisory = [
  {
    _id: "6465b274510fc24e4426647a",
    GameId: "6465b274510fc24e44266468",
    EventId: "6465b256510fc24e44265b11",
    Delete: 0,
    TotalPoint: 0,
    UniqueKeyGm: "6465b274510fc24e44266468",
    UniqueKeyGp: "645a04a4dcd4b3e93efa2079",
    UniqueKeyEv: "6465b256510fc24e44265b11",
    PostpondPublish: false,
    Public: false,
    PublishToInnovature: false,
    Report: null,
    NotVerify: false,
    GroupWisePublish: false,
    PublishByCommittee: false,
    RemoveFromPublish: 0,
    GroupId: "645a04a4dcd4b3e93efa2079",
    Quarter: 0,
    StartDate: null,
    EndDate: null,
    DateSendForVerification: "2000-02-01T13:35:06.054Z",
    ExpectedDateOfVerification: "2000-02-01T13:35:06.054Z",
    ElapsedDate: "2000-02-01T13:35:06.054Z",
    createdAt: "2023-05-18T05:07:00.813Z",
    updatedAt: "2023-05-18T05:07:00.813Z",
    __v: 0,
    gamelist: [
      {
        _id: "6465b274510fc24e44266468",
        GameName: "tessstt",
        GameDesc: "tessstt",
        UserId: "6417f2687ffa40703e9a1c55",
        StartDate: "2023-05-18T00:00:00.000Z",
        EndDate: "2023-05-19T00:00:00.000Z",
        Status: 0,
        Delete: 0,
        EventId: "6465b256510fc24e44265b11",
        RulesPdf:
          "https://images-dev-recreation.innovaturelabs.intra/Thu May 18 2023 10:37:00 GMT+0530 (India Standard Time)Screenshot from 2023-04-17 14-35-46.png",
        createdAt: "2023-05-18T05:07:00.733Z",
        updatedAt: "2023-05-19T18:30:00.342Z",
        __v: 0,
      },
    ],
  },
];

export const PendingData = [
  {
    _id: "6465b274510fc24e44266478",
    TotalPoint: 30,
    Eventlist: [
      {
        EventName: "tessty",
      },
    ],
    grouplist: [
      {
        GroupName: "no members",
      },
    ],
    gameList: [
      {
        GameName: "tessstt",
      },
    ],
  },
];

export const ReportedData = [
  {
    _id: "6465b274510fc24e44266478",
    TotalPoint: 30,
    Report: "ok alla",
    gameList: [
      {
        GameName: "tessstt",
      },
    ],
    Eventlist: [
      {
        EventName: "tessty",
      },
    ],
    grouplist: [
      {
        GroupName: "no members",
      },
    ],
  },
];

export const pointPublishData = [
  {
    _id: {
      GroupId: "641ae96115f57948180a822b",
    },
    count: 20,
    first_city: "6465b274510fc24e4426646d",
    VerifiedBy: "Alans Thomas",
    grouplist: [
      {
        GroupName: "Sky Walkerssssssssssssssssssss",
      },
    ],
  },
];

export const EventWisewinnerData = [
  {
    EventName: "dwqwe",
    WinnerDEtails: [
      {
        _id: {
          EventId: "6426bf3b013d33d9ff02b309",
          GroupId: "641a72c506eef8fd5a3d971d",
        },
        count: 200,
        grouplist: [
          {
            _id: "641a72c506eef8fd5a3d971d",
            GroupName: "Nettooranszzzzzzzzzzzzzzzzzzzz",
            GroupImage:
              "https://images-dev-recreation.innovaturelabs.intra/Wed Mar 29 2023 09:28:52 GMT+0530 (India Standard Time)Screenshot (121).png",
            GroupType: 0,
            Delete: 0,
            createdAt: "2023-03-22T03:15:17.541Z",
            updatedAt: "2023-04-12T09:12:35.070Z",
            __v: 0,
          },
        ],
      },
      {
        _id: {
          EventId: "6426bf3b013d33d9ff02b309",
          GroupId: "6426cb8d013d33d9ff08063c",
        },
        count: 200,
        grouplist: [
          {
            _id: "6426cb8d013d33d9ff08063c",
            GroupName: "ഗ്രൂപ്പ് നെയിം",
            GroupImage:
              "https://images-dev-recreation.innovaturelabs.intra/Mon Apr 10 2023 16:50:09 GMT+0530 (India Standard Time)music (10).JPG",
            GroupType: 0,
            Delete: 0,
            createdAt: "2023-03-31T12:01:17.173Z",
            updatedAt: "2023-04-28T06:46:36.615Z",
            __v: 0,
          },
        ],
      },
    ],
  },
];
export const csvUploadResponse = [
  {
    UserName: "raju",
    Email: "raju213@gmail.com",
    UserNameSearch: "raju213",
    DOB: "1999-11-25T00:00:00.000Z",
    Type: 0,
    TypeSearch: "Innovator",
    GroupRole: 0,
    Designation: "Software Engineer",
    Delete: 0,
    BirthdayStatus: 0,
    GroupId: "0",
    CommitteeId: "0",
    CommitteeRole: "0",
    Password: "$2a$10$A5MWJ4o7AGRDU8SsjxjlZ.b8ZpJazqhOT6FHMuuI/m7r./CR2.JxW",
    PasswordChange: 0,
    Otp: "0",
    _id: "646dca9ca348df4101c421da",
    GroupCreateDate: "2023-05-24T08:28:12.784Z",
    CommitteCreateDate: "2023-05-24T08:28:12.784Z",
    __v: 0,
    createdAt: "2023-05-24T08:28:12.784Z",
    updatedAt: "2023-05-24T08:28:12.784Z",
  },
];

export const listUserResponse = [
  {
    _id: "646dca9ca348df4101c421da",
    UserName: "raju",
    Email: "raju213@gmail.com",
    DOB: "1999-11-25T00:00:00.000Z",
    Type: 0,
    GroupRole: 0,
    Designation: "Software Engineer",
    grouplist: [],
  },
];

export const CSVuploadErrorResponse = {
  code: 11000,
  writeErrors: [
    {
      err: {
        index: 0,
        code: 11000,
        errmsg:
          'E11000 duplicate key error collection: recreation_committee.userstables index: Email_1 dup key: { Email: "raju213@gmail.com" }',
        op: {
          UserName: "raju",
          Email: "raju213@gmail.com",
          UserNameSearch: "raju213",
          DOB: "1999-11-25T00:00:00.000Z",
          Type: 0,
          TypeSearch: "Innovator",
          GroupRole: 0,
          Designation: "Software Engineer",
          Delete: 0,
          BirthdayStatus: 0,
          GroupId: "0",
          CommitteeId: "0",
          CommitteeRole: "0",
          Password:
            "$2a$10$zK53syYVDR6zt0ap3l5dpuc7ekLSaYZELZeq2Vqz9ud7OalQUZAM.",
          PasswordChange: 0,
          Otp: "0",
          _id: "646dd22fa348df4101c43a3f",
          GroupCreateDate: "2023-05-24T09:00:31.270Z",
          CommitteCreateDate: "2023-05-24T09:00:31.270Z",
          __v: 0,
          createdAt: "2023-05-24T09:00:31.273Z",
          updatedAt: "2023-05-24T09:00:31.273Z",
        },
      },
      index: 0,
    },
  ],
  result: {
    insertedCount: 0,
    matchedCount: 0,
    modifiedCount: 0,
    deletedCount: 0,
    upsertedCount: 0,
    upsertedIds: {},
    insertedIds: {
      0: "646dd22fa348df4101c43a3f",
    },
  },
  insertedDocs: [],
};

export const ErrorResponseCSV = "UserName is required";
export const DeleteUser = {
  _id: "645e2d90675225374f91a05d",
  UserName: "Alans",
  Email: "alans.thomas@gmail.com",
  UserNameSearch: "alans.thomas",
  DOB: "1999-11-25T00:00:00.000Z",
  Type: 1,
  TypeSearch: "Committee",
  GroupRole: 0,
  Designation: "Software Engineer",
  Delete: 0,
  BirthdayStatus: 0,
  GroupId: "0",
  CommitteeId: "645e2f9e675225374f91a36e",
  CommitteeRole: "0",
  Password: "$2a$10$jN9Eyr4UyHsz2XZzg3JxCe6r6pYa4Gch7UtLnl2hcyNjE8q.B4bz6",
  PasswordChange: 0,
  Otp: "0",
  GroupCreateDate: "2023-05-12T12:14:08.616Z",
  CommitteCreateDate: "2023-05-12T00:00:00.000Z",
  createdAt: "2023-05-12T12:14:08.617Z",
  updatedAt: "2023-05-24T09:03:31.691Z",
  __v: 0,
  UserImage:
    "http://localhost:4005/images/Tue May 16 2023 12:15:59 GMT+0530 (India Standard Time)Smiley.png",
};

export const DesinationListResponse = [
  {
    _id: "645e2d352f8075456aa5969f",
    Designation: "Software Engineer",
  },
];

export const SearchTestData = [
  {
    _id: "6462fe4ed94d0eaf9f83c8e4",
    UserName: "aparna",
    Email: "aparna.pb@gmail.com",
    DOB: "2023-05-03T00:00:00.000Z",
    Type: 1,
    GroupRole: 0,
    Designation: "Software Engineer",
    grouplist: [],
  },
];

export const AddUserResponse = {
  data: {
    UserName: "dyrhn",
    Email: "dujj@gmail.com",
    UserNameSearch: "dujj",
    DOB: "2023-05-04T00:00:00.000Z",
    Type: 0,
    TypeSearch: "Innovator",
    GroupRole: 0,
    Designation: "Software Engineer",
    Delete: 0,
    BirthdayStatus: 0,
    GroupId: "0",
    CommitteeId: "0",
    CommitteeRole: "0",
    Password: "$2a$10$gch7aA1z95nvBnBgC9Hmp.6mZ4pqRNQwHW91MBsWDU5yNrS/Yafo6",
    PasswordChange: 0,
    Otp: "0",
    _id: "646f02118dec14372bb0746d",
    GroupCreateDate: "2023-05-25T06:37:05.517Z",
    CommitteCreateDate: "2023-05-25T06:37:05.517Z",
    createdAt: "2023-05-25T06:37:05.517Z",
    updatedAt: "2023-05-25T06:37:05.517Z",
    __v: 0,
  },
};

export const FindCommitteeDetails = [
  {
    _id: "645e2f9e675225374f91a36e",
    GroupName: "Recreation",
    GroupImage:
      "http://localhost:4005/images/Fri May 12 2023 17:52:54 GMT+0530 (India Standard Time)bee.png",
    GroupType: 1,
    Delete: 0,
    createdAt: "2023-05-12T12:22:54.653Z",
    updatedAt: "2023-05-12T12:22:54.653Z",
    __v: 0,
  },
];
export const ListCommitteeMemberResponse = [
  {
    _id: "6465e0b5c6efdc475a290edf",
    UserName: "Alwin",
    Email: "alwin.kc@gmail.com",
    DOB: "2001-03-06T00:00:00.000Z",
    Type: 1,
    GroupRole: 0,
    Designation: "Software Engineer",
  },
];

export const AddCommitteeUserList = [
  {
    _id: "646f02118dec14372bb0746d",
    UserName: "dyrhn",
    Email: "dujj@gmail.com",
    DOB: "2023-05-04T00:00:00.000Z",
    Type: 0,
    GroupRole: 0,
    Designation: "Software Engineer",
  },
];
export const SearchResponse = [
  {
    _id: "645e2d90675225374f91a05d",
    UserName: "Alans",
    Email: "alans.thomas@gmail.com",
    DOB: "1999-11-25T00:00:00.000Z",
    Type: 1,
    GroupRole: 0,
    Designation: "Software Engineer",
    grouplist: [
      {
        GroupName: "zeus",
      },
    ],
  },
];

export const CommitteeMemberDeleteRes = {
  _id: "646f01718dec14372bb073b1",
  UserName: "ferf",
  Email: "erfgerfr@gmail.com",
  UserNameSearch: "erfgerfr",
  DOB: "2023-05-10T00:00:00.000Z",
  Type: 1,
  TypeSearch: "Committee",
  GroupRole: 0,
  Designation: "Software Engineer",
  Delete: 0,
  BirthdayStatus: 0,
  GroupId: "0",
  CommitteeId: "645e2f9e675225374f91a36e",
  CommitteeRole: "0",
  Password: "$2a$10$1zCJd9QxyyuBRGNiFjpCL.vUU8HKTlYHpZuttoTEwYlVwrJNvw0ce",
  PasswordChange: 0,
  Otp: "0",
  GroupCreateDate: "2023-05-25T06:34:25.405Z",
  CommitteCreateDate: "2023-05-25T00:00:00.000Z",
  createdAt: "2023-05-25T06:34:25.407Z",
  updatedAt: "2023-05-25T09:36:05.314Z",
  __v: 0,
};
export const TeamSearch = [
  {
    _id: "6462fe4ed94d0eaf9f83c8e4",
    UserName: "aparna",
    Email: "aparna.pb@gmail.com",
    DOB: "2023-05-03T00:00:00.000Z",
    Type: 1,
    GroupRole: 0,
    Designation: "Software Engineer",
    grouplist: [
      {
        GroupName: "zeus",
      },
    ],
  },
];
export const RoleChangeList = [
  {
    _id: "646f02118dec14372bb0746d",
    UserName: "dyrhn",
    Email: "dujj@gmail.com",
    DOB: "2023-05-04T00:00:00.000Z",
    Type: 0,
    GroupRole: 0,
  },
];
