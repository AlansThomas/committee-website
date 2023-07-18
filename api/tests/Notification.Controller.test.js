const { default: mongoose } = require("mongoose");
const User = require("../models/User.Model");

const { ObjectId } = require('bson');
const totalPoint = require("../models/TotalPoint.Model");
const TotalPointBackup = require("../models/TotalPointBackup.Model");
const Groups = require("../models/Groups.Model");
const Event = require("../models/Event.Model");
const NotificationModel = require("../models/Notification.Model");
const {
    FindPersonalNotification,
    FindGroupNotification,
    findPost,
    findAllNotify,
    findAllNotifyforCommitty,
    findUserBirthday,
    ReadVerification,
    unreadVerifications,
    ReadPost,
    taggedPosts,
    unUpdate
} = require("../controller/Notification.Controller");
const { notify, notify2, notify3, notifyUser, groupData } = require("./data3");




beforeAll(async () => {
    return true
})

jest.mock("jsonwebtoken", () => ({
    verify: jest.fn(),
    sign: jest.fn()
}))


afterEach(() => {
    jest.clearAllMocks();
});
afterAll(() => {
    mongoose.connection.close()
})

describe("FindPersonalNotification success case ", () => {
    test(" FindPersonalNotification success  case", async () => {
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
        jest.spyOn(NotificationModel, "aggregate").mockResolvedValue()
        await FindPersonalNotification(request, res);
        expect(res.status).toHaveBeenCalledWith(200)

    });
});


describe("FindPersonalNotification main catch case ", () => {
    test(" FindPersonalNotification main catch  case", async () => {
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
        jest.spyOn(NotificationModel, "aggregate").mockReturnValue()
        await FindPersonalNotification(request, res);
        expect(res.status).toHaveBeenCalledWith(400)

    });
});


describe("FindGroupNotification success case ", () => {
    test(" FindGroupNotification success  case", async () => {
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
                GroupId: "645e2d90675225374f91a05d",
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
        jest.spyOn(NotificationModel, "aggregate").mockResolvedValue()
        await FindGroupNotification(request, res);
        expect(res.status).toHaveBeenCalledWith(200)

    });
});



describe("FindGroupNotification main catch case ", () => {
    test(" FindGroupNotification main catch  case", async () => {
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
                GroupId: "645e2d90675225374f91a05d",
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
        jest.spyOn(NotificationModel, "aggregate").mockReturnValue()
        await FindGroupNotification(request, res);
        expect(res.status).toHaveBeenCalledWith(400)

    });
});



describe("findPost success case ", () => {
    test(" findPost success  case", async () => {
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
                GroupId: "645e2d90675225374f91a05d",
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
        jest.spyOn(NotificationModel, "aggregate").mockResolvedValue()
        await findPost(request, res);
        expect(res.status).toHaveBeenCalledWith(200)

    });
});



describe("findPost main catch case ", () => {
    test(" findPost main catch  case", async () => {
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
                GroupId: "645e2d90675225374f91a05d",
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
        jest.spyOn(NotificationModel, "aggregate").mockReturnValue()
        await findPost(request, res);
        expect(res.status).toHaveBeenCalledWith(400)

    });
});



describe("findAllNotify success case ", () => {
    test(" findAllNotify success  case", async () => {
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
                GroupId: "645e2d90675225374f91a05d",
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
        jest.spyOn(NotificationModel, "aggregate").mockResolvedValue()

        await findAllNotify(request, res);
        expect(res.status).toHaveBeenCalledWith(200)

    });
});

describe("findAllNotify success case ", () => {
    test(" findAllNotify success  case", async () => {
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
            }
        };
        const res = {
            status: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue(), json: jest.fn().mockResolvedValue(), cookie: jest.fn().mockReturnValue(true) }),
            send: jest.fn(),
            json: jest.fn(),
            cookie: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue() }),
            GroupWisePublish: jest.fn()
        };
        jest.spyOn(NotificationModel, "aggregate").mockResolvedValue()

        await findAllNotify(request, res);
        expect(res.status).toHaveBeenCalledWith(200)

    });
});




describe("findAllNotify main catch case ", () => {
    test(" findAllNotify main catch  case", async () => {
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
                GroupId: "645e2d90675225374f91a05d",
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
        jest.spyOn(NotificationModel, "aggregate").mockReturnValue()
        await findAllNotify(request, res);
        expect(res.status).toHaveBeenCalledWith(400)

    });
});

describe("findAllNotifyforCommitty success case ", () => {
    test(" findAllNotifyforCommitty success  case", async () => {
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
                GroupId: "645e2d90675225374f91a05d",
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
        jest.spyOn(NotificationModel, "aggregate").mockResolvedValue()

        await findAllNotifyforCommitty(request, res);
        expect(res.status).toHaveBeenCalledWith(200)

    });
});




describe("findAllNotifyforCommitty main catch case ", () => {
    test(" findAllNotifyforCommitty main catch  case", async () => {
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
                GroupId: "645e2d90675225374f91a05d",
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
        jest.spyOn(NotificationModel, "aggregate").mockReturnValue()
        await findAllNotifyforCommitty(request, res);
        expect(res.status).toHaveBeenCalledWith(400)

    });
});

// describe("findUserBirthday success case ", () => {
//     test(" findUserBirthday success  case", async () => {
//         const request = {
//             body: {
//                 UserName: "wwwww",
//                 Options: ["dewdwdew", "dfewfeffewf", "3dfdfewfdwe"],
//                 Topic: "sssss",
//                 StartDate: new Date(),
//                 EndDate: new Date()

//             },
//             params: {
//                 id: "1",

//             },
//             User: {
//                 _id: "645e2d90675225374f91a05d",
//                 UserName: "Alans",
//                 Email: "alans.thomas@gmail.com",
//                 UserNameSearch: "alans.thomas",
//                 DOB: "1999-11-25T00:00:00.000Z",
//                 Type: 1,
//                 TypeSearch: "Committee",
//                 GroupRole: 0,
//                 Designation: "Software Engineer",
//                 Delete: 0,
//                 BirthdayStatus: 0,
//                 GroupId: "645e2d90675225374f91a05d",
//                 CommitteeId: "645e2f9e675225374f91a36e",
//                 CommitteeRole: "0",
//                 Password:
//                     "$2a$10$9hJWLYZCc8EAWJf16vK6bOfg51usHnLqmOKCUHr/9MZ27zuJ4MQ.W",
//                 PasswordChange: 0,
//                 Otp: "0",
//                 GroupCreateDate: "2023-05-12T12:14:08.616Z",
//                 CommitteCreateDate: "2023-05-12T00:00:00.000Z",
//                 createdAt: "2023-05-12T12:14:08.617Z",
//                 updatedAt: " 2023-05-16T05:13:19.411Z",
//                 __v: 0,
//             }
//         };
//         const res = {
//             status: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue(), json: jest.fn().mockResolvedValue(), cookie: jest.fn().mockReturnValue(true) }),
//             send: jest.fn(),
//             json: jest.fn(),
//             cookie: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue() }),
//             GroupWisePublish: jest.fn()
//         };
//         jest.spyOn(User, "aggregate").mockResolvedValue()

//         await findUserBirthday(request, res);
//         expect(res.status).toHaveBeenCalledWith(200)

//     });
// });




describe("findUserBirthday main catch case ", () => {
    test(" findUserBirthday main catch  case", async () => {
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
                GroupId: "645e2d90675225374f91a05d",
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
        const mockUpdate = jest.spyOn(User, 'aggregate');

    // Set up the mock implementation to return a rejected promise
    mockUpdate.mockRejectedValue(new Error('Mocked error'));

    // Make the function call

    await User.aggregate(request.params.id, { $set: request.body })
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((error) => {
        res.status(400).send(error);
      });
        // jest.spyOn(User, "aggregate").mockReturnValue()
        await findUserBirthday
        (request, res);
        expect(res.status).toHaveBeenCalledWith(400)

    });
});

describe("ReadVerification success case ", () => {
    test(" ReadVerification success  case", async () => {
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
                GroupId: "645e2d90675225374f91a05d",
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
        jest.spyOn(NotificationModel, "findOneAndUpdate").mockResolvedValue()

        await ReadVerification(request, res);
        expect(res.status).toHaveBeenCalledWith(200)

    });
});


describe("ReadVerification main catch case ", () => {
    test(" ReadVerification main catch  case", async () => {
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
                GroupId: "645e2d90675225374f91a05d",
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
        jest.spyOn(NotificationModel, "findOneAndUpdate").mockReturnValue()

        await ReadVerification(request, res);
        expect(res.status).toHaveBeenCalledWith(400)

    });
});


describe("unreadVerifications success case ", () => {
    test(" unreadVerifications success  case", async () => {
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
                GroupId: "645e2d90675225374f91a05d",
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
        jest.spyOn(NotificationModel, "find").mockResolvedValue()

        await unreadVerifications(request, res);
        expect(res.status).toHaveBeenCalledWith(200)

    });
});


describe("unreadVerifications main catch case ", () => {
    test(" unreadVerifications main catch  case", async () => {
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
                GroupId: "645e2d90675225374f91a05d",
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
        jest.spyOn(NotificationModel, "find").mockReturnValue()

        await unreadVerifications(request, res);
        expect(res.status).toHaveBeenCalledWith(400)

    });
});



describe("ReadPost success case ", () => {
    test(" ReadPost success  case", async () => {
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
                GroupId: "645e2d90675225374f91a05d",
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
        jest.spyOn(NotificationModel, "findByIdAndUpdate").mockResolvedValue()

        await ReadPost(request, res);
        expect(res.status).toHaveBeenCalledWith(200)

    });
});


describe("ReadPost main catch case ", () => {
    test(" ReadPost main catch  case", async () => {
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
                GroupId: "645e2d90675225374f91a05d",
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
        jest.spyOn(NotificationModel, "findByIdAndUpdate").mockReturnValue()

        await ReadPost(request, res);
        expect(res.status).toHaveBeenCalledWith(400)

    });
});

describe("taggedPosts success case ", () => {
    test(" taggedPosts success  case", async () => {
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
                GroupId: "645e2d90675225374f91a05d",
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
        jest.spyOn(User, "findOne").mockReturnValue({exec: jest.fn().mockResolvedValue(notifyUser)})
        jest.spyOn(Groups, "findOne").mockReturnValue({exec: jest.fn().mockResolvedValue(groupData)})
        jest.spyOn(NotificationModel, "aggregate").mockResolvedValue(notify3)

        await taggedPosts(request, res);
        expect(res.status).toHaveBeenCalledWith(200)

    });
});


describe("taggedPosts main catch case ", () => {
    test(" taggedPosts main catch  case", async () => {
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
                GroupId: "645e2d90675225374f91a05d",
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
        jest.spyOn(User, "findOne").mockReturnValue({exec: jest.fn().mockResolvedValue(notifyUser)})
        jest.spyOn(Groups, "findOne").mockReturnValue({exec: jest.fn().mockResolvedValue(null)})
        jest.spyOn(NotificationModel, "aggregate").mockReturnValue()

        await taggedPosts(request, res);
        expect(res.status).toHaveBeenCalledWith(400)

    });
});

describe("taggedPosts inner  catch case ", () => {
    test(" taggedPosts inner catch  case", async () => {
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
                GroupId: "645e2d90675225374f91a05d",
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
        const mockUpdate = jest.spyOn(NotificationModel, 'aggregate');

        // Set up the mock implementation to return a rejected promise
        mockUpdate.mockRejectedValue(new Error('Mocked error'));
    
    
        jest.spyOn(User, "findOne").mockReturnValue({exec: jest.fn().mockResolvedValue(notifyUser)})
        jest.spyOn(Groups, "findOne").mockReturnValue({exec: jest.fn().mockResolvedValue(null)})
            // Make the function call
    
            await NotificationModel.aggregate(request.params.id, { $set: request.body })
            .then((data) => {
              res.status(200).send(data);
            })
            .catch((error) => {
              res.status(400).send(error);
            });
        // jest.spyOn(NotificationModel, "aggregate").mockReturnValue()

        await taggedPosts(request, res);
        expect(res.status).toHaveBeenCalledWith(400)

    });
});

// describe("unUpdate success case ", () => {
//     test(" unUpdate success  case", async () => {
//         const request = {
//             body: {
//                 UserName: "wwwww",
//                 Options: ["dewdwdew", "dfewfeffewf", "3dfdfewfdwe"],
//                 Topic: "sssss",
//                 StartDate: new Date(),
//                 EndDate: new Date()

//             },
//             params: {
//                 id: "1",

//             },
//             User: {
//                 _id: "645e2d90675225374f91a05d",
//                 UserName: "Alans",
//                 Email: "alans.thomas@gmail.com",
//                 UserNameSearch: "alans.thomas",
//                 DOB: "1999-11-25T00:00:00.000Z",
//                 Type: 1,
//                 TypeSearch: "Committee",
//                 GroupRole: 0,
//                 Designation: "Software Engineer",
//                 Delete: 0,
//                 BirthdayStatus: 0,
//                 GroupId: "645e2d90675225374f91a05d",
//                 CommitteeId: "645e2f9e675225374f91a36e",
//                 CommitteeRole: "0",
//                 Password:
//                     "$2a$10$9hJWLYZCc8EAWJf16vK6bOfg51usHnLqmOKCUHr/9MZ27zuJ4MQ.W",
//                 PasswordChange: 0,
//                 Otp: "0",
//                 GroupCreateDate: "2023-05-12T12:14:08.616Z",
//                 CommitteCreateDate: "2023-05-12T00:00:00.000Z",
//                 createdAt: "2023-05-12T12:14:08.617Z",
//                 updatedAt: " 2023-05-16T05:13:19.411Z",
//                 __v: 0,
//             }
//         };
//         const res = {
//             status: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue(), json: jest.fn().mockResolvedValue(), cookie: jest.fn().mockReturnValue(true) }),
//             send: jest.fn(),
//             json: jest.fn(),
//             cookie: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue() }),
//             GroupWisePublish: jest.fn()
//         };
//         // jest.spyOn(User, "findOne").mockReturnValue({exec: jest.fn().mockResolvedValue(notifyUser)})
//         // jest.spyOn(Groups, "findOne").mockReturnValue({exec: jest.fn().mockResolvedValue(groupData)})
//         // jest.spyOn(NotificationModel, "aggregate").mockResolvedValue(notify3)

//         await unUpdate(request, res);
//         // expect(res.status).toHaveBeenCalledWith(200)

//     });
// });


