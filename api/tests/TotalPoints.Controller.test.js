const {
    GetTotalPointPublishToInovature,
    findByGIdAndEvntId,
    findByGIdAndEvntIdAndSumEventWise1,
    findByGIdAndEvntIdAndSumEventWise2,
    findByGIdAndEvntIdAndSumGroupWise1,
    findByGIdAndEvntIdAndSumGroupWiseforpublish,
    findByGIdAndEvntIdAndSumEventWise1Winners,
    getpublishtoCommitty,
    notverifiedPoint,
    PublishToInnovature,
    reportedPoints,
    findByGIdAndEvntIdAndSumGrouptWise2,
    findByGIdAndEvntIdAndSumEventWise1Winner,
    deletePointsByAdminBeforePublishing,
    eventWisePerformanceOfOwnGroup

} = require("../controller/TotalPoint.Controller")
const { default: mongoose } = require("mongoose");
const User = require("../models/User.Model");

const { ObjectId } = require('bson');
const totalPoint = require("../models/TotalPoint.Model");
const TotalPointBackup = require("../models/TotalPointBackup.Model");
const Groups = require("../models/Groups.Model");
const Event = require("../models/Event.Model");
const { totalPointArray } = require("./data1");
const { groupData, eventData, groupData2, sum, sum2, pointDelete, pointDelete2, pointDelete3, eventGroupUser, eventArray, promiseArray } = require("./data3");



beforeEach(async () => {
    return true
})


afterEach(() => {
    jest.clearAllMocks();
});
afterAll(() => {
    mongoose.connection.close()
})

describe("findByGIdAndEvntId success case ", () => {
    test(" findByGIdAndEvntId success  case", async () => {
        const request = {
            body: {
                UserName: "wwwww",
                Options: ["dewdwdew", "dfewfeffewf", "3dfdfewfdwe"],
                Topic: "sssss",
                StartDate: new Date(),
                EndDate: new Date()

            },
            params: {
                id: "1",

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
            }
        };
        const res = {
            status: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue(), json: jest.fn().mockResolvedValue(), cookie: jest.fn().mockReturnValue(true) }),
            send: jest.fn(),
            json: jest.fn(),
            cookie: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue() }),
            GroupWisePublish: jest.fn()
        };
        jest.spyOn(totalPoint, "aggregate").mockResolvedValue(totalPointArray)
        await findByGIdAndEvntId(request, res);
        expect(res.status).toHaveBeenCalledWith(200)

    });
});

describe("findByGIdAndEvntId main case ", () => {
    test(" findByGIdAndEvntId main  case", async () => {
        const request = {
            body: {
                UserName: "wwwww",
                Options: ["dewdwdew", "dfewfeffewf", "3dfdfewfdwe"],
                Topic: "sssss",
                StartDate: new Date(),
                EndDate: new Date()

            },
            params: {
                id: "1",

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
            }
        };
        const res = {
            status: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue(), json: jest.fn().mockResolvedValue(), cookie: jest.fn().mockReturnValue(true) }),
            send: jest.fn(),
            json: jest.fn(),
            cookie: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue() }),
            GroupWisePublish: jest.fn()
        };
        jest.spyOn(totalPoint, "aggregate").mockReturnValue()
        await findByGIdAndEvntId(request, res);
        expect(res.status).toHaveBeenCalledWith(400)

    });
});


describe("findByGIdAndEvntId main catch case ", () => {
    test(" findByGIdAndEvntId main  case", async () => {
        const request = {
            body: {
                UserName: "wwwww",
                Options: ["dewdwdew", "dfewfeffewf", "3dfdfewfdwe"],
                Topic: "sssss",
                StartDate: new Date(),
                EndDate: new Date()

            },
            params: {
                id: "1",

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
            }
        };
        const res = {
            status: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue(), json: jest.fn().mockResolvedValue(), cookie: jest.fn().mockReturnValue(true) }),
            send: jest.fn(),
            json: jest.fn(),
            cookie: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue() }),
            GroupWisePublish: jest.fn()
        };
        jest.spyOn(totalPoint, "aggregate").mockReturnValue()
        await findByGIdAndEvntId(request, res);
        expect(res.status).toHaveBeenCalledWith(400)

    });
});

describe("findByGIdAndEvntId inner catch case ", () => {
    test(" findByGIdAndEvntId inner catch  case", async () => {
        const request = {
            body: {
                UserName: "wwwww",
                Options: ["dewdwdew", "dfewfeffewf", "3dfdfewfdwe"],
                Topic: "sssss",
                StartDate: new Date(),
                EndDate: new Date()

            },
            params: {
                id: "1",

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
            }
        };
        const res = {
            status: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue(), json: jest.fn().mockResolvedValue(), cookie: jest.fn().mockReturnValue(true) }),
            send: jest.fn(),
            json: jest.fn(),
            cookie: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue() }),
            GroupWisePublish: jest.fn()
        };
        const mockUpdate = jest.spyOn(totalPoint, 'aggregate');

        // Set up the mock implementation to return a rejected promise
        mockUpdate.mockRejectedValue(new Error('Mocked error'));

        // Make the function call

        await totalPoint.aggregate(request.params.id, { $set: request.body })
            .then((data) => {
                res.status(200).send(data);
            })
            .catch((error) => {
                res.status(400).send(error);
            });
        await findByGIdAndEvntId(request, res);
        expect(res.status).toHaveBeenCalledWith(400)

    });
});
describe("findByGIdAndEvntIdAndSumEventWise1 success case ", () => {
    test(" findByGIdAndEvntIdAndSumEventWise1 success  case", async () => {
        const request = {
            body: {
                UserName: "wwwww",
                Options: ["dewdwdew", "dfewfeffewf", "3dfdfewfdwe"],
                Topic: "sssss",
                StartDate: new Date(),
                EndDate: new Date()

            },
            params: {
                id: "1",

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
            }
        };
        const res = {
            status: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue(), json: jest.fn().mockResolvedValue(), cookie: jest.fn().mockReturnValue(true) }),
            send: jest.fn(),
            json: jest.fn(),
            cookie: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue() }),
            GroupWisePublish: jest.fn()
        };
        jest.spyOn(totalPoint, "aggregate").mockResolvedValue(totalPointArray)
        await findByGIdAndEvntIdAndSumEventWise1(request, res);
        expect(res.status).toHaveBeenCalledWith(200)

    });
});

describe("findByGIdAndEvntIdAndSumEventWise1 main catch case ", () => {
    test(" findByGIdAndEvntIdAndSumEventWise1 main catch  case", async () => {
        const request = {
            body: {
                UserName: "wwwww",
                Options: ["dewdwdew", "dfewfeffewf", "3dfdfewfdwe"],
                Topic: "sssss",
                StartDate: new Date(),
                EndDate: new Date()

            },
            params: {
                id: "1",

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
            }
        };
        const res = {
            status: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue(), json: jest.fn().mockResolvedValue(), cookie: jest.fn().mockReturnValue(true) }),
            send: jest.fn(),
            json: jest.fn(),
            cookie: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue() }),
            GroupWisePublish: jest.fn()
        };
        jest.spyOn(totalPoint, "aggregate").mockReturnValue()
        await findByGIdAndEvntIdAndSumEventWise1(request, res);
        expect(res.status).toHaveBeenCalledWith(400)

    });
});

describe("findByGIdAndEvntIdAndSumEventWise1 inner catch case ", () => {
    test(" findByGIdAndEvntIdAndSumEventWise1 inner catch  case", async () => {
        const request = {
            body: {
                UserName: "wwwww",
                Options: ["dewdwdew", "dfewfeffewf", "3dfdfewfdwe"],
                Topic: "sssss",
                StartDate: new Date(),
                EndDate: new Date()

            },
            params: {
                id: "1",

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
            }
        };
        const res = {
            status: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue(), json: jest.fn().mockResolvedValue(), cookie: jest.fn().mockReturnValue(true) }),
            send: jest.fn(),
            json: jest.fn(),
            cookie: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue() }),
            GroupWisePublish: jest.fn()
        };
        const mockUpdate = jest.spyOn(totalPoint, 'aggregate');

        // Set up the mock implementation to return a rejected promise
        mockUpdate.mockRejectedValue(new Error('Mocked error'));

        // Make the function call

        await totalPoint.aggregate(request.params.id, { $set: request.body })
            .then((data) => {
                res.status(200).send(data);
            })
            .catch((error) => {
                res.status(400).send(error);
            });
        await findByGIdAndEvntIdAndSumEventWise1(request, res);
        expect(res.status).toHaveBeenCalledWith(400)

    });
});

describe("findByGIdAndEvntIdAndSumEventWise2 success case ", () => {
    test(" findByGIdAndEvntIdAndSumEventWise2 success  case", async () => {
        const request = {
            body: 
                [
                    {
                        "_id": {
                            "EventId": "645e30c6675225374f91a53f",
                            "GroupId": "645e307b675225374f91a4d4"
                        },
                        "count": 89,
                        "grouplist": [
                            {
                                "_id": "645e307b675225374f91a4d4",
                                "GroupName": "theepori",
                                "GroupImage": "http://localhost:4005/images/Fri May 12 2023 17:56:35 GMT+0530 (India Standard Time)512763.jpg",
                                "GroupType": 0,
                                "Delete": 0,
                                "createdAt": "2023-05-12T12:26:35.446Z",
                                "updatedAt": "2023-05-12T12:26:35.446Z",
                                "__v": 0
                            }
                        ],
                        "eventlist": [
                            {
                                "_id": "645e30c6675225374f91a53f",
                                "EventName": "test one",
                                "EventDescription": "test one",
                                "UserId": "645e2d90675225374f91a05d",
                                "StartDate": "2023-05-12T00:00:00.000Z",
                                "EndDate": "2023-05-13T00:00:00.000Z",
                                "Status": 0,
                                "Delete": 0,
                                "File": "http://localhost:4005/images/Fri May 12 2023 17:57:50 GMT+0530 (India Standard Time)images.jpeg",
                                "createdAt": "2023-05-12T12:27:50.514Z",
                                "updatedAt": "2023-05-23T12:51:09.265Z",
                                "__v": 0
                            }
                        ]
                    },
                    {
                        "_id": {
                            "EventId": "645e30c6675225374f91a53f",
                            "GroupId": "645e309b675225374f91a508"
                        },
                        "count": 10,
                        "grouplist": [
                            {
                                "_id": "645e309b675225374f91a508",
                                "GroupName": "El deraod",
                                "GroupImage": "http://localhost:4005/images/Fri May 12 2023 17:57:07 GMT+0530 (India Standard Time)cartoon-boy-images-2.jpg",
                                "GroupType": 0,
                                "Delete": 0,
                                "createdAt": "2023-05-12T12:27:07.562Z",
                                "updatedAt": "2023-05-12T12:27:07.562Z",
                                "__v": 0
                            }
                        ],
                        "eventlist": [
                            {
                                "_id": "645e30c6675225374f91a53f",
                                "EventName": "test one",
                                "EventDescription": "test one",
                                "UserId": "645e2d90675225374f91a05d",
                                "StartDate": "2023-05-12T00:00:00.000Z",
                                "EndDate": "2023-05-13T00:00:00.000Z",
                                "Status": 0,
                                "Delete": 0,
                                "File": "http://localhost:4005/images/Fri May 12 2023 17:57:50 GMT+0530 (India Standard Time)images.jpeg",
                                "createdAt": "2023-05-12T12:27:50.514Z",
                                "updatedAt": "2023-05-23T12:51:09.265Z",
                                "__v": 0
                            }
                        ]
                    },
                    {
                        "_id": {
                            "EventId": "645e30c6675225374f91a53f",
                            "GroupId": "645e3089675225374f91a4ea"
                        },
                        "count": 0,
                        "grouplist": [
                            {
                                "_id": "645e3089675225374f91a4ea",
                                "GroupName": "Akasuki",
                                "GroupImage": "http://localhost:4005/images/Fri May 12 2023 17:56:49 GMT+0530 (India Standard Time)2464406.jpg",
                                "GroupType": 0,
                                "Delete": 0,
                                "createdAt": "2023-05-12T12:26:49.724Z",
                                "updatedAt": "2023-05-12T12:26:49.724Z",
                                "__v": 0
                            }
                        ],
                        "eventlist": [
                            {
                                "_id": "645e30c6675225374f91a53f",
                                "EventName": "test one",
                                "EventDescription": "test one",
                                "UserId": "645e2d90675225374f91a05d",
                                "StartDate": "2023-05-12T00:00:00.000Z",
                                "EndDate": "2023-05-13T00:00:00.000Z",
                                "Status": 0,
                                "Delete": 0,
                                "File": "http://localhost:4005/images/Fri May 12 2023 17:57:50 GMT+0530 (India Standard Time)images.jpeg",
                                "createdAt": "2023-05-12T12:27:50.514Z",
                                "updatedAt": "2023-05-23T12:51:09.265Z",
                                "__v": 0
                            }
                        ]
                    },
                    {
                        "_id": {
                            "EventId": "645e30c6675225374f91a53f",
                            "GroupId": "645e306e675225374f91a4c1"
                        },
                        "count": 0,
                        "grouplist": [
                            {
                                "_id": "645e306e675225374f91a4c1",
                                "GroupName": "Sky",
                                "GroupImage": "http://localhost:4005/images/Fri May 12 2023 17:56:22 GMT+0530 (India Standard Time)Cool Pictures 43453.jpg",
                                "GroupType": 0,
                                "Delete": 0,
                                "createdAt": "2023-05-12T12:26:22.368Z",
                                "updatedAt": "2023-05-12T12:26:22.368Z",
                                "__v": 0
                            }
                        ],
                        "eventlist": [
                            {
                                "_id": "645e30c6675225374f91a53f",
                                "EventName": "test one",
                                "EventDescription": "test one",
                                "UserId": "645e2d90675225374f91a05d",
                                "StartDate": "2023-05-12T00:00:00.000Z",
                                "EndDate": "2023-05-13T00:00:00.000Z",
                                "Status": 0,
                                "Delete": 0,
                                "File": "http://localhost:4005/images/Fri May 12 2023 17:57:50 GMT+0530 (India Standard Time)images.jpeg",
                                "createdAt": "2023-05-12T12:27:50.514Z",
                                "updatedAt": "2023-05-23T12:51:09.265Z",
                                "__v": 0
                            }
                        ]
                    },
                    {
                        "_id": {
                            "EventId": "645e30c6675225374f91a53f",
                            "GroupId": "645e30a9675225374f91a51c"
                        },
                        "count": 0,
                        "grouplist": [
                            {
                                "_id": "645e30a9675225374f91a51c",
                                "GroupName": "group8",
                                "GroupImage": "http://localhost:4005/images/Fri May 12 2023 17:57:21 GMT+0530 (India Standard Time)images.jpeg",
                                "GroupType": 0,
                                "Delete": 0,
                                "createdAt": "2023-05-12T12:27:21.725Z",
                                "updatedAt": "2023-05-12T12:27:21.725Z",
                                "__v": 0
                            }
                        ],
                        "eventlist": [
                            {
                                "_id": "645e30c6675225374f91a53f",
                                "EventName": "test one",
                                "EventDescription": "test one",
                                "UserId": "645e2d90675225374f91a05d",
                                "StartDate": "2023-05-12T00:00:00.000Z",
                                "EndDate": "2023-05-13T00:00:00.000Z",
                                "Status": 0,
                                "Delete": 0,
                                "File": "http://localhost:4005/images/Fri May 12 2023 17:57:50 GMT+0530 (India Standard Time)images.jpeg",
                                "createdAt": "2023-05-12T12:27:50.514Z",
                                "updatedAt": "2023-05-23T12:51:09.265Z",
                                "__v": 0
                            }
                        ]
                    }
                ],

            
            params: {
                id: "1",

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
            }
        };
        const res = {
            status: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue(), json: jest.fn().mockResolvedValue(), cookie: jest.fn().mockReturnValue(true) }),
            send: jest.fn(),
            json: jest.fn(),
            cookie: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue() }),
            GroupWisePublish: jest.fn()
        };
        jest.spyOn(Groups, "findById").mockResolvedValue(groupData)
        jest.spyOn(Event, "findById").mockResolvedValue(eventData)
        await findByGIdAndEvntIdAndSumEventWise2(request, res);
        expect(res.status).toHaveBeenCalledWith(200)

    });
});


describe("findByGIdAndEvntIdAndSumEventWise2 main catch case ", () => {
    test(" findByGIdAndEvntIdAndSumEventWise2 main catch  case", async () => {
        const request = {
            body: {
                UserName: "wwwww",
                Options: ["dewdwdew", "dfewfeffewf", "3dfdfewfdwe"],
                Topic: "sssss",
                EventId: "2",
                GroupId: "1"

            },
            params: {
                id: "1",

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
            }
        };
        const res = {
            status: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue(), json: jest.fn().mockResolvedValue(), cookie: jest.fn().mockReturnValue(true) }),
            send: jest.fn(),
            json: jest.fn(),
            cookie: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue() }),
            GroupWisePublish: jest.fn()
        };
        jest.spyOn(Groups, "findById").mockReturnValue([])
        await findByGIdAndEvntIdAndSumEventWise2(request, res);
        expect(res.status).toHaveBeenCalledWith(400)

    });
});

describe("findByGIdAndEvntIdAndSumGroupWise1 success  case ", () => {
    test(" findByGIdAndEvntIdAndSumGroupWise1 success  case", async () => {
        const request = {
            body: {
                UserName: "wwwww",
                Options: ["dewdwdew", "dfewfeffewf", "3dfdfewfdwe"],
                Topic: "sssss",
                EventId: "2",
                GroupId: "1"

            },
            params: {
                id: "1",

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
            }
        };
        const res = {
            status: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue(), json: jest.fn().mockResolvedValue(), cookie: jest.fn().mockReturnValue(true) }),
            send: jest.fn(),
            json: jest.fn(),
            cookie: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue() }),
            GroupWisePublish: jest.fn()
        };
        jest.spyOn(totalPoint, "aggregate").mockResolvedValue()
        await findByGIdAndEvntIdAndSumGroupWise1(request, res);
        expect(res.status).toHaveBeenCalledWith(200)

    });
});

describe("findByGIdAndEvntIdAndSumGroupWise1 main catch  case ", () => {
    test(" findByGIdAndEvntIdAndSumGroupWise1 main catch  case", async () => {
        const request = {
            body: {
                UserName: "wwwww",
                Options: ["dewdwdew", "dfewfeffewf", "3dfdfewfdwe"],
                Topic: "sssss",
                EventId: "2",
                GroupId: "1"

            },
            params: {
                id: "1",

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
            }
        };
        const res = {
            status: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue(), json: jest.fn().mockResolvedValue(), cookie: jest.fn().mockReturnValue(true) }),
            send: jest.fn(),
            json: jest.fn(),
            cookie: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue() }),
            GroupWisePublish: jest.fn()
        };
        jest.spyOn(totalPoint, "aggregate").mockReturnValue()
        await findByGIdAndEvntIdAndSumGroupWise1(request, res);
        expect(res.status).toHaveBeenCalledWith(400)

    });
});
describe("findByGIdAndEvntIdAndSumGroupWiseforpublish success  case ", () => {
    test(" findByGIdAndEvntIdAndSumGroupWiseforpublish success  case", async () => {
        const request = {
            body: {
                UserName: "wwwww",
                Options: ["dewdwdew", "dfewfeffewf", "3dfdfewfdwe"],
                Topic: "sssss",
                EventId: "2",
                GroupId: "1"

            },
            params: {
                id: "1",

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
            }
        };
        const res = {
            status: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue(), json: jest.fn().mockResolvedValue(), cookie: jest.fn().mockReturnValue(true) }),
            send: jest.fn(),
            json: jest.fn(),
            cookie: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue() }),
            GroupWisePublish: jest.fn()
        };
        jest.spyOn(totalPoint, "aggregate").mockResolvedValue()
        await findByGIdAndEvntIdAndSumGroupWiseforpublish(request, res);
        expect(res.status).toHaveBeenCalledWith(200)

    });
});

describe("findByGIdAndEvntIdAndSumGroupWiseforpublish main catch  case ", () => {
    test(" findByGIdAndEvntIdAndSumGroupWiseforpublish main catch  case", async () => {
        const request = {
            body: {
                UserName: "wwwww",
                Options: ["dewdwdew", "dfewfeffewf", "3dfdfewfdwe"],
                Topic: "sssss",
                EventId: "2",
                GroupId: "1"

            },
            params: {
                id: "1",

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
            }
        };
        const res = {
            status: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue(), json: jest.fn().mockResolvedValue(), cookie: jest.fn().mockReturnValue(true) }),
            send: jest.fn(),
            json: jest.fn(),
            cookie: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue() }),
            GroupWisePublish: jest.fn()
        };
        jest.spyOn(totalPoint, "aggregate").mockReturnValue()
        await findByGIdAndEvntIdAndSumGroupWiseforpublish(request, res);
        expect(res.status).toHaveBeenCalledWith(400)

    });
});

describe("findByGIdAndEvntIdAndSumEventWise1Winners success  case ", () => {
    test(" findByGIdAndEvntIdAndSumEventWise1Winners success  case", async () => {
        const request = {
            body: {
                UserName: "wwwww",
                Options: ["dewdwdew", "dfewfeffewf", "3dfdfewfdwe"],
                Topic: "sssss",
                EventId: "2",
                GroupId: "1"

            },
            params: {
                id: new ObjectId("645e2d90675225374f91a05d"),

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
            }
        };
        const res = {
            status: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue(), json: jest.fn().mockResolvedValue(), cookie: jest.fn().mockReturnValue(true) }),
            send: jest.fn(),
            json: jest.fn(),
            cookie: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue() }),
            GroupWisePublish: jest.fn()
        };
        jest.spyOn(totalPoint, "aggregate").mockResolvedValue()
        await findByGIdAndEvntIdAndSumEventWise1Winners(request, res);
        expect(res.status).toHaveBeenCalledWith(200)

    });
});

describe("findByGIdAndEvntIdAndSumEventWise1Winners main catch  case ", () => {
    test(" findByGIdAndEvntIdAndSumEventWise1Winners main catch  case", async () => {
        const request = {
            body: {
                UserName: "wwwww",
                Options: ["dewdwdew", "dfewfeffewf", "3dfdfewfdwe"],
                Topic: "sssss",
                EventId: "2",
                GroupId: "1"

            },
            params: {
                id: new ObjectId("645e2d90675225374f91a05d"),

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
            }
        };
        const res = {
            status: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue(), json: jest.fn().mockResolvedValue(), cookie: jest.fn().mockReturnValue(true) }),
            send: jest.fn(),
            json: jest.fn(),
            cookie: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue() }),
            GroupWisePublish: jest.fn()
        };
        jest.spyOn(totalPoint, "aggregate").mockReturnValue()
        await findByGIdAndEvntIdAndSumEventWise1Winners(request, res);
        expect(res.status).toHaveBeenCalledWith(400)

    });
});
describe("getpublishtoCommitty success  case ", () => {
    test(" getpublishtoCommitty success  case", async () => {
        const request = {
            body: {
                UserName: "wwwww",
                Options: ["dewdwdew", "dfewfeffewf", "3dfdfewfdwe"],
                Topic: "sssss",
                EventId: "2",
                GroupId: "1"

            },
            params: {
                id: new ObjectId("645e2d90675225374f91a05d"),

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
            }
        };
        const res = {
            status: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue(), json: jest.fn().mockResolvedValue(), cookie: jest.fn().mockReturnValue(true) }),
            send: jest.fn(),
            json: jest.fn(),
            cookie: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue() }),
            GroupWisePublish: jest.fn()
        };
        jest.spyOn(totalPoint, "aggregate").mockResolvedValue()
        await getpublishtoCommitty(request, res);
        expect(res.status).toHaveBeenCalledWith(200)

    });
});

describe("getpublishtoCommitty inner catch  case ", () => {
    test(" getpublishtoCommitty inner catch  case", async () => {
        const request = {
            body: {
                UserName: "wwwww",
                Options: ["dewdwdew", "dfewfeffewf", "3dfdfewfdwe"],
                Topic: "sssss",
                EventId: "2",
                GroupId: "1"

            },
            params: {
                id: new ObjectId("645e2d90675225374f91a05d"),

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
            }
        };
        const res = {
            status: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue(), json: jest.fn().mockResolvedValue(), cookie: jest.fn().mockReturnValue(true) }),
            send: jest.fn(),
            json: jest.fn(),
            cookie: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue() }),
            GroupWisePublish: jest.fn()
        };
        const mockUpdate = jest.spyOn(totalPoint, 'aggregate');

    // Set up the mock implementation to return a rejected promise
    mockUpdate.mockRejectedValue(new Error('Mocked error'));

    // Make the function call

    await totalPoint.aggregate(request.params.id, { $set: request.body })
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((error) => {
        res.status(401).send(error);
      });
        jest.spyOn(totalPoint, "aggregate").mockResolvedValue()
        await getpublishtoCommitty(request, res);
        expect(res.status).toHaveBeenCalledWith(401)

    });
});


describe("getpublishtoCommitty main catch  case ", () => {
    test(" getpublishtoCommitty main catch  case", async () => {
        const request = {
            body: {
                UserName: "wwwww",
                Options: ["dewdwdew", "dfewfeffewf", "3dfdfewfdwe"],
                Topic: "sssss",
                EventId: "2",
                GroupId: "1"

            },
            params: {
                id: new ObjectId("645e2d90675225374f91a05d"),

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
            }
        };
        const res = {
            status: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue(), json: jest.fn().mockResolvedValue(), cookie: jest.fn().mockReturnValue(true) }),
            send: jest.fn(),
            json: jest.fn(),
            cookie: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue() }),
            GroupWisePublish: jest.fn()
        };
        jest.spyOn(totalPoint, "aggregate").mockReturnValue()
        await getpublishtoCommitty(request, res);
        expect(res.status).toHaveBeenCalledWith(400)

    });
});

describe("notverifiedPoint success  case ", () => {
    test(" notverifiedPoint success  case", async () => {
        const request = {
            body: {
                UserName: "wwwww",
                Options: ["dewdwdew", "dfewfeffewf", "3dfdfewfdwe"],
                Topic: "sssss",
                EventId: "2",
                GroupId: "1"

            },
            params: {
                id: new ObjectId("645e2d90675225374f91a05d"),

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
            }
        };
        const res = {
            status: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue(), json: jest.fn().mockResolvedValue(), cookie: jest.fn().mockReturnValue(true) }),
            send: jest.fn(),
            json: jest.fn(),
            cookie: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue() }),
            GroupWisePublish: jest.fn()
        };
        jest.spyOn(totalPoint, "findByIdAndUpdate").mockResolvedValue()
        await notverifiedPoint(request, res);
        expect(res.status).toHaveBeenCalledWith(200)

    });
});


describe("notverifiedPoint main catch  case ", () => {
    test(" notverifiedPoint main catch  case", async () => {
        const request = {
            body: {
                UserName: "wwwww",
                Options: ["dewdwdew", "dfewfeffewf", "3dfdfewfdwe"],
                Topic: "sssss",
                EventId: "2",
                GroupId: "1"

            },
            params: {
                id: new ObjectId("645e2d90675225374f91a05d"),

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
            }
        };
        const res = {
            status: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue(), json: jest.fn().mockResolvedValue(), cookie: jest.fn().mockReturnValue(true) }),
            send: jest.fn(),
            json: jest.fn(),
            cookie: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue() }),
            GroupWisePublish: jest.fn()
        };
        jest.spyOn(totalPoint, "findByIdAndUpdate").mockReturnValue()
        await notverifiedPoint(request, res);
        expect(res.status).toHaveBeenCalledWith(401)

    });
});



describe("notverifiedPoint inner catch  case ", () => {
    test(" notverifiedPoint inner catch  case", async () => {
        const request = {
            body: {
                UserName: "wwwww",
                Options: ["dewdwdew", "dfewfeffewf", "3dfdfewfdwe"],
                Topic: "sssss",
                EventId: "2",
                GroupId: "1"

            },
            params: {
                id: new ObjectId("645e2d90675225374f91a05d"),

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
            }
        };
        const res = {
            status: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue(), json: jest.fn().mockResolvedValue(), cookie: jest.fn().mockReturnValue(true) }),
            send: jest.fn(),
            json: jest.fn(),
            cookie: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue() }),
            GroupWisePublish: jest.fn()
        };
        const mockUpdate = jest.spyOn(totalPoint, 'findByIdAndUpdate');

    // Set up the mock implementation to return a rejected promise
    mockUpdate.mockRejectedValue(new Error('Mocked error'));

    // Make the function call

    await totalPoint.findByIdAndUpdate(request.params.id, { $set: request.body })
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((error) => {
        res.status(400).send(error);
      });
        // jest.spyOn(totalPoint, "aggregate").mockResolvedValue()
        await notverifiedPoint(request, res);
        expect(res.status).toHaveBeenCalledWith(400)

    });
});



describe("PublishToInnovature success  case ", () => {
    test(" PublishToInnovature success  case", async () => {
        const request = {
            body: {
                UserName: "wwwww",
                Options: ["dewdwdew", "dfewfeffewf", "3dfdfewfdwe"],
                Topic: "sssss",
                EventId: "2",
                GroupId: "1"

            },
            params: {
                id: new ObjectId("645e2d90675225374f91a05d"),

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
            }
        };
        const res = {
            status: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue(), json: jest.fn().mockResolvedValue(), cookie: jest.fn().mockReturnValue(true) }),
            send: jest.fn(),
            json: jest.fn(),
            cookie: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue() }),
            GroupWisePublish: jest.fn()
        };
        jest.spyOn(totalPoint, "findByIdAndUpdate").mockResolvedValue()
        await PublishToInnovature(request, res);
        expect(res.status).toHaveBeenCalledWith(200)

    });
});

describe("PublishToInnovature inner catch  case ", () => {
    test(" PublishToInnovature inner catch  case", async () => {
        const request = {
            body: {
                UserName: "wwwww",
                Options: ["dewdwdew", "dfewfeffewf", "3dfdfewfdwe"],
                Topic: "sssss",
                EventId: "2",
                GroupId: "1"

            },
            params: {
                id: new ObjectId("645e2d90675225374f91a05d"),

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
            }
        };
        const res = {
            status: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue(), json: jest.fn().mockResolvedValue(), cookie: jest.fn().mockReturnValue(true) }),
            send: jest.fn(),
            json: jest.fn(),
            cookie: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue() }),
            GroupWisePublish: jest.fn()
        };
        const mockUpdate = jest.spyOn(totalPoint, 'findByIdAndUpdate');

    // Set up the mock implementation to return a rejected promise
    mockUpdate.mockRejectedValue(new Error('Mocked error'));

    // Make the function call

    await totalPoint.findByIdAndUpdate(request.params.id, { $set: request.body })
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((error) => {
        res.status(401).send(error);
      });
        // jest.spyOn(totalPoint, "aggregate").mockResolvedValue()
        await PublishToInnovature(request, res);
        expect(res.status).toHaveBeenCalledWith(401)

    });
});


describe("PublishToInnovature main catch  case ", () => {
    test(" PublishToInnovature main catch   case", async () => {
        const request = {
            body: {
                UserName: "wwwww",
                Options: ["dewdwdew", "dfewfeffewf", "3dfdfewfdwe"],
                Topic: "sssss",
                EventId: "2",
                GroupId: "1"

            },
            params: {
                id: new ObjectId("645e2d90675225374f91a05d"),

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
            }
        };
        const res = {
            status: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue(), json: jest.fn().mockResolvedValue(), cookie: jest.fn().mockReturnValue(true) }),
            send: jest.fn(),
            json: jest.fn(),
            cookie: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue() }),
            GroupWisePublish: jest.fn()
        };
        jest.spyOn(totalPoint, "findByIdAndUpdate").mockReturnValue()
        await PublishToInnovature(request, res);
        expect(res.status).toHaveBeenCalledWith(401)

    });
});

describe("reportedPoints success  case ", () => {
    test(" reportedPoints success  case", async () => {
        const request = {
            body: {
                UserName: "wwwww",
                Options: ["dewdwdew", "dfewfeffewf", "3dfdfewfdwe"],
                Topic: "sssss",
                EventId: "2",
                GroupId: "1"

            },
            params: {
                id: new ObjectId("645e2d90675225374f91a05d"),

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
            }
        };
        const res = {
            status: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue(), json: jest.fn().mockResolvedValue(), cookie: jest.fn().mockReturnValue(true) }),
            send: jest.fn(),
            json: jest.fn(),
            cookie: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue() }),
            GroupWisePublish: jest.fn()
        };
        jest.spyOn(totalPoint, "aggregate").mockResolvedValue()
        await reportedPoints(request, res);
        expect(res.status).toHaveBeenCalledWith(200)

    });
});


describe("reportedPoints inner catch  case ", () => {
    test(" reportedPoints inner catch  case", async () => {
        const request = {
            body: {
                UserName: "wwwww",
                Options: ["dewdwdew", "dfewfeffewf", "3dfdfewfdwe"],
                Topic: "sssss",
                EventId: "2",
                GroupId: "1"

            },
            params: {
                id: new ObjectId("645e2d90675225374f91a05d"),

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
            }
        };
        const res = {
            status: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue(), json: jest.fn().mockResolvedValue(), cookie: jest.fn().mockReturnValue(true) }),
            send: jest.fn(),
            json: jest.fn(),
            cookie: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue() }),
            GroupWisePublish: jest.fn()
        };
        const mockUpdate = jest.spyOn(totalPoint, 'aggregate');

    // Set up the mock implementation to return a rejected promise
    mockUpdate.mockRejectedValue(new Error('Mocked error'));

    // Make the function call

    await totalPoint.aggregate(request.params.id, { $set: request.body })
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((error) => {
        res.status(400).send(error);
      });
        // jest.spyOn(totalPoint, "aggregate").mockResolvedValue()
        await reportedPoints(request, res);
        expect(res.status).toHaveBeenCalledWith(400)

    });
});


describe("reportedPoints main catch  case ", () => {
    test(" reportedPoints  main catch  case", async () => {
        const request = {
            body: {
                UserName: "wwwww",
                Options: ["dewdwdew", "dfewfeffewf", "3dfdfewfdwe"],
                Topic: "sssss",
                EventId: "2",
                GroupId: "1"

            },
            params: {
                id: new ObjectId("645e2d90675225374f91a05d"),

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
            }
        };
        const res = {
            status: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue(), json: jest.fn().mockResolvedValue(), cookie: jest.fn().mockReturnValue(true) }),
            send: jest.fn(),
            json: jest.fn(),
            cookie: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue() }),
            GroupWisePublish: jest.fn()
        };
        jest.spyOn(totalPoint, "aggregate").mockReturnValue()
        await reportedPoints(request, res);
        expect(res.status).toHaveBeenCalledWith(400)

    });
});

describe("findByGIdAndEvntIdAndSumGrouptWise2 success  case ", () => {
    test(" findByGIdAndEvntIdAndSumGrouptWise2 success  case", async () => {
        const request = {
            body:
            [
                {
                    "_id": {
                        "GroupId": "645e307b675225374f91a4d4"
                    },
                    "count": 89,
                    "first_city": "645e30eb675225374f91a577",
                    "grouplist": [
                        {
                            "_id": "645e307b675225374f91a4d4",
                            "GroupName": "theepori",
                            "GroupImage": "http://localhost:4005/images/Fri May 12 2023 17:56:35 GMT+0530 (India Standard Time)512763.jpg",
                            "GroupType": 0,
                            "Delete": 0,
                            "createdAt": "2023-05-12T12:26:35.446Z",
                            "updatedAt": "2023-05-12T12:26:35.446Z",
                            "__v": 0
                        }
                    ]
                },
                {
                    "_id": {
                        "GroupId": "645e309b675225374f91a508"
                    },
                    "count": 10,
                    "first_city": "645e30eb675225374f91a579",
                    "grouplist": [
                        {
                            "_id": "645e309b675225374f91a508",
                            "GroupName": "El deraod",
                            "GroupImage": "http://localhost:4005/images/Fri May 12 2023 17:57:07 GMT+0530 (India Standard Time)cartoon-boy-images-2.jpg",
                            "GroupType": 0,
                            "Delete": 0,
                            "createdAt": "2023-05-12T12:27:07.562Z",
                            "updatedAt": "2023-05-12T12:27:07.562Z",
                            "__v": 0
                        }
                    ]
                }
            ],
            params: {
                id: new ObjectId("645e2d90675225374f91a05d"),

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
            }
        };
        const res = {
            status: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue(), json: jest.fn().mockResolvedValue(), cookie: jest.fn().mockReturnValue(true) }),
            send: jest.fn(),
            json: jest.fn(),
            cookie: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue() }),
            GroupWisePublish: jest.fn()
        };
        jest.spyOn(Groups, "findById").mockResolvedValue(groupData2)
        await findByGIdAndEvntIdAndSumGrouptWise2(request, res);
        expect(res.status).toHaveBeenCalledWith(200)

    });
});



describe("findByGIdAndEvntIdAndSumGrouptWise2 main catch  case ", () => {
    test(" findByGIdAndEvntIdAndSumGrouptWise2  main catch  case", async () => {
        const request = {
            body:
            [
                {
                    "_id": {
                        "GroupId": "645e307b675225374f91a4d4"
                    },
                    "count": 89,
                    "first_city": "645e30eb675225374f91a577",
                    "grouplist": [
                        {
                            "_id": "645e307b675225374f91a4d4",
                            "GroupName": "theepori",
                            "GroupImage": "http://localhost:4005/images/Fri May 12 2023 17:56:35 GMT+0530 (India Standard Time)512763.jpg",
                            "GroupType": 0,
                            "Delete": 0,
                            "createdAt": "2023-05-12T12:26:35.446Z",
                            "updatedAt": "2023-05-12T12:26:35.446Z",
                            "__v": 0
                        }
                    ]
                },
                {
                    "_id": {
                        "GroupId": "645e309b675225374f91a508"
                    },
                    "count": 10,
                    "first_city": "645e30eb675225374f91a579",
                    "grouplist": [
                        {
                            "_id": "645e309b675225374f91a508",
                            "GroupName": "El deraod",
                            "GroupImage": "http://localhost:4005/images/Fri May 12 2023 17:57:07 GMT+0530 (India Standard Time)cartoon-boy-images-2.jpg",
                            "GroupType": 0,
                            "Delete": 0,
                            "createdAt": "2023-05-12T12:27:07.562Z",
                            "updatedAt": "2023-05-12T12:27:07.562Z",
                            "__v": 0
                        }
                    ]
                }
            ],
            params: {
                id: new ObjectId("645e2d90675225374f91a05d"),

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
            }
        };
        const res = {
            status: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue(), json: jest.fn().mockResolvedValue(), cookie: jest.fn().mockReturnValue(true) }),
            send: jest.fn(),
            json: jest.fn(),
            cookie: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue() }),
            GroupWisePublish: jest.fn()
        };
        jest.spyOn(Groups, "findById").mockReturnValue()
        await findByGIdAndEvntIdAndSumGrouptWise2(request, res);
        expect(res.status).toHaveBeenCalledWith(400)

    });
});

describe("findByGIdAndEvntIdAndSumEventWise1Winner success  case ", () => {
    test(" findByGIdAndEvntIdAndSumEventWise1Winner success  case", async () => {
        const request = {
            body:
            [
                {
                    "_id": {
                        "GroupId": "645e307b675225374f91a4d4"
                    },
                    "count": 89,
                    "first_city": "645e30eb675225374f91a577",
                    "grouplist": [
                        {
                            "_id": "645e307b675225374f91a4d4",
                            "GroupName": "theepori",
                            "GroupImage": "http://localhost:4005/images/Fri May 12 2023 17:56:35 GMT+0530 (India Standard Time)512763.jpg",
                            "GroupType": 0,
                            "Delete": 0,
                            "createdAt": "2023-05-12T12:26:35.446Z",
                            "updatedAt": "2023-05-12T12:26:35.446Z",
                            "__v": 0
                        }
                    ]
                },
                {
                    "_id": {
                        "GroupId": "645e309b675225374f91a508"
                    },
                    "count": 10,
                    "first_city": "645e30eb675225374f91a579",
                    "grouplist": [
                        {
                            "_id": "645e309b675225374f91a508",
                            "GroupName": "El deraod",
                            "GroupImage": "http://localhost:4005/images/Fri May 12 2023 17:57:07 GMT+0530 (India Standard Time)cartoon-boy-images-2.jpg",
                            "GroupType": 0,
                            "Delete": 0,
                            "createdAt": "2023-05-12T12:27:07.562Z",
                            "updatedAt": "2023-05-12T12:27:07.562Z",
                            "__v": 0
                        }
                    ]
                }
            ],
            params: {
                id: new ObjectId("645e2d90675225374f91a05d"),

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
            }
        };
        const res = {
            status: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue(), json: jest.fn().mockResolvedValue(), cookie: jest.fn().mockReturnValue(true) }),
            send: jest.fn(),
            json: jest.fn(),
            cookie: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue() }),
            GroupWisePublish: jest.fn()
        };
        jest.spyOn(Event, "find").mockReturnValue({ exec: jest.fn().mockResolvedValue(sum)})
        jest.spyOn(totalPoint, "aggregate").mockResolvedValue(sum2)

        await findByGIdAndEvntIdAndSumEventWise1Winner(request, res);
        expect(res.status).toHaveBeenCalledWith(200)

    });
});

describe("findByGIdAndEvntIdAndSumEventWise1Winner main catch  case ", () => {
    test(" findByGIdAndEvntIdAndSumEventWise1Winner main catch  case", async () => {
        const request = {
            body:
            [
                {
                    "_id": {
                        "GroupId": "645e307b675225374f91a4d4"
                    },
                    "count": 89,
                    "first_city": "645e30eb675225374f91a577",
                    "grouplist": [
                        {
                            "_id": "645e307b675225374f91a4d4",
                            "GroupName": "theepori",
                            "GroupImage": "http://localhost:4005/images/Fri May 12 2023 17:56:35 GMT+0530 (India Standard Time)512763.jpg",
                            "GroupType": 0,
                            "Delete": 0,
                            "createdAt": "2023-05-12T12:26:35.446Z",
                            "updatedAt": "2023-05-12T12:26:35.446Z",
                            "__v": 0
                        }
                    ]
                },
                {
                    "_id": {
                        "GroupId": "645e309b675225374f91a508"
                    },
                    "count": 10,
                    "first_city": "645e30eb675225374f91a579",
                    "grouplist": [
                        {
                            "_id": "645e309b675225374f91a508",
                            "GroupName": "El deraod",
                            "GroupImage": "http://localhost:4005/images/Fri May 12 2023 17:57:07 GMT+0530 (India Standard Time)cartoon-boy-images-2.jpg",
                            "GroupType": 0,
                            "Delete": 0,
                            "createdAt": "2023-05-12T12:27:07.562Z",
                            "updatedAt": "2023-05-12T12:27:07.562Z",
                            "__v": 0
                        }
                    ]
                }
            ],
            params: {
                id: new ObjectId("645e2d90675225374f91a05d"),

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
            }
        };
        const res = {
            status: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue(), json: jest.fn().mockResolvedValue(), cookie: jest.fn().mockReturnValue(true) }),
            send: jest.fn(),
            json: jest.fn(),
            cookie: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue() }),
            GroupWisePublish: jest.fn()
        };
        jest.spyOn(Event, "find").mockReturnValue({ exec: jest.fn().mockResolvedValue(sum)})
        jest.spyOn(totalPoint, "aggregate").mockReturnValue()

        await findByGIdAndEvntIdAndSumEventWise1Winner(request, res);
        expect(res.status).toHaveBeenCalledWith(400)

    });
});


describe("GetTotalPointPublishToInovature success  case ", () => {
    test(" GetTotalPointPublishToInovature success  case", async () => {
        const request = {
            body:
           {

           },
            params: {
                id: new ObjectId("645e2d90675225374f91a05d"),

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
            }
        };
        const res = {
            status: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue(), json: jest.fn().mockResolvedValue(), cookie: jest.fn().mockReturnValue(true) }),
            send: jest.fn(),
            json: jest.fn(),
            cookie: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue() }),
            GroupWisePublish: jest.fn()
        };
        jest.spyOn(totalPoint, "aggregate").mockResolvedValue()

        await GetTotalPointPublishToInovature(request, res);
        expect(res.status).toHaveBeenCalledWith(200)

    });
});


describe("GetTotalPointPublishToInovature main catch  case ", () => {
    test(" GetTotalPointPublishToInovature main catch  case", async () => {
        const request = {
            body:
           {

           },
            params: {
                id: new ObjectId("645e2d90675225374f91a05d"),

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
            }
        };
        const res = {
            status: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue(), json: jest.fn().mockResolvedValue(), cookie: jest.fn().mockReturnValue(true) }),
            send: jest.fn(),
            json: jest.fn(),
            cookie: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue() }),
            GroupWisePublish: jest.fn()
        };
        jest.spyOn(totalPoint, "aggregate").mockReturnValue()

        await GetTotalPointPublishToInovature(request, res);
        expect(res.status).toHaveBeenCalledWith(400)

    });
});

describe("deletePointsByAdminBeforePublishing success  case ", () => {
    test(" deletePointsByAdminBeforePublishing success  case", async () => {
        const request = {
            body:
           {

           },
            params: {
                id: new ObjectId("645e2d90675225374f91a05d"),

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
            }
        };
        const res = {
            status: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue(), json: jest.fn().mockResolvedValue(), cookie: jest.fn().mockReturnValue(true) }),
            send: jest.fn(),
            json: jest.fn(),
            cookie: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue() }),
            GroupWisePublish: jest.fn()
        };
        jest.spyOn(TotalPointBackup, "find").mockReturnValue({exec: jest.fn().mockResolvedValue(pointDelete)})
        jest.spyOn(totalPoint, "updateOne").mockResolvedValue(pointDelete2)

        await deletePointsByAdminBeforePublishing(request, res);
        expect(res.status).toHaveBeenCalledWith(200)

    });
});


describe("deletePointsByAdminBeforePublishing else   case ", () => {
    test(" deletePointsByAdminBeforePublishing else  case", async () => {
        const request = {
            body:
           {

           },
            params: {
                id: new ObjectId("645e2d90675225374f91a05d"),

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
            }
        };
        const res = {
            status: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue(), json: jest.fn().mockResolvedValue(), cookie: jest.fn().mockReturnValue(true) }),
            send: jest.fn(),
            json: jest.fn(),
            cookie: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue() }),
            GroupWisePublish: jest.fn()
        };
        jest.spyOn(TotalPointBackup, "find").mockReturnValue({exec: jest.fn().mockResolvedValue(pointDelete)})
        jest.spyOn(totalPoint, "updateOne").mockResolvedValue(pointDelete3)

        await deletePointsByAdminBeforePublishing(request, res);
        expect(res.status).toHaveBeenCalledWith(401)

    });
});

describe("deletePointsByAdminBeforePublishing main catch   case ", () => {
    test(" deletePointsByAdminBeforePublishing else  case", async () => {
        const request = {
            body:
           {

           },
            params: {
                id: new ObjectId("645e2d90675225374f91a05d"),

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
            }
        };
        const res = {
            status: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue(), json: jest.fn().mockResolvedValue(), cookie: jest.fn().mockReturnValue(true) }),
            send: jest.fn(),
            json: jest.fn(),
            cookie: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue() }),
            GroupWisePublish: jest.fn()
        };
        jest.spyOn(TotalPointBackup, "find").mockReturnValue({exec: jest.fn().mockResolvedValue(pointDelete)})
        jest.spyOn(totalPoint, "updateOne").mockReturnValue()

        await deletePointsByAdminBeforePublishing(request, res);
        expect(res.status).toHaveBeenCalledWith(400)

    });
});


describe("deletePointsByAdminBeforePublishing inner catch   case ", () => {
    test(" deletePointsByAdminBeforePublishing inner  case", async () => {
        const request = {
            body:
           {

           },
            params: {
                id: new ObjectId("645e2d90675225374f91a05d"),

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
            }
        };
        const res = {
            status: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue(), json: jest.fn().mockResolvedValue(), cookie: jest.fn().mockReturnValue(true) }),
            send: jest.fn(),
            json: jest.fn(),
            cookie: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue() }),
            GroupWisePublish: jest.fn()
        };
        const mockUpdate = jest.spyOn(totalPoint, 'updateOne');

        // Set up the mock implementation to return a rejected promise
        mockUpdate.mockRejectedValue(new Error('Mocked error'));
    
        // Make the function call
    
      
        jest.spyOn(TotalPointBackup, "find").mockReturnValue({exec: jest.fn().mockResolvedValue(pointDelete)})
        await totalPoint.updateOne(request.params.id, { $set: request.body })
        .then((data) => {
          res.status(200).send(data);
        })
        .catch((error) => {
          res.status(400).send(error);
        });
        
        await deletePointsByAdminBeforePublishing(request, res);
        expect(res.status).toHaveBeenCalledWith(400)

    });
});

describe("eventWisePerformanceOfOwnGroup success  case ", () => {
    test(" eventWisePerformanceOfOwnGroup success  case", async () => {
        const request = {
            body:
           {

           },
            params: {
                id: new ObjectId("645e2d90675225374f91a05d"),

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
            }
        };
        const res = {
            status: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue(), json: jest.fn().mockResolvedValue(), cookie: jest.fn().mockReturnValue(true) }),
            send: jest.fn(),
            json: jest.fn(),
            cookie: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue() }),
            GroupWisePublish: jest.fn()
        };
        jest.spyOn(User, "findById").mockReturnValue({exec: jest.fn().mockResolvedValue(eventGroupUser)})
        jest.spyOn(Event, "find").mockReturnValue({exec: jest.fn().mockResolvedValue(eventArray)})
        jest.spyOn(totalPoint, "aggregate").mockReturnValue({exec: jest.fn().mockResolvedValue(promiseArray)})


        await eventWisePerformanceOfOwnGroup(request, res);
        expect(res.status).toHaveBeenCalledWith(200)

    });
});

describe("eventWisePerformanceOfOwnGroup main catch  case ", () => {
    test(" eventWisePerformanceOfOwnGroup main catch  case", async () => {
        const request = {
            body:
           {

           },
            params: {
                id: new ObjectId("645e2d90675225374f91a05d"),

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
            }
        };
        const res = {
            status: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue(), json: jest.fn().mockResolvedValue(), cookie: jest.fn().mockReturnValue(true) }),
            send: jest.fn(),
            json: jest.fn(),
            cookie: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue() }),
            GroupWisePublish: jest.fn()
        };
        jest.spyOn(User, "findById").mockReturnValue()
        // jest.spyOn(Event, "find").mockReturnValue({exec: jest.fn().mockResolvedValue(eventArray)})
        // jest.spyOn(totalPoint, "aggregate").mockReturnValue()


        await eventWisePerformanceOfOwnGroup(request, res);
        expect(res.status).toHaveBeenCalledWith(400)

    });
});




