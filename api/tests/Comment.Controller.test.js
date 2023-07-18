const app = require("../routes/Comment.Routes");
const { ObjectId } = require("bson");

const { default: mongoose } = require("mongoose");
const User = require("../models/User.Model");
const Post = require("../models/Post.Model");
const Comment = require("../models/Comment.Model");
const bcrypt = require("bcryptjs");
const {
  commentPost,
  editComment,
  commentList,
  deleteComment,
} = require("../controller/Comment.Controller");

const { comment, postData, commentData, commentData1, postData2 } = require("./data1");

jest.mock("jsonwebtoken", () => ({
  sign: jest.fn().mockReturnValue("mocked_token"),
}));

beforeAll(async () => {
  return true;
});
jest.mock("bcryptjs", () => ({
  compareSync: jest.fn(),
  genSaltSync: jest.fn(),
  hashSync: jest.fn(),
}));
jest.mock("jsonwebtoken", () => ({
  verify: jest.fn(),
  sign: jest.fn(),
}));

describe("Comment success case", () => {
  test("Comment success case", async () => {
    const request = {
      body: {
        PostId: "63a1ee9bedd902683d9ee4f5",
        Comment: "GOOD",
        UserId:"1",
        UserName:"ededded",
        UserImage:"df3d3wd3wd"


      },

      User: {
        _id: new ObjectId("645e2d90675225374f91a05d"),
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
        Password:
          "$2a$10$9hJWLYZCc8EAWJf16vK6bOfg51usHnLqmOKCUHr/9MZ27zuJ4MQ.W",
        PasswordChange: 0,
        Otp: "0",
        GroupCreateDate: "2023-05-12T12:14:08.616Z",
        CommitteCreateDate: "2023-05-12T00:00:00.000Z",
        createdAt: "2023-05-12T12:14:08.617Z",
        updatedAt: " 2023-05-16T05:13:19.411Z",
        __v: 0,
      },
    };
    const res = {
      status: jest.fn().mockReturnValue({
        send: jest.fn().mockResolvedValue(),
        json: jest.fn().mockResolvedValue(),
      }),
      send: jest.fn(),
      json: jest.fn(),
      cookie: jest
        .fn()
        .mockReturnValue({ send: jest.fn().mockResolvedValue() }),
    };
    const next = jest.fn();
    jest.spyOn(Comment.prototype, 'save').mockResolvedValue(commentData);

    const newcomment = new Comment({
      Comment: request.body.Comment,
      PostId: request.body.PostId,
      UserId: request.User._id,
      UserName: request.User.UserName,
      UserImage: request.User.UserImage,
    });
  
    await newcomment.save();
    jest.spyOn(Post, "findByIdAndUpdate").mockResolvedValue(comment);
    await commentPost(request, res, next);
    expect(res.status).toHaveBeenCalledWith(200);
  });
});



describe("Comment save inner catch", () => {
  test("Comment  save inner catch", async () => {
    const request = {
      body: {
        PostId: "63a1ee9bedd902683d9ee4f5",
        Comment: "GOOD",
      },
      params:{
id:"1"
      },

      User: {
        _id: new ObjectId("645e2d90675225374f91a05d"),
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
        Password:
          "$2a$10$9hJWLYZCc8EAWJf16vK6bOfg51usHnLqmOKCUHr/9MZ27zuJ4MQ.W",
        PasswordChange: 0,
        Otp: "0",
        GroupCreateDate: "2023-05-12T12:14:08.616Z",
        CommitteCreateDate: "2023-05-12T00:00:00.000Z",
        createdAt: "2023-05-12T12:14:08.617Z",
        updatedAt: " 2023-05-16T05:13:19.411Z",
        __v: 0,
      },
    };
    const res = {
      status: jest.fn().mockReturnValue({
        send: jest.fn().mockResolvedValue(),
        json: jest.fn().mockResolvedValue(),
      }),
      send: jest.fn(),
      json: jest.fn(),
      cookie: jest
        .fn()
        .mockReturnValue({ send: jest.fn().mockResolvedValue() }),
    };
    const mockUpdate =  jest.spyOn(Comment.prototype, 'save');

    // Set up the mock implementation to return a rejected promise
    mockUpdate.mockRejectedValue(new Error('Mocked error'));

    // Make the function call

    await Comment.prototype.save(request.params.id, { $set: request.body })
      .then((commentData) => {
        res.status(200).send(data);
      })
      .catch((error) => {
        res.status(400).send(error);
      });
    const next = jest.fn();
    await commentPost(request, res, next);
    expect(res.status).toHaveBeenCalledWith(400);
  });
});

describe("Comment  inner catch", () => {
  test("Comment   inner catch", async () => {
    const request = {
      body: {
        PostId: "63a1ee9bedd902683d9ee4f5",
        Comment: "GOOD",
      },
      params:{
id:"1"
      },

      User: {
        _id: new ObjectId("645e2d90675225374f91a05d"),
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
        Password:
          "$2a$10$9hJWLYZCc8EAWJf16vK6bOfg51usHnLqmOKCUHr/9MZ27zuJ4MQ.W",
        PasswordChange: 0,
        Otp: "0",
        GroupCreateDate: "2023-05-12T12:14:08.616Z",
        CommitteCreateDate: "2023-05-12T00:00:00.000Z",
        createdAt: "2023-05-12T12:14:08.617Z",
        updatedAt: " 2023-05-16T05:13:19.411Z",
        __v: 0,
      },
    };
    const res = {
      status: jest.fn().mockReturnValue({
        send: jest.fn().mockResolvedValue(),
        json: jest.fn().mockResolvedValue(),
      }),
      send: jest.fn(),
      json: jest.fn(),
      cookie: jest
        .fn()
        .mockReturnValue({ send: jest.fn().mockResolvedValue() }),
    };
    const mockUpdate =  jest.spyOn(Post, 'findByIdAndUpdate');

    // Set up the mock implementation to return a rejected promise
    mockUpdate.mockRejectedValue(new Error('Mocked error'));

    // Make the function call
    jest.spyOn(Comment.prototype, 'save').mockResolvedValue(commentData);

    await Post.findByIdAndUpdate(request.params.id, { $set: request.body })
      .then((commentData) => {
        res.status(200).send(commentData);
      })
      .catch((error) => {
        res.status(400).send(error);
      });
    const next = jest.fn();
    // jest.spyOn(Post, "findByIdAndUpdate").mockResolvedValue();
    await commentPost(request, res, next);
    expect(res.status).toHaveBeenCalledWith(400);
  });
});

// describe("Comment main catch case", () => {
//   test("Comment main catch case", async () => {
//     const request = {
//       body: {
//         PostId: "63a1ee9bedd902683d9ee4f5",
//         Comment: "GOOD",
//         UserId:"1",
//         UserName:"ededded",
//         UserImage:"df3d3wd3wd"


//       },

//       User: {
//         _id: new ObjectId("645e2d90675225374f91a05d"),
//         UserName: "Alans",
//         Email: "alans.thomas@gmail.com",
//         UserNameSearch: "alans.thomas",
//         DOB: "1999-11-25T00:00:00.000Z",
//         Type: 1,
//         TypeSearch: "Committee",
//         GroupRole: 0,
//         Designation: "Software Engineer",
//         Delete: 0,
//         BirthdayStatus: 0,
//         GroupId: "0",
//         CommitteeId: "645e2f9e675225374f91a36e",
//         CommitteeRole: "0",
//         Password:
//           "$2a$10$9hJWLYZCc8EAWJf16vK6bOfg51usHnLqmOKCUHr/9MZ27zuJ4MQ.W",
//         PasswordChange: 0,
//         Otp: "0",
//         GroupCreateDate: "2023-05-12T12:14:08.616Z",
//         CommitteCreateDate: "2023-05-12T00:00:00.000Z",
//         createdAt: "2023-05-12T12:14:08.617Z",
//         updatedAt: " 2023-05-16T05:13:19.411Z",
//         __v: 0,
//       },
//     };
//     const res = {
//       status: jest.fn().mockReturnValue({
//         send: jest.fn().mockResolvedValue(),
//         json: jest.fn().mockResolvedValue(),
//       }),
//       send: jest.fn(),
//       json: jest.fn(),
//       cookie: jest
//         .fn()
//         .mockReturnValue({ send: jest.fn().mockResolvedValue() }),
//     };
//     const next = jest.fn();
//     jest.spyOn(Comment.prototype, 'save').mockResolvedValue(commentData);

//     // const newcomment = new Comment({
//     //   Comment: request.body.Comment,
//     //   PostId: request.body.PostId,
//     //   UserId: request.User._id,
//     //   UserName: request.User.UserName,
//     //   UserImage: request.User.UserImage,
//     // });
  
//     // await newcomment.save();
//     jest.spyOn(Post, "findByIdAndUpdate").mockResolvedValue(comment);
//     await commentPost(request, res, next);
//     expect(res.status).toHaveBeenCalledWith(401);
//   });
// });


// describe("editComment main catch", () => {
//   test("editComment main catch", async () => {
//     const request = {
//       body: {
//         PostId: "63a1ee9bedd902683d9ee4f5",
//         Comment: "GOOD",
//       },

//       User: {
//         _id: new ObjectId("645e2d90675225374f91a05d"),
//         UserName: "Alans",
//         Email: "alans.thomas@gmail.com",
//         UserNameSearch: "alans.thomas",
//         DOB: "1999-11-25T00:00:00.000Z",
//         Type: 1,
//         TypeSearch: "Committee",
//         GroupRole: 0,
//         Designation: "Software Engineer",
//         Delete: 0,
//         BirthdayStatus: 0,
//         GroupId: "0",
//         CommitteeId: "645e2f9e675225374f91a36e",
//         CommitteeRole: "0",
//         Password:
//           "$2a$10$9hJWLYZCc8EAWJf16vK6bOfg51usHnLqmOKCUHr/9MZ27zuJ4MQ.W",
//         PasswordChange: 0,
//         Otp: "0",
//         GroupCreateDate: "2023-05-12T12:14:08.616Z",
//         CommitteCreateDate: "2023-05-12T00:00:00.000Z",
//         createdAt: "2023-05-12T12:14:08.617Z",
//         updatedAt: " 2023-05-16T05:13:19.411Z",
//         __v: 0,
//       },
//     };
//     const res = {
//       status: jest.fn().mockReturnValue({
//         send: jest.fn().mockResolvedValue(),
//         json: jest.fn().mockResolvedValue(),
//       }),
//       send: jest.fn(),
//       json: jest.fn(),
//       cookie: jest
//         .fn()
//         .mockReturnValue({ send: jest.fn().mockResolvedValue() }),
//     };

//     const next = jest.fn();
//     jest.spyOn(Comment, "findByIdAndUpdate").mockReturnValue({exec: jest.fn().mockResolvedValue()});
//     await editComment(request, res, next);
//     expect(res.status).toHaveBeenCalledWith(401);
//   });
// });

describe("editComment success case", () => {
  test("editComment success case", async () => {
    const request = {
      body: {
        PostId: "63a1ee9bedd902683d9ee4f5",
        Comment: "GOOD",
      },
params:{
  id:"1"
},
      User: {
        _id:"645e0f5c6a1c87d58dba810c",
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
        Password:
          "$2a$10$9hJWLYZCc8EAWJf16vK6bOfg51usHnLqmOKCUHr/9MZ27zuJ4MQ.W",
        PasswordChange: 0,
        Otp: "0",
        GroupCreateDate: "2023-05-12T12:14:08.616Z",
        CommitteCreateDate: "2023-05-12T00:00:00.000Z",
        createdAt: "2023-05-12T12:14:08.617Z",
        updatedAt: " 2023-05-16T05:13:19.411Z",
        __v: 0,
      },
    };
    const res = {
      status: jest.fn().mockReturnValue({
        send: jest.fn().mockResolvedValue(),
        json: jest.fn().mockResolvedValue(),
      }),
      send: jest.fn(),
      json: jest.fn(),
      cookie: jest
        .fn()
        .mockReturnValue({ send: jest.fn().mockResolvedValue() }),
    };

    const next = jest.fn();
    jest.spyOn(Comment, "findById").mockReturnValue({ exec: jest.fn().mockResolvedValue(commentData1) });
    jest.spyOn(Comment, "findByIdAndUpdate").mockResolvedValue();

    
    await editComment(request, res, next);
    expect(res.status).toHaveBeenCalledWith(200);
  });
});

describe("editComment inner catch", () => {
  test("editComment inner catch", async () => {
    const request = {
      body: {
        PostId: "63a1ee9bedd902683d9ee4f5",
        Comment: "GOOD",
      },
params:{
  id:"1"
},
      User: {
        _id:"645e0f5c6a1c87d58dba810c",
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
        Password:
          "$2a$10$9hJWLYZCc8EAWJf16vK6bOfg51usHnLqmOKCUHr/9MZ27zuJ4MQ.W",
        PasswordChange: 0,
        Otp: "0",
        GroupCreateDate: "2023-05-12T12:14:08.616Z",
        CommitteCreateDate: "2023-05-12T00:00:00.000Z",
        createdAt: "2023-05-12T12:14:08.617Z",
        updatedAt: " 2023-05-16T05:13:19.411Z",
        __v: 0,
      },
    };
    const res = {
      status: jest.fn().mockReturnValue({
        send: jest.fn().mockResolvedValue(),
        json: jest.fn().mockResolvedValue(),
      }),
      send: jest.fn(),
      json: jest.fn(),
      cookie: jest
        .fn()
        .mockReturnValue({ send: jest.fn().mockResolvedValue() }),
    };
    const mockUpdate = jest.spyOn(Comment, 'findByIdAndUpdate');

    // Set up the mock implementation to return a rejected promise
    mockUpdate.mockRejectedValue(new Error('Mocked error'));

    // Make the function call

    await Comment.findByIdAndUpdate(request.params.id, { $set: request.body })
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((error) => {
        res.status(400).send(error);
      });

    const next = jest.fn();
    // jest.spyOn(Comment, "findById").mockReturnValue({ exec: jest.fn().mockResolvedValue(commentData1) });
    // jest.spyOn(Comment, "findByIdAndUpdate").mockResolvedValue();

    
    await editComment(request, res, next);
    expect(res.status).toHaveBeenCalledWith(400);
  });
});

// describe("editComment else case", () => {
//   test("editComment else case", async () => {
//     const request = {
//       body: {
//         PostId: "63a1ee9bedd902683d9ee4f5",
//         Comment: "GOOD",
//       },
// params:{
//   id:"1"
// },
//       User: {
//         _id: new ObjectId("645e2d90675225374f91a05d"),
//         UserName: "Alans",
//         Email: "alans.thomas@gmail.com",
//         UserNameSearch: "alans.thomas",
//         DOB: "1999-11-25T00:00:00.000Z",
//         Type: 1,
//         TypeSearch: "Committee",
//         GroupRole: 0,
//         Designation: "Software Engineer",
//         Delete: 0,
//         BirthdayStatus: 0,
//         GroupId: "0",
//         CommitteeId: "645e2f9e675225374f91a36e",
//         CommitteeRole: "0",
//         Password:
//           "$2a$10$9hJWLYZCc8EAWJf16vK6bOfg51usHnLqmOKCUHr/9MZ27zuJ4MQ.W",
//         PasswordChange: 0,
//         Otp: "0",
//         GroupCreateDate: "2023-05-12T12:14:08.616Z",
//         CommitteCreateDate: "2023-05-12T00:00:00.000Z",
//         createdAt: "2023-05-12T12:14:08.617Z",
//         updatedAt: " 2023-05-16T05:13:19.411Z",
//         __v: 0,
//       },
//     };
//     const res = {
//       status: jest.fn().mockReturnValue({
//         send: jest.fn().mockResolvedValue(),
//         json: jest.fn().mockResolvedValue(),
//       }),
//       send: jest.fn(),
//       json: jest.fn(),
//       cookie: jest
//         .fn()
//         .mockReturnValue({ send: jest.fn().mockResolvedValue() }),
//     };


//     const next = jest.fn();
//     jest.spyOn(Comment, "findById").mockReturnValue({ exec: jest.fn().mockResolvedValue(commentData) });
//     jest.spyOn(Comment, "findByIdAndUpdate").mockResolvedValue();

    
//     await editComment(request, res, next);
//     expect(res.status).toHaveBeenCalledWith(401);
//   });
// });

// describe("editComment main catch case", () => {
//   test("editComment main catch case", async () => {
//     const request = {
//       body: {
//         PostId: "63a1ee9bedd902683d9ee4f5",
//         Comment: "GOOD",
//       },
// params:{
//   id:"1"
// },
//       User: {
//         _id: new ObjectId("645e2d90675225374f91a05d"),
//         UserName: "Alans",
//         Email: "alans.thomas@gmail.com",
//         UserNameSearch: "alans.thomas",
//         DOB: "1999-11-25T00:00:00.000Z",
//         Type: 1,
//         TypeSearch: "Committee",
//         GroupRole: 0,
//         Designation: "Software Engineer",
//         Delete: 0,
//         BirthdayStatus: 0,
//         GroupId: "0",
//         CommitteeId: "645e2f9e675225374f91a36e",
//         CommitteeRole: "0",
//         Password:
//           "$2a$10$9hJWLYZCc8EAWJf16vK6bOfg51usHnLqmOKCUHr/9MZ27zuJ4MQ.W",
//         PasswordChange: 0,
//         Otp: "0",
//         GroupCreateDate: "2023-05-12T12:14:08.616Z",
//         CommitteCreateDate: "2023-05-12T00:00:00.000Z",
//         createdAt: "2023-05-12T12:14:08.617Z",
//         updatedAt: " 2023-05-16T05:13:19.411Z",
//         __v: 0,
//       },
//     };
//     const res = {
//       status: jest.fn().mockReturnValue({
//         send: jest.fn().mockResolvedValue(),
//         json: jest.fn().mockResolvedValue(),
//       }),
//       send: jest.fn(),
//       json: jest.fn(),
//       cookie: jest
//         .fn()
//         .mockReturnValue({ send: jest.fn().mockResolvedValue() }),
//     };


//     const next = jest.fn();
//     jest.spyOn(Comment, "findById").mockReturnValue();
//     jest.spyOn(Comment, "findByIdAndUpdate").mockResolvedValue();

    
//     await editComment(request, res, next);
//     expect(res.status).toHaveBeenCalledWith(401);
//   });
// });



describe("Comment list success case", () => {
  test("Comment delete list success case", async () => {
    const request = {
      params: {
        id: "63a1ee9bedd902683d9ee4f5",
      },
    };
    const res = {
      status: jest.fn().mockReturnValue({
        send: jest.fn().mockResolvedValue(),
        json: jest.fn().mockResolvedValue(),
      }),
      send: jest.fn(),
      json: jest.fn(),
      cookie: jest
        .fn()
        .mockReturnValue({ send: jest.fn().mockResolvedValue() }),
    };
    jest.spyOn(Comment, "aggregate").mockResolvedValue();

    await commentList(request, res);
    expect(res.status).toHaveBeenCalledWith(200);
  });
});

describe("Comment list fail case", () => {
  test("Comment delete list fail case", async () => {
    const request = {
      params: {
        id: "63a1ee9bedd902683d9ee4f5",
      },
    };
    const res = {
      status: jest.fn().mockReturnValue({
        send: jest.fn().mockResolvedValue(),
        json: jest.fn().mockResolvedValue(),
      }),
      send: jest.fn(),
      json: jest.fn(),
      cookie: jest
        .fn()
        .mockReturnValue({ send: jest.fn().mockResolvedValue() }),
    };
    const mockUpdate = jest.spyOn(Comment, 'aggregate');
    mockUpdate.mockRejectedValue(new Error('Mocked error'));
    await Comment.aggregate(request.params.id, { $set: request.body })
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((error) => {
        res.status(404).send(error);
      });
    await commentList(request, res);
    expect(res.status).toHaveBeenCalledWith(404);
  });
});

describe("Comment list main catch", () => {
    test("Comment list main catch", async () => {
      const request = {
        params: {
          id: "63a1ee9bedd902683d9ee4f5",
        },
      };
      const res = {
        status: jest.fn().mockReturnValue({
          send: jest.fn().mockResolvedValue(),
          json: jest.fn().mockResolvedValue(),
        }),
        send: jest.fn(),
        json: jest.fn(),
        cookie: jest
          .fn()
          .mockReturnValue({ send: jest.fn().mockResolvedValue() }),
      };
      jest.spyOn(Comment, "aggregate").mockReturnValue({ exec: jest.fn().mockResolvedValue() });
      await commentList(request, res);
      expect(res.status).toHaveBeenCalledWith(401);
    });
  });


describe("Comment delete fail case", () => {
  test("Comment delete fail case", async () => {
    const request = {
      body: {
        PostId: "63a1ee9bedd902683d9ee4f5",
      },
      params: {
        id: "63a1ee9bedd902683d9ee4f5",
      },
      User: {
        _id: new ObjectId("6462fe4ed94d0eaf9f83c8e4"),
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
        Password:
          "$2a$10$9hJWLYZCc8EAWJf16vK6bOfg51usHnLqmOKCUHr/9MZ27zuJ4MQ.W",
        PasswordChange: 0,
        Otp: "0",
        GroupCreateDate: "2023-05-12T12:14:08.616Z",
        CommitteCreateDate: "2023-05-12T00:00:00.000Z",
        createdAt: "2023-05-12T12:14:08.617Z",
        updatedAt: " 2023-05-16T05:13:19.411Z",
        __v: 0,
      },
    };
    const res = {
      status: jest.fn().mockReturnValue({
        send: jest.fn().mockResolvedValue(),
        json: jest.fn().mockResolvedValue(),
      }),
      send: jest.fn(),
      json: jest.fn(),
      cookie: jest
        .fn()
        .mockReturnValue({ send: jest.fn().mockResolvedValue() }),
    };
    jest
      .spyOn(Comment, "findById")
      .mockReturnValue({ exec: jest.fn().mockResolvedValue(comment) });
    jest
      .spyOn(Post, "findById")
      .mockReturnValue({ exec: jest.fn().mockResolvedValue(postData) });
    jest
      .spyOn(Comment, "findByIdAndDelete")
      .mockReturnValue({ exec: jest.fn().mockResolvedValue() });
    jest
      .spyOn(Post, "findByIdAndUpdate")
      .mockReturnValue({ exec: jest.fn().mockResolvedValue() });
    await deleteComment(request, res);
    expect(res.status).toHaveBeenCalledWith(403);
  });
});

describe("Comment delete main catch", () => {
  test("Comment delete main catch", async () => {
    const request = {
      body: {
        PostId: null,
      },
      params: {
        id: null,
      },
      User: {},
    };
    const res = {
      status: jest.fn().mockReturnValue({
        send: jest.fn().mockResolvedValue(),
        json: jest.fn().mockResolvedValue(),
      }),
      send: jest.fn(),
      json: jest.fn(),
      cookie: jest
        .fn()
        .mockReturnValue({ send: jest.fn().mockResolvedValue() }),
    };
    jest.spyOn(Comment, "findById").mockReturnValue();
    await deleteComment(request, res);
    expect(res.status).toHaveBeenCalledWith(401);
  });
});

describe("Comment delete success case", () => {
  test("Comment delete success case", async () => {
    const request = {
      body: {
        PostId: 1,
      },
      params: {
        id: 1,
      },
      User: {
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
        Password:
          "$2a$10$9hJWLYZCc8EAWJf16vK6bOfg51usHnLqmOKCUHr/9MZ27zuJ4MQ.W",
        PasswordChange: 0,
        Otp: "0",
        GroupCreateDate: "2023-05-12T12:14:08.616Z",
        CommitteCreateDate: "2023-05-12T00:00:00.000Z",
        createdAt: "2023-05-12T12:14:08.617Z",
        updatedAt: " 2023-05-16T05:13:19.411Z",
        __v: 0,


      },
    };
    const res = {
      status: jest.fn().mockReturnValue({
        send: jest.fn().mockResolvedValue(),
        json: jest.fn().mockResolvedValue(),
      }),
      send: jest.fn(),
      json: jest.fn(),
    
    };
    jest.spyOn(Comment, "findById").mockReturnValue({exec: jest.fn().mockResolvedValue(commentData1)});
    jest.spyOn(Post, "findById").mockReturnValue({exec: jest.fn().mockResolvedValue(postData2)});
    jest.spyOn(Comment, "findByIdAndDelete").mockResolvedValue();
    jest.spyOn(Post, "findByIdAndUpdate").mockResolvedValue();

    await deleteComment(request, res);
    expect(res.status).toHaveBeenCalledWith(200);
  });
});


describe("Comment delete post inner catch case", () => {
  test("Comment delete post inner catch case", async () => {
    const request = {
      body: {
        PostId: 1,
      },
      params: {
        id: 1,
      },
      User: {
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
        Password:
          "$2a$10$9hJWLYZCc8EAWJf16vK6bOfg51usHnLqmOKCUHr/9MZ27zuJ4MQ.W",
        PasswordChange: 0,
        Otp: "0",
        GroupCreateDate: "2023-05-12T12:14:08.616Z",
        CommitteCreateDate: "2023-05-12T00:00:00.000Z",
        createdAt: "2023-05-12T12:14:08.617Z",
        updatedAt: " 2023-05-16T05:13:19.411Z",
        __v: 0,


      },
    };
    const res = {
      status: jest.fn().mockReturnValue({
        send: jest.fn().mockResolvedValue(),
        json: jest.fn().mockResolvedValue(),
      }),
      send: jest.fn(),
      json: jest.fn(),
    
    };
    const mockUpdate = jest.spyOn(Post, 'findByIdAndUpdate');

    // Set up the mock implementation to return a rejected promise
    mockUpdate.mockRejectedValue(new Error('Mocked error'));

    // Make the function call

 
    jest.spyOn(Comment, "findById").mockReturnValue({exec: jest.fn().mockResolvedValue(commentData1)});
    jest.spyOn(Post, "findById").mockReturnValue({exec: jest.fn().mockResolvedValue(postData2)});
    jest.spyOn(Comment, "findByIdAndDelete").mockResolvedValue();
    await Post.findByIdAndUpdate(request.params.id, { $set: request.body })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((error) => {
      res.status(400).send(error);
    });

    await deleteComment(request, res);
    expect(res.status).toHaveBeenCalledWith(400);
  });
});

describe("Comment delete comment inner catch case", () => {
  test("Comment delete comment inner catch case", async () => {
    const request = {
      body: {
        PostId: 1,
      },
      params: {
        id: 1,
      },
      User: {
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
        Password:
          "$2a$10$9hJWLYZCc8EAWJf16vK6bOfg51usHnLqmOKCUHr/9MZ27zuJ4MQ.W",
        PasswordChange: 0,
        Otp: "0",
        GroupCreateDate: "2023-05-12T12:14:08.616Z",
        CommitteCreateDate: "2023-05-12T00:00:00.000Z",
        createdAt: "2023-05-12T12:14:08.617Z",
        updatedAt: " 2023-05-16T05:13:19.411Z",
        __v: 0,


      },
    };
    const res = {
      status: jest.fn().mockReturnValue({
        send: jest.fn().mockResolvedValue(),
        json: jest.fn().mockResolvedValue(),
      }),
      send: jest.fn(),
      json: jest.fn(),
    
    };
    const mockUpdate = jest.spyOn(Comment, 'findByIdAndDelete');

    // Set up the mock implementation to return a rejected promise
    mockUpdate.mockRejectedValue(new Error('Mocked error'));

    // Make the function call

 
    jest.spyOn(Comment, "findById").mockReturnValue({exec: jest.fn().mockResolvedValue(commentData1)});
    jest.spyOn(Post, "findById").mockReturnValue({exec: jest.fn().mockResolvedValue(postData2)});
    await Comment.findByIdAndDelete(request.params.id, { $set: request.body })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((error) => {
      res.status(400).send(error);
    });
    jest.spyOn(Post, "findByIdAndUpdate").mockResolvedValue();

    await deleteComment(request, res);
    expect(res.status).toHaveBeenCalledWith(400);
  });
});