const { default: mongoose } = require("mongoose");
const User = require("../models/User.Model");

const { ObjectId } = require('bson');
const totalPoint = require("../models/TotalPoint.Model");
const TotalPointBackup = require("../models/TotalPointBackup.Model");
const Groups = require("../models/Groups.Model");
const Event = require("../models/Event.Model");
const NotificationModel = require("../models/Notification.Model");
const {
    uploadFiles,
    updateProfileImage,
    updatesingleuser,
    UpdateGroupOfAllUsers,
    UpdateCommitteeOfAllUsers,
    FindAllCommittee,
    FindAllGroups,
    findCommity,
    findGroupById,
    FindUsersOfAGroup,
    FindGroupName,
    FindGroupNameForInnovature,
    FindUsersOfACommittee,
    updateGroupDetails,
    groupNameAndMembers,
    FindUsersOfAGroupWithoutCommitteeMember,
    findGroupOnEventdsOnly,
    GroupDelete,
    

} = require("../controller/Group.Controller");
const { groupData, userId, groupData2 } = require("./data3");
const UserModel = require("../models/User.Model");
const { user1, user5 } = require("./data");




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


describe("uploadFiles success case ", () => {
    test(" uploadFiles success  case", async () => {
        const request = {
            body: {
                GroupName: "wwwww",
                GroupType: "sssss",

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
            },
            files: [{
                fieldname: 'image',
                originalname: 'unnamed.png',
                encoding: '7bit',
                mimetype: 'image/png',
                destination: './images',
                filename: 'Tue May 16 2023 17:17:23 GMT+0530 (India Standard Time)unnamed.png',
                path: 'images/Tue May 16 2023 17:17:23 GMT+0530 (India Standard Time)unnamed.png',
                size: 141374
            },]
        };
        const res = {
            status: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue(), json: jest.fn().mockResolvedValue(), cookie: jest.fn().mockReturnValue(true) }),
            send: jest.fn(),
            json: jest.fn(),
            cookie: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue() }),
            GroupWisePublish: jest.fn()
        };
        jest.spyOn(Groups, "findOne").mockReturnValue({ exec: jest.fn().mockResolvedValue(groupData) })
        jest.spyOn(Groups.prototype, 'save').mockResolvedValue();

        await uploadFiles(request, res);
        expect(res.status).toHaveBeenCalledWith(200)

    });
});

describe("uploadFiles groupname already exist case ", () => {
    test(" uploadFiles groupname already exist  case", async () => {
        const request = {
            body: {
                GroupName: "theepori",
                GroupType: "sssss",

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
            },
            files: [{
                fieldname: 'image',
                originalname: 'unnamed.png',
                encoding: '7bit',
                mimetype: 'image/png',
                destination: './images',
                filename: 'Tue May 16 2023 17:17:23 GMT+0530 (India Standard Time)unnamed.png',
                path: 'images/Tue May 16 2023 17:17:23 GMT+0530 (India Standard Time)unnamed.png',
                size: 141374
            },]
        };
        const res = {
            status: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue(), json: jest.fn().mockResolvedValue(), cookie: jest.fn().mockReturnValue(true) }),
            send: jest.fn(),
            json: jest.fn(),
            cookie: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue() }),
            GroupWisePublish: jest.fn()
        };
        jest.spyOn(Groups, "findOne").mockReturnValue({ exec: jest.fn().mockResolvedValue(groupData) })
        jest.spyOn(Groups.prototype, 'save').mockResolvedValue();

        await uploadFiles(request, res);
        expect(res.status).toHaveBeenCalledWith(401)

    });
});

describe("uploadFiles main catch case ", () => {
    test(" uploadFiles main catch  case", async () => {
        const request = {
            body: {
                GroupName: "ww",
                GroupType: "sssss",

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
            },
            files: [{
                fieldname: 'image',
                originalname: 'unnamed.png',
                encoding: '7bit',
                mimetype: 'image/png',
                destination: './images',
                filename: 'Tue May 16 2023 17:17:23 GMT+0530 (India Standard Time)unnamed.png',
                path: 'images/Tue May 16 2023 17:17:23 GMT+0530 (India Standard Time)unnamed.png',
                size: 141374
            },]
        };
        const res = {
            status: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue(), json: jest.fn().mockResolvedValue(), cookie: jest.fn().mockReturnValue(true) }),
            send: jest.fn(),
            json: jest.fn(),
            cookie: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue() }),
            GroupWisePublish: jest.fn()
        };
        jest.spyOn(Groups, "findOne").mockReturnValue()

        await uploadFiles(request, res);
        expect(res.status).toHaveBeenCalledWith(400)

    });
});

describe("updateProfileImage success case ", () => {
    test(" updateProfileImage success  case", async () => {
        const request = {
            body: {
                GroupName: "wwwww",
                GroupType: "sssss",

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
            },
            files: [{
                fieldname: 'image',
                originalname: 'unnamed.png',
                encoding: '7bit',
                mimetype: 'image/png',
                destination: './images',
                filename: 'Tue May 16 2023 17:17:23 GMT+0530 (India Standard Time)unnamed.png',
                path: 'images/Tue May 16 2023 17:17:23 GMT+0530 (India Standard Time)unnamed.png',
                size: 141374
            },]
        };
        const res = {
            status: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue(), json: jest.fn().mockResolvedValue(), cookie: jest.fn().mockReturnValue(true) }),
            send: jest.fn(),
            json: jest.fn(),
            cookie: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue() }),
            GroupWisePublish: jest.fn()
        };
        jest.spyOn(Groups, "updateOne").mockResolvedValue()

        await updateProfileImage(request, res);
        expect(res.status).toHaveBeenCalledWith(200)

    });
});

describe("updateProfileImage main catch case ", () => {
    test(" updateProfileImage main catch  case", async () => {
        const request = {
            body: {
                GroupName: "wwwww",
                GroupType: "sssss",

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
            },
            files: [{
                fieldname: 'image',
                originalname: 'unnamed.png',
                encoding: '7bit',
                mimetype: 'image/png',
                destination: './images',
                filename: 'Tue May 16 2023 17:17:23 GMT+0530 (India Standard Time)unnamed.png',
                path: 'images/Tue May 16 2023 17:17:23 GMT+0530 (India Standard Time)unnamed.png',
                size: 141374
            },]
        };
        const res = {
            status: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue(), json: jest.fn().mockResolvedValue(), cookie: jest.fn().mockReturnValue(true) }),
            send: jest.fn(),
            json: jest.fn(),
            cookie: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue() }),
            GroupWisePublish: jest.fn()
        };
        jest.spyOn(Groups, "updateOne").mockReturnValue()

        await updateProfileImage(request, res);
        expect(res.status).toHaveBeenCalledWith(400)

    });
});


describe("updateProfileImage inner catch case ", () => {
    test(" updateProfileImage inner catch  case", async () => {
        const request = {
            body: {
                GroupName: "wwwww",
                GroupType: "sssss",

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
            },
            files: [{
                fieldname: 'image',
                originalname: 'unnamed.png',
                encoding: '7bit',
                mimetype: 'image/png',
                destination: './images',
                filename: 'Tue May 16 2023 17:17:23 GMT+0530 (India Standard Time)unnamed.png',
                path: 'images/Tue May 16 2023 17:17:23 GMT+0530 (India Standard Time)unnamed.png',
                size: 141374
            },]
        };
        const res = {
            status: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue(), json: jest.fn().mockResolvedValue(), cookie: jest.fn().mockReturnValue(true) }),
            send: jest.fn(),
            json: jest.fn(),
            cookie: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue() }),
        };
        const mockUpdate = jest.spyOn(Groups, 'updateOne');

        // Set up the mock implementation to return a rejected promise
        mockUpdate.mockRejectedValue(new Error('Mocked error'));

        // Make the function call

        await Groups.updateOne(request.params.id, { $set: request.body })
            .then((data) => {
                res.status(200).send(data);
            })
            .catch((error) => {
                res.status(401).send(error);
            });


        // jest.spyOn(Groups, "updateOne").mockReturnValue( )

        await updateProfileImage(request, res);
        expect(res.status).toHaveBeenCalledWith(400)

    });
});

describe("updatesingleuser inner catch case ", () => {
    test(" updatesingleuser inner catch  case", async () => {
        const request = {
            body: {
                GroupName: "wwwww",
                GroupType: "sssss",

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
            },
            files: [{
                fieldname: 'image',
                originalname: 'unnamed.png',
                encoding: '7bit',
                mimetype: 'image/png',
                destination: './images',
                filename: 'Tue May 16 2023 17:17:23 GMT+0530 (India Standard Time)unnamed.png',
                path: 'images/Tue May 16 2023 17:17:23 GMT+0530 (India Standard Time)unnamed.png',
                size: 141374
            },]
        };
        const res = {
            status: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue(), json: jest.fn().mockResolvedValue(), cookie: jest.fn().mockReturnValue(true) }),
            send: jest.fn(),
            json: jest.fn(),
            cookie: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue() }),
        };
        const mockUpdate = jest.spyOn(User, 'findByIdAndUpdate');

        // Set up the mock implementation to return a rejected promise
        mockUpdate.mockRejectedValue(new Error('Mocked error'));

        // Make the function call

        await User.findByIdAndUpdate(request.params.id, { $set: request.body })
            .then((data) => {
                res.status(200).send(data);
            })
            .catch((error) => {
                res.status(400).send(error);
            });


        // jest.spyOn(Groups, "updateOne").mockReturnValue( )

        await updatesingleuser(request, res);
        expect(res.status).toHaveBeenCalledWith(400)

    });
});

describe("updatesingleuser success  case ", () => {
    test(" updatesingleuser success  case", async () => {
        const request = {
            body: {
                GroupName: "wwwww",
                GroupType: "sssss",

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
            },
            files: [{
                fieldname: 'image',
                originalname: 'unnamed.png',
                encoding: '7bit',
                mimetype: 'image/png',
                destination: './images',
                filename: 'Tue May 16 2023 17:17:23 GMT+0530 (India Standard Time)unnamed.png',
                path: 'images/Tue May 16 2023 17:17:23 GMT+0530 (India Standard Time)unnamed.png',
                size: 141374
            },]
        };
        const res = {
            status: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue(), json: jest.fn().mockResolvedValue(), cookie: jest.fn().mockReturnValue(true) }),
            send: jest.fn(),
            json: jest.fn(),
            cookie: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue() }),
        };


        jest.spyOn(User, "findByIdAndUpdate").mockResolvedValue()


        await updatesingleuser(request, res);
        expect(res.status).toHaveBeenCalledWith(200)

    });
});


describe("UpdateGroupOfAllUsers success  case ", () => {
    test(" UpdateGroupOfAllUsers success  case", async () => {
        const request = {
            body: [{
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

            }],
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
            },
            files: [{
                fieldname: 'image',
                originalname: 'unnamed.png',
                encoding: '7bit',
                mimetype: 'image/png',
                destination: './images',
                filename: 'Tue May 16 2023 17:17:23 GMT+0530 (India Standard Time)unnamed.png',
                path: 'images/Tue May 16 2023 17:17:23 GMT+0530 (India Standard Time)unnamed.png',
                size: 141374
            },]
        };
        const res = {
            status: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue(), json: jest.fn().mockResolvedValue(), cookie: jest.fn().mockReturnValue(true) }),
            send: jest.fn(),
            json: jest.fn(),
            cookie: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue() }),
        };


        jest.spyOn(User, "findOneAndUpdate").mockReturnValue({ exec: jest.fn().mockResolvedValue(userId) })


        await UpdateGroupOfAllUsers(request, res);
        expect(res.status).toHaveBeenCalledWith(200)

    });
});

describe("UpdateGroupOfAllUsers main catch  case ", () => {
    test(" UpdateGroupOfAllUsers main catch  case", async () => {
        const request = {
            body: [{
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

            }],
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
            },
            files: [{
                fieldname: 'image',
                originalname: 'unnamed.png',
                encoding: '7bit',
                mimetype: 'image/png',
                destination: './images',
                filename: 'Tue May 16 2023 17:17:23 GMT+0530 (India Standard Time)unnamed.png',
                path: 'images/Tue May 16 2023 17:17:23 GMT+0530 (India Standard Time)unnamed.png',
                size: 141374
            },]
        };
        const res = {
            status: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue(), json: jest.fn().mockResolvedValue(), cookie: jest.fn().mockReturnValue(true) }),
            send: jest.fn(),
            json: jest.fn(),
            cookie: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue() }),
        };


        jest.spyOn(User, "findOneAndUpdate").mockReturnValue()


        await UpdateGroupOfAllUsers(request, res);
        expect(res.status).toHaveBeenCalledWith(401)

    });
});


describe("UpdateCommitteeOfAllUsers success  case ", () => {
    test(" UpdateCommitteeOfAllUsers success  case", async () => {
        const request = {
            body: [{
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

            }],
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
            },
            files: [{
                fieldname: 'image',
                originalname: 'unnamed.png',
                encoding: '7bit',
                mimetype: 'image/png',
                destination: './images',
                filename: 'Tue May 16 2023 17:17:23 GMT+0530 (India Standard Time)unnamed.png',
                path: 'images/Tue May 16 2023 17:17:23 GMT+0530 (India Standard Time)unnamed.png',
                size: 141374
            },]
        };
        const res = {
            status: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue(), json: jest.fn().mockResolvedValue(), cookie: jest.fn().mockReturnValue(true) }),
            send: jest.fn(),
            json: jest.fn(),
            cookie: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue() }),
        };


        jest.spyOn(User, "findOneAndUpdate").mockReturnValue({ exec: jest.fn().mockResolvedValue(userId) })


        await UpdateCommitteeOfAllUsers(request, res);
        expect(res.status).toHaveBeenCalledWith(200)

    });
});


describe("UpdateCommitteeOfAllUsers main catch  case ", () => {
    test(" UpdateCommitteeOfAllUsers main catch  case", async () => {
        const request = {
            body: [{
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

            }],
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
            },
            files: [{
                fieldname: 'image',
                originalname: 'unnamed.png',
                encoding: '7bit',
                mimetype: 'image/png',
                destination: './images',
                filename: 'Tue May 16 2023 17:17:23 GMT+0530 (India Standard Time)unnamed.png',
                path: 'images/Tue May 16 2023 17:17:23 GMT+0530 (India Standard Time)unnamed.png',
                size: 141374
            },]
        };
        const res = {
            status: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue(), json: jest.fn().mockResolvedValue(), cookie: jest.fn().mockReturnValue(true) }),
            send: jest.fn(),
            json: jest.fn(),
            cookie: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue() }),
        };


        jest.spyOn(User, "findOneAndUpdate").mockReturnValue()


        await UpdateCommitteeOfAllUsers(request, res);
        expect(res.status).toHaveBeenCalledWith(401)

    });
});

describe("FindAllCommittee success  case ", () => {
    test(" FindAllCommittee success  case", async () => {
        const request = {
            body: [{
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

            }],
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
            },
        };
        const res = {
            status: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue(), json: jest.fn().mockResolvedValue(), cookie: jest.fn().mockReturnValue(true) }),
            send: jest.fn(),
            json: jest.fn(),
            cookie: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue() }),
        };


        jest.spyOn(Groups, "find").mockResolvedValue()


        await FindAllCommittee(request, res);
        expect(res.status).toHaveBeenCalledWith(200)

    });
});

describe("FindAllCommittee catch  case ", () => {
    test(" FindAllCommittee catch  case", async () => {
        const request = {
            body: [{
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

            }],
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
            },
        };
        const res = {
            status: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue(), json: jest.fn().mockResolvedValue(), cookie: jest.fn().mockReturnValue(true) }),
            send: jest.fn(),
            json: jest.fn(),
            cookie: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue() }),
        };

        const mockUpdate = jest.spyOn(Groups, 'find');

        // Set up the mock implementation to return a rejected promise
        mockUpdate.mockRejectedValue(new Error('Mocked error'));

        // Make the function call

        await Groups.find(request.params.id, { $set: request.body })
            .then((data) => {
                res.status(200).send(data);
            })
            .catch((error) => {
                res.status(403).send(error);
            });

        // jest.spyOn(Groups, "find").mockResolvedValue()


        await FindAllCommittee(request, res);
        expect(res.status).toHaveBeenCalledWith(403)

    });
});

describe("FindAllGroups success  case ", () => {
    test(" FindAllGroups success  case", async () => {
        const request = {
            body: [{
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

            }],
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
            },
        };
        const res = {
            status: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue(), json: jest.fn().mockResolvedValue(), cookie: jest.fn().mockReturnValue(true) }),
            send: jest.fn(),
            json: jest.fn(),
            cookie: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue() }),
        };


        jest.spyOn(Groups, "find").mockReturnValue({ sort: jest.fn().mockResolvedValue() })


        await FindAllGroups(request, res);
        expect(res.status).toHaveBeenCalledWith(200)

    });
});

describe("findCommity success  case ", () => {
    test(" findCommity success  case", async () => {
        const request = {
            body: [{
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

            }],
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
            },
        };
        const res = {
            status: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue(), json: jest.fn().mockResolvedValue(), cookie: jest.fn().mockReturnValue(true) }),
            send: jest.fn(),
            json: jest.fn(),
            cookie: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue() }),
        };


        jest.spyOn(User, "find").mockResolvedValue()


        await findCommity(request, res);
        expect(res.status).toHaveBeenCalledWith(200)

    });
});

describe("findCommity catch  case ", () => {
    test(" findCommity catch  case", async () => {
        const request = {
            body: [{
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

            }],
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
            },
        };
        const res = {
            status: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue(), json: jest.fn().mockResolvedValue(), cookie: jest.fn().mockReturnValue(true) }),
            send: jest.fn(),
            json: jest.fn(),
            cookie: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue() }),
        };

        const mockUpdate = jest.spyOn(User, 'find');

        // Set up the mock implementation to return a rejected promise
        mockUpdate.mockRejectedValue(new Error('Mocked error'));

        // Make the function call

        await User.find(request.params.id, { $set: request.body })
            .then((data) => {
                res.status(200).send(data);
            })
            .catch((error) => {
                res.status(403).send(error);
            });

        // jest.spyOn(Groups, "find").mockResolvedValue()


        await findCommity(request, res);
        expect(res.status).toHaveBeenCalledWith(403)

    });
});

describe("findGroupById success  case ", () => {
    test(" findGroupById success  case", async () => {
        const request = {
            body: [{
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

            }],
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
            },
        };
        const res = {
            status: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue(), json: jest.fn().mockResolvedValue(), cookie: jest.fn().mockReturnValue(true) }),
            send: jest.fn(),
            json: jest.fn(),
            cookie: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue() }),
        };


        jest.spyOn(Groups, "findById").mockResolvedValue()


        await findGroupById(request, res);
        expect(res.status).toHaveBeenCalledWith(200)

    });
});

describe("findGroupById main catch  case ", () => {
    test(" findGroupById main catch   case", async () => {
        const request = {
            body: [{
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

            }],
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
            },
        };
        const res = {
            status: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue(), json: jest.fn().mockResolvedValue(), cookie: jest.fn().mockReturnValue(true) }),
            send: jest.fn(),
            json: jest.fn(),
            cookie: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue() }),
        };


        jest.spyOn(Groups, "findById").mockReturnValue()


        await findGroupById(request, res);
        expect(res.status).toHaveBeenCalledWith(401)

    });
});
describe("findGroupById catch  case ", () => {
    test(" findGroupById catch  case", async () => {
        const request = {
            body: [{
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

            }],
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
            },
        };
        const res = {
            status: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue(), json: jest.fn().mockResolvedValue(), cookie: jest.fn().mockReturnValue(true) }),
            send: jest.fn(),
            json: jest.fn(),
            cookie: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue() }),
        };

        const mockUpdate = jest.spyOn(Groups, 'findById');

        // Set up the mock implementation to return a rejected promise
        mockUpdate.mockRejectedValue(new Error('Mocked error'));

        // Make the function call

        await Groups.findById(request.params.id, { $set: request.body })
            .then((data) => {
                res.status(200).send(data);
            })
            .catch((error) => {
                res.status(403).send(error);
            });

        // jest.spyOn(Groups, "find").mockResolvedValue()


        await findGroupById(request, res);
        expect(res.status).toHaveBeenCalledWith(403)

    });
});

describe("FindUsersOfAGroup success  case ", () => {
    test(" FindUsersOfAGroup success  case", async () => {
        const request = {
            body: [{
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

            }],
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
            },
        };
        const res = {
            status: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue(), json: jest.fn().mockResolvedValue(), cookie: jest.fn().mockReturnValue(true) }),
            send: jest.fn(),
            json: jest.fn(),
            cookie: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue() }),
        };


        jest.spyOn(User, "find").mockReturnValue({ sort: jest.fn().mockResolvedValue() })


        await FindUsersOfAGroup(request, res);
        expect(res.status).toHaveBeenCalledWith(200)

    });
});

describe("FindGroupName user exist  case ", () => {
    test(" FindGroupName user exist  case", async () => {
        const request = {
            body: [{
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

            }],
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
            },
        };
        const res = {
            status: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue(), json: jest.fn().mockResolvedValue(), cookie: jest.fn().mockReturnValue(true) }),
            send: jest.fn(),
            json: jest.fn(),
            cookie: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue() }),
        };


        jest.spyOn(User, "find").mockResolvedValue()


        await FindGroupName(request, res);
        expect(res.status).toHaveBeenCalledWith(403)

    });
});

describe("FindGroupName catch  case ", () => {
    test(" FindGroupName catch  case", async () => {
        const request = {
            body: [{
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

            }],
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
            },
        };
        const res = {
            status: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue(), json: jest.fn().mockResolvedValue(), cookie: jest.fn().mockReturnValue(true) }),
            send: jest.fn(),
            json: jest.fn(),
            cookie: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue() }),
        };

        const mockUpdate = jest.spyOn(User, 'find');

        // Set up the mock implementation to return a rejected promise
        mockUpdate.mockRejectedValue(new Error('Mocked error'));

        // Make the function call

        await User.find(request.params.id, { $set: request.body })
            .then((data) => {
                res.status(403).send(data);
            })
            .catch((error) => {
                res.status(401).send(error);
            });

        // jest.spyOn(Groups, "find").mockResolvedValue()


        await FindGroupName(request, res);
        expect(res.status).toHaveBeenCalledWith(401)

    });
});

describe("FindGroupNameForInnovature success case ", () => {
    test(" FindGroupNameForInnovature success  case", async () => {
        const request = {
            body: [{
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

            }],
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
            },
        };
        const res = {
            status: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue(), json: jest.fn().mockResolvedValue(), cookie: jest.fn().mockReturnValue(true) }),
            send: jest.fn(),
            json: jest.fn(),
            cookie: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue() }),
        };


        jest.spyOn(User, "find").mockResolvedValue(user1)


        await FindGroupNameForInnovature(request, res);
        expect(res.status).toHaveBeenCalledWith(200)

    });
});

describe("FindGroupNameForInnovature else case ", () => {
    test(" FindGroupNameForInnovature else  case", async () => {
        const request = {
            body: [{
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

            }],
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
            },
        };
        const res = {
            status: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue(), json: jest.fn().mockResolvedValue(), cookie: jest.fn().mockReturnValue(true) }),
            send: jest.fn(),
            json: jest.fn(),
            cookie: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue() }),
        };


        jest.spyOn(User, "find").mockResolvedValue()


        await FindGroupNameForInnovature(request, res);
        expect(res.status).toHaveBeenCalledWith(403)

    });
});

describe("FindGroupNameForInnovature catch  case ", () => {
    test(" FindGroupNameForInnovature catch  case", async () => {
        const request = {
            body: [{
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

            }],
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
            },
        };
        const res = {
            status: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue(), json: jest.fn().mockResolvedValue(), cookie: jest.fn().mockReturnValue(true) }),
            send: jest.fn(),
            json: jest.fn(),
            cookie: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue() }),
        };

        const mockUpdate = jest.spyOn(User, 'find');

        // Set up the mock implementation to return a rejected promise
        mockUpdate.mockRejectedValue(new Error('Mocked error'));

        // Make the function call

        await User.find(request.params.id, { $set: request.body })
            .then((data) => {
                res.status(403).send(data);
            })
            .catch((error) => {
                res.status(401).send(error);
            });

        // jest.spyOn(Groups, "find").mockResolvedValue()


        await FindGroupNameForInnovature(request, res);
        expect(res.status).toHaveBeenCalledWith(401)

    });
});

describe("FindUsersOfACommittee success case ", () => {
    test(" FindUsersOfACommittee success  case", async () => {
        const request = {
            body: [{
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

            }],
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
            },
        };
        const res = {
            status: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue(), json: jest.fn().mockResolvedValue(), cookie: jest.fn().mockReturnValue(true) }),
            send: jest.fn(),
            json: jest.fn(),
            cookie: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue() }),
        };


        jest.spyOn(User, "find").mockReturnValue({ sort: jest.fn().mockResolvedValue() })


        await FindUsersOfACommittee(request, res);
        expect(res.status).toHaveBeenCalledWith(200)

    });
});


describe("updateGroupDetails catch  case ", () => {
    test(" updateGroupDetails catch  case", async () => {
        const request = {
            body: [{
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

            }],
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
            },
        };
        const res = {
            status: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue(), json: jest.fn().mockResolvedValue(), cookie: jest.fn().mockReturnValue(true) }),
            send: jest.fn(),
            json: jest.fn(),
            cookie: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue() }),
        };

        const mockUpdate = jest.spyOn(Groups, 'findByIdAndUpdate');

        // Set up the mock implementation to return a rejected promise
        mockUpdate.mockRejectedValue(new Error('Mocked error'));

        // Make the function call
        jest.spyOn(Groups, "findOne").mockResolvedValue()


        await Groups.findByIdAndUpdate(request.params.id, { $set: request.body })
            .then((data) => {
                res.status(200).send(data);
            })
            .catch((error) => {
                res.status(400).send(error);
            });



        await updateGroupDetails(request, res);
        expect(res.status).toHaveBeenCalledWith(400)

    });
});

describe("updateGroupDetails success case ", () => {
    test(" updateGroupDetails success  case", async () => {
        const request = {
            body:
            {
                GroupName: "frfrff",
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
            },
        };
        const res = {
            status: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue(), json: jest.fn().mockResolvedValue(), cookie: jest.fn().mockReturnValue(true) }),
            send: jest.fn(),
            json: jest.fn(),
            cookie: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue() }),
        };
        jest.spyOn(Groups, "findOne").mockReturnValue({ exec: jest.fn().mockResolvedValue(null) })


        jest.spyOn(Groups, "findByIdAndUpdate").mockResolvedValue()


        await updateGroupDetails(request, res);
        expect(res.status).toHaveBeenCalledWith(200)

    });
});

describe("updateGroupDetails groupName exist case ", () => {
    test(" updateGroupDetails groupName exist  case", async () => {
        const request = {
            body:
            {
                GroupName: "theepori",
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
            },
        };
        const res = {
            status: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue(), json: jest.fn().mockResolvedValue(), cookie: jest.fn().mockReturnValue(true) }),
            send: jest.fn(),
            json: jest.fn(),
            cookie: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue() }),
        };
        jest.spyOn(Groups, "findOne").mockReturnValue({ exec: jest.fn().mockResolvedValue(groupData2) })

        await updateGroupDetails(request, res);
        expect(res.status).toHaveBeenCalledWith(400)

    });
});


describe("updateGroupDetails error  case ", () => {
    test(" updateGroupDetails error  case", async () => {
        const request = {
            body:
            {
                GroupNdame: "theepori",
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
            },
        };
        const res = {
            status: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue(), json: jest.fn().mockResolvedValue(), cookie: jest.fn().mockReturnValue(true) }),
            send: jest.fn(),
            json: jest.fn(),
            cookie: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue() }),
        };
        jest.spyOn(Groups, "findOne").mockReturnValue({ exec: jest.fn().mockResolvedValue(groupData2) })

        await updateGroupDetails(request, res);
        expect(res.status).toHaveBeenCalledWith(400)

    });
});


describe("FindUsersOfAGroupWithoutCommitteeMember success  case ", () => {
    test(" FindUsersOfAGroupWithoutCommitteeMember success  case", async () => {
        const request = {
            body:
            {
                GroupNdame: "theepori",
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
            },
        };
        const res = {
            status: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue(), json: jest.fn().mockResolvedValue(), cookie: jest.fn().mockReturnValue(true) }),
            send: jest.fn(),
            json: jest.fn(),
            cookie: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue() }),
        };
        jest.spyOn(User, "find").mockReturnValue({ sort: jest.fn().mockResolvedValue() })

        await FindUsersOfAGroupWithoutCommitteeMember(request, res);
        expect(res.status).toHaveBeenCalledWith(200)

    });
});

describe("FindUsersOfAGroupWithoutCommitteeMember error  case ", () => {
    test(" FindUsersOfAGroupWithoutCommitteeMember error  case", async () => {
        const request = {
            body:
            {
                GroupNdame: "theepori",
            },
            params:[ {
                id: "1",

            }],
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
            status: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue(), json: jest.fn().mockResolvedValue(), cookie: jest.fn().mockReturnValue(true) }),
            send: jest.fn(),
            json: jest.fn(),
            cookie: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue() }),
        };
        jest.spyOn(User, "find").mockReturnValue({ sort: jest.fn().mockResolvedValue() })

        await FindUsersOfAGroupWithoutCommitteeMember(request, res);
        expect(res.status).toHaveBeenCalledWith(400)

    });
});


describe("findGroupOnEventdsOnly success  case ", () => {
    test(" findGroupOnEventdsOnly success  case", async () => {
        const request = {
            body:
            {
                GroupNdame: "theepori",
            },
            params: {
                id: "645e2d90675225374f91a05d",

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
            status: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue(), json: jest.fn().mockResolvedValue(), cookie: jest.fn().mockReturnValue(true) }),
            send: jest.fn(),
            json: jest.fn(),
            cookie: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue() }),
        };
        jest.spyOn(totalPoint, "aggregate").mockResolvedValue()

        await findGroupOnEventdsOnly(request, res);
        expect(res.status).toHaveBeenCalledWith(200)

    });
});

describe("findGroupOnEventdsOnly main catch  case ", () => {
    test(" findGroupOnEventdsOnly main catch  case", async () => {
        const request = {
            body:
            {
                GroupNdame: "theepori",
            },
            params:[ {
                id: "645e2d90675225374f91a05d",

            }],
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
            status: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue(), json: jest.fn().mockResolvedValue(), cookie: jest.fn().mockReturnValue(true) }),
            send: jest.fn(),
            json: jest.fn(),
            cookie: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue() }),
        };
        jest.spyOn(totalPoint, "aggregate").mockReturnValue()

        await findGroupOnEventdsOnly(request, res);
        expect(res.status).toHaveBeenCalledWith(400)

    });
});

describe("findGroupOnEventdsOnly sub catch  case ", () => {
    test(" findGroupOnEventdsOnly sub catch  case", async () => {
        const request = {
            body:
            {
                GroupNdame: "theepori",
            },
            params:[ {
                id: "645e2d90675225374f91a05d",

            }],
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
            status: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue(), json: jest.fn().mockResolvedValue(), cookie: jest.fn().mockReturnValue(true) }),
            send: jest.fn(),
            json: jest.fn(),
            cookie: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue() }),
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
        // jest.spyOn(totalPoint, "aggregate").mockReturnValue()

        await findGroupOnEventdsOnly(request, res);
        expect(res.status).toHaveBeenCalledWith(401)

    });
});


describe("groupNameAndMembers success  case ", () => {
    test(" groupNameAndMembers success  case", async () => {
        const request = {
            body:
            {
                GroupNdame: "theepori",
            },
            params: {
                id: "645e2d90675225374f91a05d",

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
            status: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue(), json: jest.fn().mockResolvedValue(), cookie: jest.fn().mockReturnValue(true) }),
            send: jest.fn(),
            json: jest.fn(),
            cookie: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue() }),
        };
        jest.spyOn(User, "findById").mockReturnValue({ exec: jest.fn().mockResolvedValue(user5) })
        jest.spyOn(Groups, "findById").mockResolvedValue()
        jest.spyOn(User, "find").mockResolvedValue(user1)

        await groupNameAndMembers(request, res);
        expect(res.status).toHaveBeenCalledWith(200)

    });
});

describe("groupNameAndMembers main catch  case ", () => {
    test(" groupNameAndMembers main catch  case", async () => {
        const request = {
            body:
            {
                GroupNdame: "theepori",
            },
            params:[ {
                id: "645e2d90675225374f91a05d",

            }],
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
            status: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue(), json: jest.fn().mockResolvedValue(), cookie: jest.fn().mockReturnValue(true) }),
            send: jest.fn(),
            json: jest.fn(),
            cookie: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue() }),
        };
        jest.spyOn(User, "findById").mockReturnValue({ exec: jest.fn().mockResolvedValue(user5) })
        jest.spyOn(Groups, "findById").mockReturnValue()
        // jest.spyOn(User, "find").mockResolvedValue(user1)
        await groupNameAndMembers(request, res);
        expect(res.status).toHaveBeenCalledWith(401)

    });
});

describe("groupNameAndMembers sub catch  case ", () => {
    test(" groupNameAndMembers sub catch  case", async () => {
        const request = {
            body:
            {
                GroupNdame: "theepori",
            },
            params:[ {
                id: "645e2d90675225374f91a05d",

            }],
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
            status: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue(), json: jest.fn().mockResolvedValue(), cookie: jest.fn().mockReturnValue(true) }),
            send: jest.fn(),
            json: jest.fn(),
            cookie: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue() }),
        };
        const mockUpdate = jest.spyOn(Groups, 'findById');

    // Set up the mock implementation to return a rejected promise
    mockUpdate.mockRejectedValue(new Error('Mocked error'));

    // Make the function call
    jest.spyOn(User, "findById").mockReturnValue({ exec: jest.fn().mockResolvedValue(user5) })
    // jest.spyOn(Groups, "Groups").mockReturnValue()
    // jest.spyOn(User, "find").mockResolvedValue(user1)
    await Groups.findById(request.params.id, { $set: request.body })
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((error) => {
        res.status(400).send(error);
      });
        // jest.spyOn(totalPoint, "aggregate").mockReturnValue()

        await groupNameAndMembers(request, res);
        expect(res.status).toHaveBeenCalledWith(400)

    });
});

describe("groupNameAndMembers sub 2 catch  case ", () => {
    test(" groupNameAndMembers sub 2 catch  case", async () => {
        const request = {
            body:
            {
                GroupNdame: "theepori",
            },
            params:[ {
                id: "645e2d90675225374f91a05d",

            }],
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
            status: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue(), json: jest.fn().mockResolvedValue(), cookie: jest.fn().mockReturnValue(true) }),
            send: jest.fn(),
            json: jest.fn(),
            cookie: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue() }),
        };
        const mockUpdate = jest.spyOn(User, 'find');

    // Set up the mock implementation to return a rejected promise
    mockUpdate.mockRejectedValue(new Error('Mocked error'));

    // Make the function call
    jest.spyOn(User, "findById").mockReturnValue({ exec: jest.fn().mockResolvedValue(user5) })
    jest.spyOn(Groups, "findById").mockResolvedValue()
    await User.find(request.params.id, { $set: request.body })
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((error) => {
        res.status(400).send(error);
      });

        await groupNameAndMembers(request, res);
        expect(res.status).toHaveBeenCalledWith(400)

    });
});

describe("GroupDelete success  case ", () => {
    test(" GroupDelete success  case", async () => {
        const request = {
            body:
            {
                GroupNdame: "theepori",
            },
            params: {
                id: "645e2d90675225374f91a05d",

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
            status: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue(), json: jest.fn().mockResolvedValue(), cookie: jest.fn().mockReturnValue(true) }),
            send: jest.fn(),
            json: jest.fn(),
            cookie: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue() }),
        };
        jest.spyOn(Groups, "findByIdAndDelete").mockResolvedValue()
        jest.spyOn(totalPoint, "deleteMany").mockResolvedValue()

        await GroupDelete(request, res);
        expect(res.status).toHaveBeenCalledWith(200)

    });
});
describe("GroupDelete else  case ", () => {
    test(" GroupDelete else  case", async () => {
        const request = {
      
            params: {
                id: "645e2d90675225374f91a05d",

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
            status: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue(), json: jest.fn().mockResolvedValue(), cookie: jest.fn().mockReturnValue(true) }),
            send: jest.fn(),
            json: jest.fn(),
            cookie: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue() }),
        };
        jest.spyOn(Groups, "findByIdAndDelete").mockResolvedValue()
        jest.spyOn(totalPoint, "deleteMany").mockResolvedValue()

        await GroupDelete(request, res);
        expect(res.status).toHaveBeenCalledWith(400)

    });
});

describe("GroupDelete main catch  case ", () => {
    test(" GroupDelete main catch  case", async () => {
        const request = {
            body:
            {
                GroupNdame: "theepori",
            },
            params:[ {
                id: "645e2d90675225374f91a05d",

            }],
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
            status: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue(), json: jest.fn().mockResolvedValue(), cookie: jest.fn().mockReturnValue(true) }),
            send: jest.fn(),
            json: jest.fn(),
            cookie: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue() }),
        };
        jest.spyOn(Groups, "findByIdAndDelete").mockReturnValue()
        jest.spyOn(totalPoint, "deleteMany").mockResolvedValue()
        await GroupDelete(request, res);
        expect(res.status).toHaveBeenCalledWith(401)

    });
});

describe("GroupDelete sub catch  case ", () => {
    test(" GroupDelete sub catch  case", async () => {
        const request = {
            body:
            {
                GroupNdame: "theepori",
            },
            params:[ {
                id: "645e2d90675225374f91a05d",

            }],
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
            status: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue(), json: jest.fn().mockResolvedValue(), cookie: jest.fn().mockReturnValue(true) }),
            send: jest.fn(),
            json: jest.fn(),
            cookie: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue() }),
        };
        const mockUpdate = jest.spyOn(Groups, 'findByIdAndDelete');

    // Set up the mock implementation to return a rejected promise
    mockUpdate.mockRejectedValue(new Error('Mocked error'));

    // Make the function call

    
    await Groups.findByIdAndDelete(request.params.id, { $set: request.body })
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((error) => {
        res.status(400).send(error);
      });
        // jest.spyOn(totalPoint, "aggregate").mockReturnValue()

        await GroupDelete(request, res);
        expect(res.status).toHaveBeenCalledWith(400)

    });
});

describe("GroupDelete sub 2 catch  case ", () => {
    test(" GroupDelete sub 2 catch  case", async () => {
        const request = {
            body:
            {
                GroupNdame: "theepori",
            },
            params:[ {
                id: "645e2d90675225374f91a05d",

            }],
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
            status: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue(), json: jest.fn().mockResolvedValue(), cookie: jest.fn().mockReturnValue(true) }),
            send: jest.fn(),
            json: jest.fn(),
            cookie: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue() }),
        };
        const mockUpdate = jest.spyOn(totalPoint, 'deleteMany');

    // Set up the mock implementation to return a rejected promise
    mockUpdate.mockRejectedValue(new Error('Mocked error'));

    // Make the function call
    jest.spyOn(Groups, "findByIdAndDelete").mockResolvedValue()
    await totalPoint.deleteMany(request.params.id, { $set: request.body })
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((error) => {
        res.status(400).send(error);
      });

        await GroupDelete(request, res);
        expect(res.status).toHaveBeenCalledWith(400)

    });
});











