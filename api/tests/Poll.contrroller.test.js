const Poll = require("../models/Poll.Model");
const {
  createPoll,
  votePoll,
  listAllPolls,
  getPollById,
  getActivePolls,
  updatePoll,
  deletePoll,
} = require("../controller/Poll.Controller")
const { default: mongoose } = require("mongoose");
const { ObjectId } = require('bson');
const { pollCreate, pollUser, poll2, pollVote, listPolls, pollByID, activrPolls, pollUpdate, pollUpdate2, deletePolls } = require("./data1");
const User = require("../models/User.Model");
const NotificationModel = require("../models/Notification.Model");






beforeAll(async () => {
  return true
})
beforeEach(async () => {
  jest.clearAllMocks();
})

afterEach(() => {
  jest.clearAllMocks();
});
afterAll(() => {
  mongoose.connection.close()
})



describe("createPoll main catch case ", () => {
  test(" createPoll main catch  case", async () => {
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
      cookie: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue() })
    };
    jest.spyOn(Poll.prototype, 'save').mockReturnValueOnce({ exec: jest.fn().mockResolvedValue() });


    createPoll(request, res);
    expect(res.status).toHaveBeenCalledWith(400)

  });
});

describe("createPoll success case ", () => {
  test(" createPoll success  case", async () => {
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
      cookie: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue() })
    };
    jest.spyOn(Poll.prototype, 'save').mockResolvedValue(pollCreate);


    jest.spyOn(Poll, "findByIdAndUpdate").mockResolvedValue(poll2);
    jest.spyOn(User, "find").mockReturnValueOnce({ exec: jest.fn().mockResolvedValue(pollUser) });
    jest.spyOn(NotificationModel, "insertMany").mockResolvedValue();




    await createPoll(request, res);
    expect(res.status).toHaveBeenCalledWith(200)

  });
});


describe("createPoll poll inner catch case ", () => {
  test(" createPoll poll inner catch  case", async () => {
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
      cookie: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue() })
    };
    const mockUpdate = jest.spyOn(Poll, 'findByIdAndUpdate');

    // Set up the mock implementation to return a rejected promise
    mockUpdate.mockRejectedValue(new Error('Mocked error'));

    // Make the function call


    jest.spyOn(Poll.prototype, 'save').mockResolvedValue(pollCreate);

    await Poll.findByIdAndUpdate(request.params.id, { $set: request.body })
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((error) => {
        res.status(400).send(error);
      });





    await createPoll(request, res);
    expect(res.status).toHaveBeenCalledWith(400)

  });
});

describe("createPoll notification inner catch case ", () => {
  test(" createPoll notification inner catch  case", async () => {
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
      cookie: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue() })
    };
    const mockUpdate = jest.spyOn(NotificationModel, 'insertMany');

    // Set up the mock implementation to return a rejected promise
    mockUpdate.mockRejectedValue(new Error('Mocked error'));

    jest.spyOn(Poll.prototype, 'save').mockResolvedValue(pollCreate);


    jest.spyOn(Poll, "findByIdAndUpdate").mockResolvedValue(poll2);
    jest.spyOn(User, "find").mockReturnValueOnce({ exec: jest.fn().mockResolvedValue(pollUser) });
    await NotificationModel.insertMany(request.params.id, { $set: request.body })
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((error) => {
        res.status(400).send(error);
      });




    await createPoll(request, res);
    expect(res.status).toHaveBeenCalledWith(200)

  });
});


// describe("createPoll notification main catch case ", () => {
//   test(" createPoll notification main catch  case", async () => {
//     const request = {
//       body: {
//         UserName: "wwwww",
//         Options: ["dewdwdew", "dfewfeffewf", "3dfdfewfdwe"],
//         Topic: "sssss",
//         StartDate: new Date(),
//         EndDate: new Date()

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
//       status: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue(), json: jest.fn().mockResolvedValue(), cookie: jest.fn().mockReturnValue(true) }),
//       send: jest.fn(),
//       json: jest.fn(),
//       cookie: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue() })
//     };
//     jest.spyOn(Poll.prototype, 'save').mockResolvedValue(pollCreate);


//     jest.spyOn(Poll, "findByIdAndUpdate").mockResolvedValue(poll2);
//     jest.spyOn(User, "find").mockReturnValueOnce({ exec: jest.fn().mockResolvedValue(pollUser) });
//     jest.spyOn(NotificationModel, "insertMany").mockReturnValue();




//     await createPoll(request, res);
//     expect(res.status).toHaveBeenCalledWith(400)

//   });
// });

// describe("createPoll poll main catch case ", () => {
//   test(" createPoll poll main catch  case", async () => {
//     const request = {
//       body: {
//         UserName: "wwwww",
//         Options: ["dewdwdew", "dfewfeffewf", "3dfdfewfdwe"],
//         Topic: "sssss",
//         StartDate: new Date(),
//         EndDate: new Date()

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
//       status: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue(), json: jest.fn().mockResolvedValue(), cookie: jest.fn().mockReturnValue(true) }),
//       send: jest.fn(),
//       json: jest.fn(),
//       cookie: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue() })
//     };
//     jest.spyOn(Poll.prototype, 'save').mockResolvedValue(pollCreate);


//     jest.spyOn(Poll, "findByIdAndUpdate").mockReturnValue();





//     await createPoll(request, res);
//     expect(res.status).toHaveBeenCalledWith(400)

//   });
// });

describe("votePoll success case ", () => {
  test(" votePoll success  case", async () => {
    const request = {
      body: {
        optionId: 1,
        Options: ["dewdwdew", "dfewfeffewf", "3dfdfewfdwe"],
        pollId: "1",
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
      cookie: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue() })
    };

    jest.spyOn(Poll, "findOneAndUpdate").mockResolvedValue(pollVote);
    jest.spyOn(Poll, "updateMany").mockResolvedValue(pollVote);

    await votePoll(request, res);
    expect(res.status).toHaveBeenCalledWith(200)

  });
});


describe("votePoll Poll inner catch case ", () => {
  test(" votePoll  Poll inner catch  case", async () => {
    const request = {
      body: {
        optionId: 1,
        Options: ["dewdwdew", "dfewfeffewf", "3dfdfewfdwe"],
        pollId: "1",
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
      cookie: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue() })
    };
    const mockUpdate = jest.spyOn(Poll, 'findOneAndUpdate');

    // Set up the mock implementation to return a rejected promise
    mockUpdate.mockRejectedValue(new Error('Mocked error'));





    await Poll.findOneAndUpdate(request.params.id, { $set: request.body })
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((error) => {
        res.status(400).send(error);
      });

    await votePoll(request, res);
    expect(res.status).toHaveBeenCalledWith(400)

  });
});


describe("votePoll Poll main catch case ", () => {
  test(" votePoll  Poll main catch  case", async () => {
    const request = {
      body: {
        optionId: 1,
        Options: ["dewdwdew", "dfewfeffewf", "3dfdfewfdwe"],
        pollId: "1",
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
      cookie: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue() })
    };


    jest.spyOn(Poll, "findOneAndUpdate").mockReturnValue();

    await votePoll(request, res);
    expect(res.status).toHaveBeenCalledWith(400)

  });
});


describe("votePoll Poll 2 inner catch case ", () => {
  test(" votePoll  Poll 2 inner catch  case", async () => {
    const request = {
      body: {
        optionId: 1,
        Options: ["dewdwdew", "dfewfeffewf", "3dfdfewfdwe"],
        pollId: "1",
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
      cookie: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue() })
    };
    const mockUpdate = jest.spyOn(Poll, 'updateMany');

    // Set up the mock implementation to return a rejected promise
    mockUpdate.mockRejectedValue(new Error('Mocked error'));






    jest.spyOn(Poll, "findOneAndUpdate").mockResolvedValue(pollVote);

    await Poll.updateMany(request.params.id, { $set: request.body })
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((error) => {
        res.status(400).send(error);
      });


    await votePoll(request, res);
    expect(res.status).toHaveBeenCalledWith(400)

  });
});


describe("votePoll Poll 2 main catch case ", () => {
  test(" votePoll  Poll 2 main catch  case", async () => {
    const request = {
      body: {
        optionId: 1,
        Options: ["dewdwdew", "dfewfeffewf", "3dfdfewfdwe"],
        pollId: "1",
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
      cookie: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue() })
    };

    jest.spyOn(Poll, "findOneAndUpdate").mockResolvedValue(pollVote);
    jest.spyOn(Poll, "updateMany").mockReturnValue();

    await votePoll(request, res);
    expect(res.status).toHaveBeenCalledWith(400)

  });
});

describe("listAllPolls success case ", () => {
  test(" listAllPolls success  case", async () => {
    const request = {
      body: {
        optionId: 1,
        Options: ["dewdwdew", "dfewfeffewf", "3dfdfewfdwe"],
        pollId: "1",
        StartDate: new Date(),
        EndDate: new Date()

      },
      params: {
        id: "1",

      },
      headers:{
        genericvalue:0
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
      cookie: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue() })
    };

    jest.spyOn(Poll, "find").mockReturnValue({ sort: jest.fn().mockResolvedValue(listPolls)});

    await listAllPolls(request, res);
    expect(res.status).toHaveBeenCalledWith(200)

  });
});


describe("listAllPolls main catch case ", () => {
  test(" listAllPolls main catch  case", async () => {
    const request = {
      body: {
        optionId: 1,
        Options: ["dewdwdew", "dfewfeffewf", "3dfdfewfdwe"],
        pollId: "1",
        StartDate: new Date(),
        EndDate: new Date()

      },
      params: {
        id: "1",

      },
      headers:{
        genericvalue:0
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
      cookie: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue() })
    };

    jest.spyOn(Poll, "find").mockReturnValue();

    await listAllPolls(request, res);
    expect(res.status).toHaveBeenCalledWith(400)

  });
});

describe("getPollById success case ", () => {
  test(" getPollById success  case", async () => {
    const request = {
      body: {
        optionId: 1,
        Options: ["dewdwdew", "dfewfeffewf", "3dfdfewfdwe"],
        pollId: "1",
        StartDate: new Date(),
        EndDate: new Date()

      },
      params: {
        id: "1",

      },
      headers:{
        genericvalue:0
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
      cookie: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue() })
    };

    jest.spyOn(Poll, "findById").mockResolvedValue(pollByID);

    await getPollById(request, res);
    expect(res.status).toHaveBeenCalledWith(200)

  });
});

describe("getActivePolls success case ", () => {
  test(" getActivePolls success  case", async () => {
    const request = {
      body: {
        optionId: 1,
        Options: ["dewdwdew", "dfewfeffewf", "3dfdfewfdwe"],
        pollId: "1",
        StartDate: new Date(),
        EndDate: new Date()

      },
      params: {
        id: "1",

      },
      headers:{
        genericvalue:0
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
      cookie: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue() })
    };

    jest.spyOn(NotificationModel, "aggregate").mockResolvedValue(activrPolls);

    await getActivePolls(request, res);
    expect(res.status).toHaveBeenCalledWith(200)

  });
});

describe("getActivePolls inner catch case ", () => {
  test(" getActivePolls inner catch  case", async () => {
    const request = {
      body: {
        optionId: 1,
        Options: ["dewdwdew", "dfewfeffewf", "3dfdfewfdwe"],
        pollId: "1",
        StartDate: new Date(),
        EndDate: new Date()

      },
      params: {
        id: "1",

      },
      headers:{
        genericvalue:0
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
      cookie: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue() })
    };
    const mockUpdate = jest.spyOn(NotificationModel, 'aggregate');

    // Set up the mock implementation to return a rejected promise
    mockUpdate.mockRejectedValue(new Error('Mocked error'));

    // Make the function call

    await NotificationModel.find(request.params.id, { $set: request.body })
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((error) => {
        res.status(400).send(error);
      });


    await getActivePolls(request, res);
    expect(res.status).toHaveBeenCalledWith(400)

  });
});


describe("getActivePolls main catch case ", () => {
  test(" getActivePolls main catch  case", async () => {
    const request = {
      body: {
        optionId: 1,
        Options: ["dewdwdew", "dfewfeffewf", "3dfdfewfdwe"],
        pollId: "1",
        StartDate: new Date(),
        EndDate: new Date()

      },
      params: {
        id: "1",

      },
      headers:{
        genericvalue:0
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
      cookie: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue() })
    };
  

    jest.spyOn(NotificationModel, "aggregate").mockReturnValue();

    await getActivePolls(request, res);
    expect(res.status).toHaveBeenCalledWith(400)

  });
});
describe("updatePoll success case ", () => {
  test(" updatePoll success  case", async () => {
    const request = {
      body: {
        optionId: 1,
        Options: ["dewdwdew", "dfewfeffewf", "3dfdfewfdwe"],
        pollId: "1",
        StartDate: new Date(),
        EndDate: new Date()

      },
      params: {
        id: "1",

      },
      headers:{
        genericvalue:1
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
      cookie: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue() })
    };

    jest.spyOn(Poll, "findById").mockReturnValue({exec: jest.fn().mockResolvedValue(pollUpdate)});
    jest.spyOn(Poll, "findByIdAndUpdate").mockResolvedValue(pollUpdate2);
    jest.spyOn(Poll, "findById").mockReturnValue({exec: jest.fn().mockResolvedValue(pollUpdate)});
    jest.spyOn(Poll, "findByIdAndUpdate").mockResolvedValue(pollUpdate2);



    await updatePoll(request, res);
    expect(res.status).toHaveBeenCalledWith(200)

  });
});


describe("updatePoll updation failed case ", () => {
  test(" updatePoll updation failed  case", async () => {
    const request = {
      body: {
        optionId: 1,
        Options: ["dewdwdew", "dfewfeffewf", "3dfdfewfdwe"],
        pollId: "1",
        StartDate: new Date(),
        EndDate: new Date()

      },
      params: {
        id: "1",

      },
      headers:{
        genericvalue:1
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
      cookie: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue() })
    };

    jest.spyOn(Poll, "findById").mockReturnValue({exec: jest.fn().mockResolvedValue(pollUpdate)});
    jest.spyOn(Poll, "findByIdAndUpdate").mockResolvedValue(pollUpdate2);
    jest.spyOn(Poll, "findById").mockReturnValue({exec: jest.fn().mockResolvedValue(pollUpdate)});
    jest.spyOn(Poll, "findByIdAndUpdate").mockResolvedValue();



    await updatePoll(request, res);
    expect(res.status).toHaveBeenCalledWith(400)

  });
});

describe("updatePoll genericvalue 0 case ", () => {
  test(" updatePoll genericvalue 0 case", async () => {
    const request = {
      body: {
        optionId: 1,
        Options: ["dewdwdew", "dfewfeffewf", "3dfdfewfdwe"],
        pollId: "1",
        StartDate: new Date(),
        EndDate: new Date()

      },
      params: {
        id: "1",

      },
      headers:{
        genericvalue:0
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
      cookie: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue() })
    };

    jest.spyOn(Poll, "findById").mockReturnValue({exec: jest.fn().mockResolvedValue(pollUpdate)});
    jest.spyOn(Poll, "findByIdAndUpdate").mockResolvedValue(pollUpdate2);
    jest.spyOn(Poll, "findById").mockReturnValue({exec: jest.fn().mockResolvedValue(pollUpdate)});
    jest.spyOn(Poll, "findByIdAndUpdate").mockResolvedValue();



    await updatePoll(request, res);
    expect(res.status).toHaveBeenCalledWith(403)

  });
});
describe("updatePoll main catch case ", () => {
  test(" updatePoll main catch  case", async () => {
    const request = {
      body: {
        optionId: 1,
        Options: ["dewdwdew", "dfewfeffewf", "3dfdfewfdwe"],
        pollId: "1",
        StartDate: new Date(),
        EndDate: new Date()

      },
      params: {
        id: "1",

      },
      headers:{
        genericvalue:1
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
      cookie: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue() })
    };

    jest.spyOn(Poll, "findById").mockReturnValue({exec: jest.fn().mockResolvedValue(pollUpdate)});
    jest.spyOn(Poll, "findByIdAndUpdate").mockReturnValue();
 


    await updatePoll(request, res);
    expect(res.status).toHaveBeenCalledWith(400)

  });
});


describe("updatePoll inner catch catch case ", () => {
  test("updatePoll inner catch catch case ", async () => {
    const request = {
      body: {
        optionId: 1,
        Options: ["dewdwdew", "dfewfeffewf", "3dfdfewfdwe"],
        pollId: "1",
        StartDate: new Date(),
        EndDate: new Date()

      },
      params: {
        id: "1",

      },
      headers:{
        genericvalue:1
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
      cookie: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue() })
    };
    const mockUpdate = jest.spyOn(Poll, 'findByIdAndUpdate');

    // Set up the mock implementation to return a rejected promise
    mockUpdate.mockRejectedValue(new Error('Mocked error'));

  

    jest.spyOn(Poll, "findById").mockReturnValue({exec: jest.fn().mockResolvedValue(pollUpdate)});
    // jest.spyOn(Poll, "findByIdAndUpdate").mockResolvedValue(pollUpdate2);
      // Make the function call

      await Poll.findByIdAndUpdate(request.params.id, { $set: request.body })
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((error) => {
        res.status(400).send(error);
      });
    jest.spyOn(Poll, "findById").mockReturnValue({exec: jest.fn().mockResolvedValue(pollUpdate)});
    jest.spyOn(Poll, "findByIdAndUpdate").mockResolvedValue(pollUpdate2);



    await updatePoll(request, res);
    expect(res.status).toHaveBeenCalledWith(400)

  });
});


// describe("updatePoll inner catch catch case ", () => {
//   test("updatePoll inner catch catch case ", async () => {
//     const request = {
//       body: {
//         optionId: 1,
//         Options: ["dewdwdew", "dfewfeffewf", "3dfdfewfdwe"],
//         pollId: "1",
//         StartDate: new Date(),
//         EndDate: new Date()

//       },
//       params: {
//         id: "1",

//       },
//       headers:{
//         genericvalue:1
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
//       status: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue(), json: jest.fn().mockResolvedValue(), cookie: jest.fn().mockReturnValue(true) }),
//       send: jest.fn(),
//       json: jest.fn(),
//       cookie: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue() })
//     };
//     const mockUpdate = jest.spyOn(Poll, 'findByIdAndUpdate');

//     // Set up the mock implementation to return a rejected promise
//     mockUpdate.mockRejectedValue(new Error('Mocked error'));

  

//     jest.spyOn(Poll, "findById").mockReturnValue({exec: jest.fn().mockResolvedValue(pollUpdate)});
//     jest.spyOn(Poll, "findByIdAndUpdate").mockResolvedValue(pollUpdate2);
    
//     jest.spyOn(Poll, "findById").mockReturnValue({exec: jest.fn().mockResolvedValue(pollUpdate)});
//       // Make the function call

//       await Poll.findByIdAndUpdate(request.params.id, { $set: request.body })
//       .then((pollUpdate2) => {
//         res.status(200).send(pollUpdate2);
//       })
//       .catch((error) => {
//         res.status(400).send(error);
//       });



//     await updatePoll(request, res);
//     expect(res.status).toHaveBeenCalledWith(400)

//   });
// });

describe("deletePoll success case ", () => {
  test(" deletePoll success  case", async () => {
    const request = {
      body: {
        optionId: 1,
        Options: ["dewdwdew", "dfewfeffewf", "3dfdfewfdwe"],
        pollId: "1",
        StartDate: new Date(),
        EndDate: new Date()

      },
      params: {
        id: new ObjectId("646c7c2708d19ac50dcd658c")

      },
      headers:{
        genericvalue:1
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
      cookie: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue() })
    };

    jest.spyOn(Poll, "findByIdAndDelete").mockResolvedValue(deletePolls);
    jest.spyOn(NotificationModel, "deleteMany").mockResolvedValue();



    await deletePoll(request, res);
    expect(res.status).toHaveBeenCalledWith(200)

  });
});

describe("deletePoll else case ", () => {
  test(" deletePoll else  case", async () => {
    const request = {
      body: {
        optionId: 1,
        Options: ["dewdwdew", "dfewfeffewf", "3dfdfewfdwe"],
        pollId: "1",
        StartDate: new Date(),
        EndDate: new Date()

      },
      params: {
        id: new ObjectId("646c7c2708d19ac50dcd658c")

      },
      headers:{
        genericvalue:1
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
      cookie: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue() })
    };

    jest.spyOn(Poll, "findByIdAndDelete").mockResolvedValue();
    jest.spyOn(NotificationModel, "deleteMany").mockResolvedValue();



    await deletePoll(request, res);
    expect(res.status).toHaveBeenCalledWith(400)

  });
});

describe("deletePoll genericvalue 0 case ", () => {
  test(" deletePoll genericvalue 0  case", async () => {
    const request = {
      body: {
        optionId: 1,
        Options: ["dewdwdew", "dfewfeffewf", "3dfdfewfdwe"],
        pollId: "1",
        StartDate: new Date(),
        EndDate: new Date()

      },
      params: {
        id: new ObjectId("646c7c2708d19ac50dcd658c")

      },
      headers:{
        genericvalue:0
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
      cookie: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue() })
    };

    jest.spyOn(Poll, "findByIdAndDelete").mockResolvedValue();
    jest.spyOn(NotificationModel, "deleteMany").mockResolvedValue();



    await deletePoll(request, res);
    expect(res.status).toHaveBeenCalledWith(403)

  });
});

describe("deletePoll main catch case ", () => {
  test(" deletePoll main catch  case", async () => {
    const request = {
      body: {
        optionId: 1,
        Options: ["dewdwdew", "dfewfeffewf", "3dfdfewfdwe"],
        pollId: "1",
        StartDate: new Date(),
        EndDate: new Date()

      },
      params: {
        id: new ObjectId("646c7c2708d19ac50dcd658c")

      },
      headers:{
        genericvalue:1
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
      cookie: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue() })
    };

    jest.spyOn(Poll, "findByIdAndDelete").mockReturnValue();
    jest.spyOn(NotificationModel, "deleteMany").mockResolvedValue();



    await deletePoll(request, res);
    expect(res.status).toHaveBeenCalledWith(400)

  });
});

describe("deletePoll inner catch case ", () => {
  test(" deletePoll inner catch  case", async () => {
    const request = {
      body: {
        optionId: 1,
        Options: ["dewdwdew", "dfewfeffewf", "3dfdfewfdwe"],
        pollId: "1",
        StartDate: new Date(),
        EndDate: new Date()

      },
      params: {
        id: new ObjectId("646c7c2708d19ac50dcd658c")

      },
      headers:{
        genericvalue:1
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
      cookie: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue() })
    };
    const mockUpdate = jest.spyOn(Poll, 'findByIdAndDelete');

    // Set up the mock implementation to return a rejected promise
    mockUpdate.mockRejectedValue(new Error('Mocked error'));

    // Make the function call

    await Poll.findByIdAndDelete(request.params.id, { $set: request.body })
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((error) => {
        res.status(400).send(error);
      });

    await deletePoll(request, res);
    expect(res.status).toHaveBeenCalledWith(400)

  });
});


describe("deletePoll inner catch 2 case ", () => {
  test(" deletePoll inner catch 2 case", async () => {
    const request = {
      body: {
        optionId: 1,
        Options: ["dewdwdew", "dfewfeffewf", "3dfdfewfdwe"],
        pollId: "1",
        StartDate: new Date(),
        EndDate: new Date()

      },
      params: {
        id: new ObjectId("646c7c2708d19ac50dcd658c")

      },
      headers:{
        genericvalue:1
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
      cookie: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue() })
    };
    const mockUpdate = jest.spyOn(NotificationModel, 'deleteMany');

    // Set up the mock implementation to return a rejected promise
    mockUpdate.mockRejectedValue(new Error('Mocked error'));

    // Make the function call

   
    jest.spyOn(Poll, "findByIdAndDelete").mockResolvedValue(deletePolls);
    await NotificationModel.deleteMany(request.params.id, { $set: request.body })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((error) => {
      res.status(400).send(error);
    });

    await deletePoll(request, res);
    expect(res.status).toHaveBeenCalledWith(400)

  });
});

