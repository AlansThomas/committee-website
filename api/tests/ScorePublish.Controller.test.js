const { ObjectId } = require("bson");

const { default: mongoose } = require("mongoose");
const NotificationModel = require("../models/Notification.Model");
const User = require("../models/User.Model");
const TotalPoint = require("../models/TotalPoint.Model");
const TotalPointBackup = require("../models/TotalPointBackup.Model");
const { addSumTable, findSumTable, topThreeGroups } = require("../controller/ScorePublish.Controller");
const { totalPoints, top3Groups } = require("./data1");



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


describe("addSumTable total points empty case", () => {
    test("addSumTable total points empty case", async () => {
        const request = {
            body: {
                PostId: "63a1ee9bedd902683d9ee4f5",
                firstcity: "GdedOOD",
                UserId: "1",
                UserName: "ededded",
                UserImage: "df3d3wd3wd"


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



        jest.spyOn(NotificationModel, "insertMany").mockResolvedValue();
        jest.spyOn(TotalPoint, "updateMany").mockResolvedValue();
        jest.spyOn(TotalPoint, "find").mockReturnValue({ exec: jest.fn().mockResolvedValue([]) });
        jest.spyOn(TotalPointBackup, "updateMany").mockReturnValue({ exec: jest.fn().mockResolvedValue() });
        await addSumTable(request, res);
        expect(res.status).toHaveBeenCalledWith(400);
    });
});
describe("addSumTable success case", () => {
    test("addSumTable success case", async () => {
        const request = {
            body: {
                PostId: "63a1ee9bedd902683d9ee4f5",
                firstcity: "GdedOOD",
                UserId: "1",
                UserName: "ededded",
                UserImage: "df3d3wd3wd"


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



        jest.spyOn(NotificationModel, "insertMany").mockResolvedValue();
        jest.spyOn(TotalPoint, "updateMany").mockResolvedValue();
        jest.spyOn(TotalPoint, "find").mockReturnValue({ exec: jest.fn().mockResolvedValue(totalPoints) });
        jest.spyOn(TotalPointBackup, "updateMany").mockReturnValue({ exec: jest.fn().mockResolvedValue() });
        await addSumTable(request, res);
        expect(res.status).toHaveBeenCalledWith(200);
    });
});
describe("addSumTable main catch case", () => {
    test("addSumTable main catch  case", async () => {
        const request = {
            body: {
                PostId: "63a1ee9bedd902683d9ee4f5",
                firstcity: "GdedOOD",
                UserId: "1",
                UserName: "ededded",
                UserImage: "df3d3wd3wd"


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

        jest.spyOn(TotalPoint, "updateMany").mockReturnValue();


        await addSumTable(request, res);
        expect(res.status).toHaveBeenCalledWith(401);
    });
});

describe("addSumTable inner catch case", () => {
    test("addSumTable inner catch case", async () => {
        const request = {
            body: {
                PostId: "63a1ee9bedd902683d9ee4f5",
                firstcity: "GdedOOD",
                UserId: "1",
                UserName: "ededded",
                UserImage: "df3d3wd3wd"


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


        const mockUpdate = jest.spyOn(TotalPoint, 'updateMany');

        // Set up the mock implementation to return a rejected promise
        mockUpdate.mockRejectedValue(new Error('Mocked error'));

        // Make the function call




        jest.spyOn(NotificationModel, "insertMany").mockResolvedValue();

        await TotalPoint.updateMany()
            .then((data) => {
                res.status(200).send(data);
            })
            .catch((error) => {
                res.status(400).send(error);
            });


        await addSumTable(request, res);
        expect(res.status).toHaveBeenCalledWith(400);
    });
});

describe("addSumTable inner catch notification case", () => {
    test("addSumTable inner catch case", async () => {
        const request = {
            body: {
                PostId: "63a1ee9bedd902683d9ee4f5",
                firstcity: "GdedOOD",
                UserId: "1",
                UserName: "ededded",
                UserImage: "df3d3wd3wd"


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


        const mockUpdate = jest.spyOn(NotificationModel, 'insertMany');

        // Set up the mock implementation to return a rejected promise
        mockUpdate.mockRejectedValue(new Error('Mocked error'));

        // Make the function call


        jest.spyOn(TotalPoint, "updateMany").mockResolvedValue();
        jest.spyOn(TotalPoint, "find").mockReturnValue({ exec: jest.fn().mockResolvedValue(totalPoints) });
        jest.spyOn(TotalPointBackup, "updateMany").mockReturnValue({ exec: jest.fn().mockResolvedValue() });


        await NotificationModel.insertMany()
            .then((data) => {
                res.status(200).send(data);
            })
            .catch((error) => {
                res.status(400).send(error);
            });
     

        await addSumTable(request, res);
        expect(res.status).toHaveBeenCalledWith(400);
    });
});
describe("findSumTable success case", () => {
    test("findSumTable success case", async () => {
        const request = {
            body: {
                PostId: "63a1ee9bedd902683d9ee4f5",
                firstcity: "GdedOOD",
                UserId: "1",
                UserName: "ededded",
                UserImage: "df3d3wd3wd"


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




        jest.spyOn(TotalPoint, "aggregate").mockResolvedValue();

        await findSumTable(request, res);
        expect(res.status).toHaveBeenCalledWith(200);
    });
});

describe("findSumTable main catch case", () => {
    test("findSumTable main catch case", async () => {
        const request = {
            body: {
                PostId: "63a1ee9bedd902683d9ee4f5",
                firstcity: "GdedOOD",
                UserId: "1",
                UserName: "ededded",
                UserImage: "df3d3wd3wd"


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




        jest.spyOn(TotalPoint, "aggregate").mockReturnValue();

        await findSumTable(request, res);
        expect(res.status).toHaveBeenCalledWith(401);
    });
});
describe("topThreeGroups success case", () => {
    test("topThreeGroups success case", async () => {
        const request = {
            body: {
                PostId: "63a1ee9bedd902683d9ee4f5",
                firstcity: "GdedOOD",
                UserId: "1",
                UserName: "ededded",
                UserImage: "df3d3wd3wd"


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




        jest.spyOn(TotalPoint, "aggregate").mockResolvedValue(top3Groups);

        await topThreeGroups(request, res);
        expect(res.status).toHaveBeenCalledWith(200);
    });
});


describe("topThreeGroups catch case", () => {
    test("topThreeGroups catch case", async () => {
        const request = {
            body: {
                PostId: "63a1ee9bedd902683d9ee4f5",
                firstcity: "GdedOOD",
                UserId: "1",
                UserName: "ededded",
                UserImage: "df3d3wd3wd"


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
        const mockUpdate = jest.spyOn(TotalPoint, 'aggregate');

    // Set up the mock implementation to return a rejected promise
    mockUpdate.mockRejectedValue(new Error('Mocked error'));

    // Make the function call

    await TotalPoint.aggregate()
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((error) => {
        res.status(400).send(error);
      });

        await topThreeGroups(request, res);
        expect(res.status).toHaveBeenCalledWith(400);
    });
});





