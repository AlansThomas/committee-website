const app = require("../routes/Like.Routes");
const { ObjectId } = require("bson");

const { default: mongoose } = require("mongoose");
const User = require("../models/User.Model");
const Post = require("../models/Post.Model");
const bcrypt = require("bcryptjs");
const { disLikePost,likePost } = require("../controller/Like.Controller");
const { postData, postData1 } = require("./data1");

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

describe("Like success case", () => {
  test("Like success case", async () => {
    const request = {
      body: {
        PostId: "645e2d90675225374f91a05d",
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

    jest
      .spyOn(Post, "findById")
      .mockReturnValue({ exec: jest.fn().mockResolvedValue(postData) });
    jest
      .spyOn(Post, "findByIdAndUpdate")
      .mockReturnValue({ exec: jest.fn().mockResolvedValue() });
    await likePost(request, res);
    expect(res.status).toHaveBeenCalledWith(200);
  });
});

describe("Like fail case", () => {
  test("Like fail case", async () => {
    const request = {
      body: {
        PostId: null,
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
      .spyOn(Post, "findById")
      .mockReturnValue({ exec: jest.fn().mockResolvedValue(postData) });
    jest
      .spyOn(Post, "findByIdAndUpdate")
      .mockReturnValue({ exec: jest.fn().mockResolvedValue() });
    await likePost(request, res);
    expect(res.status).toHaveBeenCalledWith(401);
  });
});




describe("Dislike not liked yet case", () => {
  test("Dislike not liked yet case", async () => {
    const request = {
      body: {
        PostId: "6462fe81d94d0eaf9f83ca01",
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
      cookie: jest
        .fn()
        .mockReturnValue({ send: jest.fn().mockResolvedValue() }),
    };

    jest
      .spyOn(Post, "findById")
      .mockReturnValue({ exec: jest.fn().mockResolvedValue(postData1) });
    await disLikePost(request, res);
    expect(res.status).toHaveBeenCalledWith(400);
  });
});
  

describe("Dislike fail case", () => {
  test("Dislike fail case", async () => {
    const request = {
      body: {
        PostId: null
      },
    };
    const res = {
      status: jest.fn().mockReturnValue({
        send: jest.fn().mockResolvedValue(),
        json: jest.fn().mockResolvedValue(),
      }),
      cookie: jest
        .fn()
        .mockReturnValue({ send: jest.fn().mockResolvedValue() }),
    };

    jest
      .spyOn(Post, "findById")
      .mockReturnValue({ exec: jest.fn().mockResolvedValue(postData1) });
    await disLikePost(request, res);
    expect(res.status).toHaveBeenCalledWith(401);
  });
});
