const mongoose = require("mongoose");
const { ObjectId } = require('bson');
const { createReport, findReport, reedReport } = require("../controller/Report.Controller");
const Post = require("../models/Post.Model");

const NotificationModel = require("../models/Notification.Model");
const Report = require("../models/Report.Model");
const User = require("../models/User.Model");
const Groups = require("../models/Groups.Model");
const bcrypt = require('bcryptjs');
const { report } = require("../routes/Like.Routes");
const { reportdumb } = require("./data");




jest.mock('jsonwebtoken', () => ({
  sign: jest.fn().mockReturnValue('mocked_token')
}));

beforeAll(async () => {
  return true
})
jest.mock("bcryptjs", () => ({
  compareSync: jest.fn(),
  genSaltSync: jest.fn(),
  hashSync: jest.fn(),


}))
jest.mock("jsonwebtoken", () => ({
  verify: jest.fn(),
  sign: jest.fn()
}))
jest.mock("jsonwebtoken", () => ({
  verify: jest.fn(),
  sign: jest.fn()
}))
jest.mock("otp-generator", () => ({
  generate: jest.fn(),
}))

afterEach(() => {
  jest.clearAllMocks();
});
afterAll(() => {
  mongoose.connection.close()
})


describe("createReport success case ", () => {
  test(" createReport success  case", async () => {
    const request = {
      body: {
        UserName: "wwwww",
        Message: "234fefc",
        PostId: 1,
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
      status: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue() }),
      send: jest.fn(),
      json: jest.fn(),
      cookie: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue() })
    };

    jest.spyOn(Report, "create").mockResolvedValue();
    jest.spyOn(NotificationModel, "create").mockResolvedValue();
    jest.spyOn(Report, "countDocuments").mockResolvedValue();


    await createReport(request, res);
    // console.log(res);
    expect(res.status).toHaveBeenCalledWith(200)

  });
});

describe("createReport success switch value 0 case ", () => {
  test(" createReport success switch value 0  case", async () => {
    const request = {
      body: {
        UserName: "wwwww",
        Message: "234fefc",
        PostId: 1,
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
      status: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue() }),
      send: jest.fn(),
      json: jest.fn(),
      cookie: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue() })
    };
   
      jest.spyOn(Report, "create").mockResolvedValue();
    jest.spyOn(NotificationModel, "create").mockResolvedValue();
    jest.spyOn(Report, "countDocuments").mockResolvedValue(0);
    jest.spyOn(Post, "deleteOne").mockResolvedValue();
    jest.spyOn(NotificationModel, "deleteMany").mockResolvedValue();
    // await NotificationModel.deleteMany({ PostId: new mongoose.Types.ObjectId(postId) });



    await createReport(request, res);
    expect(res.status).toHaveBeenCalledWith(200)

  });
});


// describe("createReport success switch value 0 case ", () => {
//   test(" createReport success switch value 0  case", async () => {
//     const request = {
//       body: {
//         UserName: "wwwww",
//         Message: "234fefc",
//         PostId: 1,
//       },
//       params: {
//         id: "1",

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
//       }
//     };
//     const res = {
//       status: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue() }),
//       send: jest.fn(),
//       json: jest.fn(),
//       cookie: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue() })
//     };
   
//       jest.spyOn(Report, "create").mockResolvedValue();
//     jest.spyOn(NotificationModel, "create").mockResolvedValue();
//     jest.spyOn(Report, "countDocuments").mockResolvedValue(0);
//     jest.spyOn(Post, "deleteOne").mockResolvedValue();
//     jest.spyOn(NotificationModel, "deleteMany").mockResolvedValue();
//     // await NotificationModel.deleteMany({ PostId: new mongoose.Types.ObjectId(postId) });



//     await createReport(request, res);
//     console.log(res);
//     expect(res.status).toHaveBeenCalledWith(200)

//   });
// });
describe("createReport inner catch case ", () => {
  test(" createReport inner catch  case", async () => {
    const request = {
      body: {
        UserName: "wwwww",
        Message: "234fefc",
        PostId: 1,
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
      status: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue() }),
      send: jest.fn(),
      json: jest.fn(),
      cookie: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue() })
    };
    const mockUpdate = jest.spyOn(NotificationModel, 'create');

    // Set up the mock implementation to return a rejected promise
    mockUpdate.mockRejectedValue(new Error('Mocked error'));

    // Make the function call

    await NotificationModel.create(request.params.id, { $set: request.body })
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((error) => {
        res.status(400).send(error);
      });


    await createReport(request, res);
    expect(res.status).toHaveBeenCalledWith(400)

  });
});

describe("createReport inner catch 2 case ", () => {
  test(" createReport inner catch 2 case", async () => {
    const request = {
      body: {
        UserName: "wwwww",
        Message: "234fefc",
        PostId: 1,
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
      status: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue() }),
      send: jest.fn(),
      json: jest.fn(),
      cookie: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue() })
    };
    const mockUpdate = jest.spyOn(Report, 'create');

    // Set up the mock implementation to return a rejected promise
    mockUpdate.mockRejectedValue(new Error('Mocked error'));

    // Make the function call

    await Report.create(request.params.id, { $set: request.body })
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((error) => {
        res.status(400).send(error);
      });
    // jest.spyOn(Report, "create").mockResolvedValue();


    await createReport(request, res);
    expect(res.status).toHaveBeenCalledWith(400)

  });
});

describe("findReport catch case ", () => {
  test(" findReport catch  case", async () => {
    const request = {
      body: {
        UserName: "wwwww",
        password: "ddd",
        email: "eddedd",
      },
      params: {
        id: "1",

      }
    };
    const res = {
      status: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue(), json: jest.fn().mockResolvedValue(), cookie: jest.fn().mockReturnValue(true) }),
      send: jest.fn(),
      json: jest.fn(),
      cookie: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue() })
    };

    jest.spyOn(Report, "aggregate").mockResolvedValue();
    jest.spyOn(Report, "aggregate").mockReturnValue({ reverse: jest.fn().mockResolvedValue() });


    await findReport(request, res);
    expect(res.status).toHaveBeenCalledWith(400)

  });
});

describe("findReport success case ", () => {
  test(" findReport success  case", async () => {
    const request = {
      body: {
        UserName: "wwwww",
        password: "ddd",
        email: "eddedd",
      },
      params: {
        id: "1",

      }
    };
    const res = {
      status: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue(), json: jest.fn().mockResolvedValue(), cookie: jest.fn().mockReturnValue(true) }),
      send: jest.fn(),
      json: jest.fn(),
      cookie: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue() })
    };




    jest.spyOn(Report, "aggregate").mockResolvedValue(reportdumb)

    await findReport(request, res);
    expect(res.status).toHaveBeenCalledWith(200)

  });
});


describe("findReport innercatch case ", () => {
  test(" findReport innercatch  case", async () => {
    const request = {
      body: {
        UserName: "wwwww",
        password: "ddd",
        email: "eddedd",
      },
      params: {
        id: "1",

      }
    };
    const res = {
      status: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue(), json: jest.fn().mockResolvedValue(), cookie: jest.fn().mockReturnValue(true) }),
      send: jest.fn(),
      json: jest.fn(),
      cookie: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue() })
    };
    const mockUpdate = jest.spyOn(Report, 'aggregate');

    // Set up the mock implementation to return a rejected promise
    mockUpdate.mockRejectedValue(new Error('Mocked error'));

    // Make the function call
    // jest.spyOn(Report, "aggregate").mockResolvedValue();

    await Report.aggregate(request.params.id, { $set: request.body })
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((error) => {
        res.status(401).send(error);
      });
    // jest.spyOn(Report, "aggregate").mockResolvedValue();
    // jest.spyOn(Report, "aggregate").mockReturnValue({ reverse: jest.fn().mockResolvedValue() });


    await findReport(request, res);
    expect(res.status).toHaveBeenCalledWith(401)

  });
});

describe("reedReport success case ", () => {
  test(" reedReport success  case", async () => {
    const request = {
      body: {
        UserName: "wwwww",
        password: "ddd",
        email: "eddedd",
      },
      params: {
        id: "1",

      }
    };
    const res = {
      status: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue(), json: jest.fn().mockResolvedValue(), cookie: jest.fn().mockReturnValue(true) }),
      send: jest.fn(),
      json: jest.fn(),
      cookie: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue() })
    };

    jest.spyOn(Report, "findOneAndUpdate").mockResolvedValue();



    await reedReport(request, res);
    expect(res.status).toHaveBeenCalledWith(200)

  });
});

describe("reedReport catch case ", () => {
  test(" reedReport catch  case", async () => {
    const request = {
      body: {
        UserName: "wwwww",
        password: "ddd",
        email: "eddedd",
      },
      params: {
        id: "1",

      }
    };
    const res = {
      status: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue(), json: jest.fn().mockResolvedValue(), cookie: jest.fn().mockReturnValue(true) }),
      send: jest.fn(),
      json: jest.fn(),
      cookie: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue() })
    };

    jest.spyOn(Report, "findOneAndUpdate").mockReturnValue();



    await reedReport(request, res);
    expect(res.status).toHaveBeenCalledWith(400)

  });
});

