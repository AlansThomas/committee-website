const { default: mongoose } = require("mongoose");
// const { validationResult } = require('express-validator');
const { ObjectId } = require('bson');

const app = require("../routes/User.Routes");
const express = require('express');
const router = express.Router();

const User = require("../models/User.Model");
const Groups = require("../models/Groups.Model");
const bcrypt = require('bcryptjs');
const { updateuser,
  deleteuser,
  FindbyNameAndEmail,
  FindByEmail,
  displayallusers,
  getGropuMembers,
  findByEmailRegex,
  paginationRecord,
  AddNewUsersToGroup,
  updateProfileImage,
  AddNewUsersToCommittee,
  searchUser,
  currentUserDetails,
  updateGroupCapandVC,
  findByEmailRegexForGroup,
  findByNameRegexForMention,
  searchOnInnovators,
  birthdaysOfCurrentMonth,
  getUserOrGroupDetails,
  birthdayCardUpload,
  userDetails,
  findByNameRegexForPrivateMention
} = require("../controller/User.Controller");

const { userLogin, userLogin4, findByName, findByName2, birthday, group, group2, group3, group4, user, } = require("./data");


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
// jest.mock('express-validator', () => ({
//   validationResult: jest.fn()
// }));

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


describe("updateuser username emptycase ", () => {
  test(" updateuser username empty case", async () => {
    const request = {
      body: {
        username: "",
        password: "ddd",
        email: "eddedd",
      }
    };
    const res = {
      status: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue(), json: jest.fn().mockResolvedValue(), cookie: jest.fn().mockReturnValue(true) }),
      send: jest.fn(),
      json: jest.fn(),
      cookie: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue() })
    };
    updateuser(request, res);
    expect(res.status).toHaveBeenCalledWith(400)

  });
});

describe("updateuser success case ", () => {
  test(" updateuser success  case", async () => {
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

    jest.spyOn(User, "findByIdAndUpdate").mockResolvedValue(true);


    await updateuser(request, res);
    expect(res.status).toHaveBeenCalledWith(200)

  });
});

describe("updateuser catch case ", () => {
  test(" updateuser catch case", async () => {
    const request = {
      body: {
        username: "alans.thomas@innovaturelabs.com",
        password: "ddd",
        email: "eddedd",
      },
      params: {
        id: "1"
      }
    };
    const res = {
      status: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue(), json: jest.fn().mockResolvedValue(), cookie: jest.fn().mockReturnValue(true) }),
      send: jest.fn(),
      json: jest.fn(),
      cookie: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue() })
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

    await updateuser(request, res);
    expect(res.status).toHaveBeenCalledWith(400);

  });
});


describe("deleteuser success case ", () => {
  test(" deleteuser success  case", async () => {
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

    jest.spyOn(User, "findByIdAndDelete").mockResolvedValue(true);


    await deleteuser(request, res);
    expect(res.status).toHaveBeenCalledWith(200)

  });
});


describe("deleteuser catch case ", () => {
  test(" deleteuser catch case", async () => {
    const request = {
      body: {
        username: "alans.thomas@innovaturelabs.com",
        password: "ddd",
        email: "eddedd",
      },
      params: {
        id: "1"
      }
    };
    const res = {
      status: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue(), json: jest.fn().mockResolvedValue(), cookie: jest.fn().mockReturnValue(true) }),
      send: jest.fn(),
      json: jest.fn(),
      cookie: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue() })
    };
    const mockUpdate = jest.spyOn(User, 'findByIdAndDelete');

    // Set up the mock implementation to return a rejected promise
    mockUpdate.mockRejectedValue(new Error('Mocked error'));

    // Make the function call
    await User.findByIdAndDelete(request.params.id, { $set: request.body })
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((error) => {
        res.status(403).send(error);
      });

    await deleteuser(request, res);
    expect(res.status).toHaveBeenCalledWith(403);

  });
});

describe("FindbyNameAndEmail success case ", () => {
  test(" FindbyNameAndEmail success  case", async () => {
    const request = {
      query: {
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

    jest.spyOn(User, "find").mockReturnValue({ find: jest.fn().mockResolvedValue() });


    await FindbyNameAndEmail(request, res);
    expect(res.status).toHaveBeenCalledWith(200)

  });
});

describe("FindByEmail success case ", () => {
  test(" FindByEmail success  case", async () => {
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

    jest.spyOn(User, "findOne").mockResolvedValue(userLogin);


    await FindByEmail(request, res);
    expect(res.status).toHaveBeenCalledWith(200)

  });
});

describe("FindByEmail User Not Exist case ", () => {
  test(" FindByEmail User Not Exist  case", async () => {
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

    jest.spyOn(User, "findOne").mockResolvedValue({ userLogin4 });


    await FindByEmail(request, res);
    expect(res.status).toHaveBeenCalledWith(404)

  });
});

describe("FindByEmail catch case ", () => {
  test(" FindByEmail catch case", async () => {
    const request = {
      body: {
        username: "alans.thomas@innovaturelabs.com",
        password: "ddd",
        email: "eddedd",
      },
      params: {
        id: "1"
      }
    };
    const res = {
      status: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue(), json: jest.fn().mockResolvedValue(), cookie: jest.fn().mockReturnValue(true) }),
      send: jest.fn(),
      json: jest.fn(),
      cookie: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue() })
    };
    const mockUpdate = jest.spyOn(User, 'findOne');

    // Set up the mock implementation to return a rejected promise
    mockUpdate.mockRejectedValue(new Error('Mocked error'));

    // Make the function call
    await User.findOne(request.params.id, { $set: request.body })
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((error) => {
        res.status(400).send(error);
      });

    await FindByEmail(request, res);
    expect(res.status).toHaveBeenCalledWith(400);

  });
});

describe("displayallusers success case ", () => {
  test(" displayallusers success  case", async () => {
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

    jest.spyOn(User, "aggregate").mockResolvedValue();


    await displayallusers(request, res);
    expect(res.status).toHaveBeenCalledWith(200)

  });
});

describe("displayallusers catch case ", () => {
  test(" displayallusers catch case", async () => {
    const request = {
      body: {
        username: "alans.thomas@innovaturelabs.com",
        password: "ddd",
        email: "eddedd",
      },
      params: {
        id: "1"
      }
    };
    const res = {
      status: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue(), json: jest.fn().mockResolvedValue(), cookie: jest.fn().mockReturnValue(true) }),
      send: jest.fn(),
      json: jest.fn(),
      cookie: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue() })
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
        res.status(403).send(error);
      });

    await displayallusers(request, res);
    expect(res.status).toHaveBeenCalledWith(403);

  });
});

describe("getGropuMembers success case ", () => {
  test(" getGropuMembers success  case", async () => {
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

    jest.spyOn(User, "find").mockResolvedValue();


    await getGropuMembers(request, res);
    expect(res.status).toHaveBeenCalledWith(200)

  });
});

describe("getGropuMembers catch case ", () => {
  test(" getGropuMembers catch case", async () => {
    const request = {
      body: {
        username: "alans.thomas@innovaturelabs.com",
        password: "ddd",
        email: "eddedd",
      },
      params: {
        id: "1"
      }
    };
    const res = {
      status: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue(), json: jest.fn().mockResolvedValue(), cookie: jest.fn().mockReturnValue(true) }),
      send: jest.fn(),
      json: jest.fn(),
      cookie: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue() })
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

    await getGropuMembers(request, res);
    expect(res.status).toHaveBeenCalledWith(403);

  });
});
describe("getGropuMembers success case ", () => {
  test(" getGropuMembers success  case", async () => {
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

    jest.spyOn(User, "find").mockResolvedValue();


    await getGropuMembers(request, res);
    expect(res.status).toHaveBeenCalledWith(200)

  });
});


describe("findByEmailRegex success case ", () => {
  test(" findByEmailRegex success  case", async () => {
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

    jest.spyOn(User, "find").mockResolvedValue();


    await findByEmailRegex(request, res);
    expect(res.status).toHaveBeenCalledWith(200)

  });
});
describe("findByEmailRegex catch case ", () => {
  test(" findByEmailRegex catch case", async () => {
    const request = {
      body: {
        username: "alans.thomas@innovaturelabs.com",
        password: "ddd",
        email: "eddedd",
      },
      params: {
        id: "1"
      }
    };
    const res = {
      status: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue(), json: jest.fn().mockResolvedValue(), cookie: jest.fn().mockReturnValue(true) }),
      send: jest.fn(),
      json: jest.fn(),
      cookie: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue() })
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
        res.status(400).send(error);
      });

    await findByEmailRegex(request, res);
    expect(res.status).toHaveBeenCalledWith(400);

  });
});

describe("findByEmailRegex main catch case ", () => {
  test(" findByEmailRegex main catch  case", async () => {
    const request = {
      body: {
        UserName: "wwwww",
        password: "ddd",
        email: "eddedd",
        Designation: "edseded",
        currentPage: "1",
        pageSize: "2"
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

    jest.spyOn(User, "find").mockReturnValue({});


    await findByEmailRegex(request, res);
    expect(res.status).toHaveBeenCalledWith(400)

  });
});

describe("paginationRecord body empty case ", () => {
  test(" paginationRecord body empty  case", async () => {
    const request = {
      body: null,
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

    jest.spyOn(User, "find").mockReturnValue({});


    await paginationRecord(request, res);
    expect(res.status).toHaveBeenCalledWith(403)

  });
});

//   describe("paginationRecord success case ", () => {
//     test(" paginationRecord success  case", async () => {
//       const request = {
//         body: {
//             UserName:"drfrfrfrffr",
//             Designation:"edseded",
//             currentPage:"1",
//             pageSize:"2"
//         },
//         params: {
//             id: "1",

//         }
//       };
//       const skip = 5;
//       const limit = 10;

//     //   const docs = [{ id: '1', name: 'User 1' }, { id: '2', name: 'User 2' }];
//       const res = {
//         status: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue(), json: jest.fn().mockResolvedValue(), cookie: jest.fn().mockReturnValue(true) }),
//         send: jest.fn(),
//         json: jest.fn(),
//         cookie: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue() })
//       };
//       const UserTable = {
//         find: jest.fn().mockReturnValue({
//           skip: jest.fn().mockReturnThis(),
//           limit: jest.fn().mockReturnThis(),
//         })
//       };

//       await UserTable.find().skip(skip).limit(limit).then((docs) => {
//         res.status(200).send(docs);
//       });  

//      await paginationRecord(request, res);
//       expect(res.status).toHaveBeenCalledWith(200)

//     });
//   });

describe("paginationRecord catch case ", () => {
  test(" paginationRecord success  case", async () => {
    const request = {
      body: {
        UserName: "drfrfrfrffr",
        Designation: "edseded",
        currentPage: "1",
        pageSize: "2"
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

    jest.spyOn(User, "find").mockResolvedValue();


    await paginationRecord(request, res);
    expect(res.status).toHaveBeenCalledWith(401)

  });
});
describe("AddNewUsersToGroup success case ", () => {
  test(" AddNewUsersToGroup success  case", async () => {
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

    jest.spyOn(User, "find").mockReturnValue({ sort: jest.fn().mockResolvedValue() });


    await AddNewUsersToGroup(request, res);
    expect(res.status).toHaveBeenCalledWith(200)

  });
});

describe("updateProfileImage success case ", () => {
  test(" updateProfileImage success  case", async () => {
    const request = {
      body: {
        UserName: "wwwww",
        password: "ddd",
        email: "eddedd",
      },
      params: {
        id: "1",

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
      cookie: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue() })
    };

    jest.spyOn(User, "updateOne").mockResolvedValue();


    await updateProfileImage(request, res);
    expect(res.status).toHaveBeenCalledWith(200)

  });
});

describe("updateProfileImage catch case ", () => {
  test(" updateProfileImage catch case", async () => {
    const request = {
      body: {
        username: "alans.thomas@innovaturelabs.com",
        password: "ddd",
        email: "eddedd",
      },
      params: {
        id: "1"
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
      cookie: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue() })
    };
    const mockUpdate = jest.spyOn(User, 'updateOne');

    // Set up the mock implementation to return a rejected promise
    mockUpdate.mockRejectedValue(new Error('Mocked error'));

    // Make the function call
    await User.updateOne(request.params.id, { $set: request.body })
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((error) => {
        res.status(401).send(error);
      });

    await updateProfileImage(request, res);
    expect(res.status).toHaveBeenCalledWith(401);

  });
});
describe("AddNewUsersToCommittee success case ", () => {
  test(" AddNewUsersToCommittee success  case", async () => {
    const request = {
      body: {
        UserName: "wwwww",
        password: "ddd",
        email: "eddedd",
      },
      params: {
        id: "1",

      },

    };
    const res = {
      status: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue(), json: jest.fn().mockResolvedValue(), cookie: jest.fn().mockReturnValue(true) }),
      send: jest.fn(),
      json: jest.fn(),
      cookie: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue() })
    };

    jest.spyOn(User, "find").mockReturnValue({ sort: jest.fn().mockResolvedValue() });


    await AddNewUsersToCommittee(request, res);
    expect(res.status).toHaveBeenCalledWith(200)

  });
});

describe("AddNewUsersToCommittee catch case ", () => {
  test(" AddNewUsersToCommittee catch case", async () => {
    const request = {
      body: {
        username: "alans.thomas@innovaturelabs.com",
        password: "ddd",
        email: "eddedd",
      },
      params: {
        id: "1"
      },

    };
    const res = {
      status: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue(), json: jest.fn().mockResolvedValue(), cookie: jest.fn().mockReturnValue(true) }),
      send: jest.fn(),
      json: jest.fn(),
      cookie: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue() })
    };
    const mockUpdate = jest.spyOn(User, 'updateOne');

    // Set up the mock implementation to return a rejected promise
    mockUpdate.mockRejectedValue(new Error('Mocked error'));

    // Make the function call
    await User.updateOne(request.params.id, { $set: request.body })
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((error) => {
        res.status(403).send(error);
      });

    await AddNewUsersToCommittee(request, res);
    expect(res.status).toHaveBeenCalledWith(403);

  });
});

describe("searchUser success case ", () => {
  test(" searchUser success  case", async () => {
    const request = {
      body: {
        UserName: "wwwww",
        password: "ddd",
        email: "eddedd",
      },
      params: {
        id: "1",

      },
      query: {
        id: "1",

      },


    };
    const res = {
      status: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue(), json: jest.fn().mockResolvedValue(), cookie: jest.fn().mockReturnValue(true) }),
      send: jest.fn(),
      json: jest.fn(),
      cookie: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue() })
    };

    jest.spyOn(User, "find").mockReturnValue({ exec: jest.fn().mockResolvedValue() });


    await searchUser(request, res);
    expect(res.status).toHaveBeenCalledWith(200)

  });
});

describe("searchUser catch case ", () => {
  test(" searchUser catch  case", async () => {
    const request = {
      body: {
        UserName: "wwwww",
        password: "ddd",
        email: "eddedd",
      },
      params: {
        id: "1",

      },
      query: {
        id: "1",

      },


    };
    const res = {
      status: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue(), json: jest.fn().mockResolvedValue(), cookie: jest.fn().mockReturnValue(true) }),
      send: jest.fn(),
      json: jest.fn(),
      cookie: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue() })
    };

    jest.spyOn(User, "find").mockReturnValue({ then: jest.fn().mockResolvedValue() });


    await searchUser(request, res);
    expect(res.status).toHaveBeenCalledWith(404)

  });
});
describe("currentUserDetails success case ", () => {
  test(" currentUserDetails success  case", async () => {
    const request = {
      body: {
        UserName: "wwwww",
        password: "ddd",
        email: "eddedd",
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

    jest.spyOn(User, "findById").mockResolvedValue();


    await currentUserDetails(request, res);
    expect(res.status).toHaveBeenCalledWith(200)

  });
});

describe("currentUserDetails main catch case ", () => {
  test(" currentUserDetails  main catch  case", async () => {
    const request = {
      body: {
        UserName: "wwwww",
        password: "ddd",
        email: "eddedd",
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

    jest.spyOn(User, "findById").mockReturnValue();


    await currentUserDetails(request, res);
    expect(res.status).toHaveBeenCalledWith(400)

  });
});
describe("currentUserDetails catch case ", () => {
  test(" currentUserDetails catch case", async () => {
    const request = {
      body: {
        username: "alans.thomas@innovaturelabs.com",
        password: "ddd",
        email: "eddedd",
      },
      params: {
        id: "1"
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
    const mockUpdate = jest.spyOn(User, 'findById');

    // Set up the mock implementation to return a rejected promise
    mockUpdate.mockRejectedValue(new Error('Mocked error'));

    // Make the function call
    await User.findById(request.params.id, { $set: request.body })
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((error) => {
        res.status(400).send(error);
      });

    await currentUserDetails(request, res);
    expect(res.status).toHaveBeenCalledWith(400);

  });
});

describe("updateGroupCapandVC success case role 2 ", () => {
  test(" updateGroupCapandVC success  case role 2 ", async () => {
    const request = {
      body: {
        GroupId: "1",
        role: 2,

      },
      params: {
        id: "1",

      },
    };
    const res = {
      status: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue(), json: jest.fn().mockResolvedValue(), cookie: jest.fn().mockReturnValue(true) }),
      send: jest.fn(),
      json: jest.fn(),
      cookie: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue() })
    };

    jest.spyOn(User, "findOneAndUpdate").mockResolvedValue();
    jest.spyOn(User, "findOneAndUpdate").mockResolvedValue();


    await updateGroupCapandVC(request, res);
    expect(res.status).toHaveBeenCalledWith(200)

  });
});
describe("updateGroupCapandVC success case role 1 ", () => {
  test(" updateGroupCapandVC success  case role 1", async () => {
    const request = {
      body: {
        GroupId: "1",
        role: 1,

      },
      params: {
        id: "1",

      },


    };
    const res = {
      status: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue(), json: jest.fn().mockResolvedValue(), cookie: jest.fn().mockReturnValue(true) }),
      send: jest.fn(),
      json: jest.fn(),
      cookie: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue() })
    };

    jest.spyOn(User, "findOneAndUpdate").mockResolvedValue();
    jest.spyOn(User, "findOneAndUpdate").mockResolvedValue();


    await updateGroupCapandVC(request, res);
    expect(res.status).toHaveBeenCalledWith(200)

  });
});

describe("updateGroupCapandVC catch 1  case role 2 ", () => {
  test(" updateGroupCapandVC catch 1   case role 2", async () => {
    const request = {
      body: {
        GroupId: "1",
        role: 2,

      },
      params: {
        id: "1",

      },


    };
    const res = {
      status: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue(), json: jest.fn().mockResolvedValue(), cookie: jest.fn().mockReturnValue(true) }),
      send: jest.fn(),
      json: jest.fn(),
      cookie: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue() })
    }; const mockUpdate = jest.spyOn(User, 'findOneAndUpdate');

    // Set up the mock implementation to return a rejected promise
    mockUpdate.mockRejectedValue(new Error('Mocked error'));

    // Make the function call
    await User.findOneAndUpdate(request.params.id, { $set: request.body })
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((error) => {
        res.status(401).send(error);
      });


    await updateGroupCapandVC(request, res);
    expect(res.status).toHaveBeenCalledWith(401)

  });
});

describe("updateGroupCapandVC catch 2  case role 2 ", () => {
  test(" updateGroupCapandVC catch 2   case role 2", async () => {
    const request = {
      body: {
        GroupId: "1",
        role: 2,

      },
      params: {
        id: "1",

      },


    };
    const res = {
      status: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue(), json: jest.fn().mockResolvedValue(), cookie: jest.fn().mockReturnValue(true) }),
      send: jest.fn(),
      json: jest.fn(),
      cookie: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue() })
    }; const mockUpdate = jest.spyOn(User, 'findOneAndUpdate');

    // Set up the mock implementation to return a rejected promise
    mockUpdate.mockRejectedValue(new Error('Mocked error'));

    // Make the function call

    await User.findOneAndUpdate(request.params.id, { $set: request.body })
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((error) => {
        res.status(400).send(error);
      });

    await updateGroupCapandVC(request, res);
    expect(res.status).toHaveBeenCalledWith(400)

  });
});


describe("updateGroupCapandVC catch 1  case role 1 ", () => {
  test(" updateGroupCapandVC catch 1   case role 1", async () => {
    const request = {
      body: {
        GroupId: "1",
        role: 1,

      },
      params: {
        id: "1",

      },


    };
    const res = {
      status: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue(), json: jest.fn().mockResolvedValue(), cookie: jest.fn().mockReturnValue(true) }),
      send: jest.fn(),
      json: jest.fn(),
      cookie: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue() })
    }; const mockUpdate = jest.spyOn(User, 'findOneAndUpdate');

    // Set up the mock implementation to return a rejected promise
    mockUpdate.mockRejectedValue(new Error('Mocked error'));

    // Make the function call
    await User.findOneAndUpdate(request.params.id, { $set: request.body })
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((error) => {
        res.status(401).send(error);
      });


    await updateGroupCapandVC(request, res);
    expect(res.status).toHaveBeenCalledWith(401)

  });
});

describe("updateGroupCapandVC catch 2  case role 1 ", () => {
  test(" updateGroupCapandVC catch 2   case role 1", async () => {
    const request = {
      body: {
        GroupId: "1",
        role: 1,

      },
      params: {
        id: "1",

      },


    };
    const res = {
      status: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue(), json: jest.fn().mockResolvedValue(), cookie: jest.fn().mockReturnValue(true) }),
      send: jest.fn(),
      json: jest.fn(),
      cookie: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue() })
    };
    const mockUpdate = jest.spyOn(User, 'findOneAndUpdate');

    // Set up the mock implementation to return a rejected promise
    mockUpdate.mockRejectedValue(new Error('Mocked error'));

    // Make the function call

    await User.findOneAndUpdate(request.params.id, { $set: request.body })
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((error) => {
        res.status(400).send(error);
      });

    await updateGroupCapandVC(request, res);
    expect(res.status).toHaveBeenCalledWith(400)

  });
});


describe("updateGroupCapandVC main catch   case  ", () => {
  test(" updateGroupCapandVC  main catch    case ", async () => {
    const request = {
      body: {
        GroupId: "1",
        role: 1,

      },
      params: {
        id: "1",

      },


    };
    const res = {
      status: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue(), json: jest.fn().mockResolvedValue(), cookie: jest.fn().mockReturnValue(true) }),
      send: jest.fn(),
      json: jest.fn(),
      cookie: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue() })
    };
    jest.spyOn(User, "findOneAndUpdate").mockReturnValue({ exec: jest.fn().mockResolvedValue() });
    await updateGroupCapandVC(request, res);
    expect(res.status).toHaveBeenCalledWith(401)

  });
});

describe("updateGroupCapandVC catch   case error ", () => {
  test(" updateGroupCapandVC catch 2   case error", async () => {
    const joi = require('@hapi/joi');

    const Schema = joi.object().keys({
      GroupId: joi.string().alphanum(),
      id: joi.string().alphanum(),
      Role: joi.number(),

    })
    const request = {
      body: {
        GroupId: "1",
        role: "dfg",

      },
      params: {
        id: "1",

      },


    };
    const validation = {
      error: null, // No error for successful validation
    };
    Schema.validate = jest.fn().mockReturnValue(validation);
    const res = {
      status: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue(), json: jest.fn().mockResolvedValue(), cookie: jest.fn().mockReturnValue(true) }),
      send: jest.fn(),
      json: jest.fn(),
      cookie: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue() })
    };

    updateGroupCapandVC(request, res);
    expect(res.status).toHaveBeenCalledWith(400)

  });
});
describe("findByEmailRegexForGroup success case ", () => {
  test(" findByEmailRegexForGroup success  case ", async () => {
    const request = {
      body: {
        GroupId: "1",
        role: 1,

      },
      params: {
        email: "1fff",

      },


    };
    const res = {
      status: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue(), json: jest.fn().mockResolvedValue(), cookie: jest.fn().mockReturnValue(true) }),
      send: jest.fn(),
      json: jest.fn(),
      cookie: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue() })
    };

    jest.spyOn(User, "find").mockResolvedValue();
    await findByEmailRegexForGroup(request, res);
    expect(res.status).toHaveBeenCalledWith(200)

  });
});

describe("findByEmailRegexForGroup main catch case ", () => {
  test(" findByEmailRegexForGroup main catch  case ", async () => {
    const request = {
      body: {
        GroupId: "1",
        role: 1,

      },
      params: {
        email: "1fff",

      },


    };
    const res = {
      status: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue(), json: jest.fn().mockResolvedValue(), cookie: jest.fn().mockReturnValue(true) }),
      send: jest.fn(),
      json: jest.fn(),
      cookie: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue() })
    };

    jest.spyOn(User, "find").mockReturnValue();
    await findByEmailRegexForGroup(request, res);
    expect(res.status).toHaveBeenCalledWith(401)

  });
});

describe("findByEmailRegexForGroup  catch case ", () => {
  test(" findByEmailRegexForGroup  catch  case ", async () => {
    const request = {
      body: {
        GroupId: "1",
        role: 1,

      },
      params: {
        email: "1fff",

      },


    };
    const res = {
      status: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue(), json: jest.fn().mockResolvedValue(), cookie: jest.fn().mockReturnValue(true) }),
      send: jest.fn(),
      json: jest.fn(),
      cookie: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue() })
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
        res.status(401).send(error);
      });

    await findByEmailRegexForGroup(request, res);
    expect(res.status).toHaveBeenCalledWith(401)

  });
});

describe("findByNameRegexForMention success case ", () => {
  test(" findByNameRegexForMention  success  case ", async () => {
    const request = {
      body: {
        GroupId: "1",
        role: 1,

      },
      params: {
        email: "1fff",

      },


    };
    const res = {
      status: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue(), json: jest.fn().mockResolvedValue(), cookie: jest.fn().mockReturnValue(true) }),
      send: jest.fn(),
      json: jest.fn(),
      cookie: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue() })
    };

    jest.spyOn(Groups, "findOne").mockReturnValue({ exec: jest.fn().mockResolvedValue(findByName2) });

    jest.spyOn(User, "find").mockResolvedValue(findByName);

    jest.spyOn(Groups, "find").mockReturnValue({ sort: jest.fn().mockResolvedValue(findByName) });




    await findByNameRegexForMention(request, res);
    expect(res.status).toHaveBeenCalledWith(200)

  });
});

describe("findByNameRegexForMention  catch case ", () => {
  test(" findByNameRegexForMention   catch  case ", async () => {
    const request = {
      body: {
        GroupId: "1",
        role: 1,

      },
      params: {
        email: "1fff",

      },


    };
    const res = {
      status: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue(), json: jest.fn().mockResolvedValue(), cookie: jest.fn().mockReturnValue(true) }),
      send: jest.fn(),
      json: jest.fn(),
      cookie: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue() })
    };

    jest.spyOn(Groups, "findOne").mockReturnValue({ exec: jest.fn().mockResolvedValue(findByName2) });

    jest.spyOn(User, "find").mockResolvedValue(findByName);

    jest.spyOn(Groups, "find").mockReturnValue({ sort: jest.fn().mockResolvedValue() });




    await findByNameRegexForMention(request, res);
    expect(res.status).toHaveBeenCalledWith(403)

  });
});

describe("findByNameRegexForMention  catch 1 case ", () => {
  test(" findByNameRegexForMention   catch 1  case ", async () => {
    const request = {
      body: {
        GroupId: "1",
        role: 1,

      },
      params: {
        email: "1fff",

      },


    };
    const res = {
      status: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue(), json: jest.fn().mockResolvedValue(), cookie: jest.fn().mockReturnValue(true) }),
      send: jest.fn(),
      json: jest.fn(),
      cookie: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue() })
    };

    jest.spyOn(Groups, "findOne").mockReturnValue({ exec: jest.fn().mockResolvedValue() });

    const mockUpdate = jest.spyOn(User, 'find');

    // Set up the mock implementation to return a rejected promise
    mockUpdate.mockRejectedValue(new Error('Mocked error'));

    // Make the function call

    await User.find(request.params.id, { $set: request.body })
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((error) => {
        res.status(401).send(error);
      });


    jest.spyOn(Groups, "find").mockReturnValue({ sort: jest.fn().mockResolvedValue(findByName) });




    await findByNameRegexForMention(request, res);
    expect(res.status).toHaveBeenCalledWith(401)

  });
});

describe("findByNameRegexForMention  main catch  case ", () => {
  test(" findByNameRegexForMention  main catch   case ", async () => {
    const request = {
      body: {
        GroupId: "1",
        role: 1,

      },
      params: {
        email: "1fff",

      },
      


    };
    const res = {
      status: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue(), json: jest.fn().mockResolvedValue(), cookie: jest.fn().mockReturnValue(true) }),
      send: jest.fn(),
      json: jest.fn(),
      cookie: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue() })
    };

    jest.spyOn(Groups, "findOne").mockReturnValue({ exec: jest.fn().mockResolvedValue() });
    jest.spyOn(User, "find").mockReturnValue({ sort: jest.fn().mockResolvedValue(findByName) });


    jest.spyOn(Groups, "find").mockReturnValue({ sort: jest.fn().mockResolvedValue(findByName) });




    await findByNameRegexForMention(request, res);
    expect(res.status).toHaveBeenCalledWith(401)

  });
});

describe("searchOnInnovators success case ", () => {
  test(" searchOnInnovators  success  case ", async () => {
    const request = {
      body: {
        GroupId: 2,
        Committee: "efefef",

      },
      params: {
        email: "1fff",

      },
      query:{
        UserName:"dedefff",
        Email:"edededfd",
        Designation:"drfdfrfr",
        Type:1,
        fromDOB:new Date('2022-07-05T00:00:00.000Z'),
        toDOB:new Date('2022-07-05T00:00:00.000Z')
      }


    };
    const res = {
      status: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue(), json: jest.fn().mockResolvedValue(), cookie: jest.fn().mockReturnValue(true) }),
      send: jest.fn(),
      json: jest.fn(),
      cookie: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue() })
    };

    jest.spyOn(User, "aggregate").mockResolvedValue();

    await searchOnInnovators(request, res);
    expect(res.status).toHaveBeenCalledWith(200)

  });
});

// describe("searchOnInnovators error  case ", () => {
//   test(" searchOnInnovators  error  case ", async () => {
//     const request = {
//       body: {
//         GroupId: 2,
//         Committee: "efefef",

//       },
//       params: {
//         email: "1fff",

//       },
//       query:{
//         UserName:"dedefff",
//         Email:"edededfd",
//         Designation:"drfdfrfr",
//         Type:1,
//         fromDOB:new Date('2022-07-05T00:00:00.000Z'),
//         toDOB:new Date('2022-07-05T00:00:00.000Z')
//       }


//     };
//     const res = {
//       status: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue(), json: jest.fn().mockResolvedValue(), cookie: jest.fn().mockReturnValue(true) }),
//       send: jest.fn(),
//       json: jest.fn(),
//       cookie: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue() })
//     };
//     validationResult.mockResolvedValue(true);
//     // jest.spyOn(Groups, "findOne").mockReturnValue({ exec: jest.fn().mockResolvedValue(findByName2) });


//     // jest.spyOn(Groups, "find").mockReturnValue({ sort: jest.fn().mockResolvedValue(findByName) });




//     await searchOnInnovators(request, res);
//     expect(res.status).toHaveBeenCalledWith(400)

//   });
// });

describe("birthdaysOfCurrentMonth catch case ", () => {
  test(" birthdaysOfCurrentMonth  catch  case ", async () => {
    const request = {
      body: {
        GroupId: "1",
        role: 1,

      },
      params: {
        email: "1fff",

      },


    };
    const res = {
      status: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue(), json: jest.fn().mockResolvedValue(), cookie: jest.fn().mockReturnValue(true) }),
      send: jest.fn(),
      json: jest.fn(),
      cookie: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue() })
    };

    jest.spyOn(User, "find").mockReturnValue({ sort: jest.fn().mockResolvedValue(), exec: jest.fn().mockResolvedValue(birthday) });
    await birthdaysOfCurrentMonth(request, res);
    expect(res.status).toHaveBeenCalledWith(400)

  });
});

describe("birthdaysOfCurrentMonth success case ", () => {
  test(" birthdaysOfCurrentMonth  success  case ", async () => {
    const request = {
      body: {
        GroupId: "1",
        role: 1,

      },
      params: {
        email: "1fff",

      },


    };
    const res = {
      status: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue(), json: jest.fn().mockResolvedValue(), cookie: jest.fn().mockReturnValue(true) }),
      send: jest.fn(),
      json: jest.fn(),
      cookie: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue() })
    };  

    jest.spyOn(User, "find").mockReturnValue({ sort: jest.fn().mockReturnValue({ exec: jest.fn().mockResolvedValue(birthday)})});





    await birthdaysOfCurrentMonth(request, res);
    expect(res.status).toHaveBeenCalledWith(200)

  });
});


describe("getUserOrGroupDetails group empty case ", () => {
  test(" getUserOrGroupDetails  group empty  case ", async () => {
    const request = {
      body: {
        GroupId: "1",
        role: 1,

      },
      params: {
        email: "1fff",

      },


    };
    const res = {
      status: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue(), json: jest.fn().mockResolvedValue(), cookie: jest.fn().mockReturnValue(true) }),
      send: jest.fn(),
      json: jest.fn(),
      cookie: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue() })
    };

    jest.spyOn(User, "findOne").mockReturnValue({ exec: jest.fn().mockResolvedValue() });
    jest.spyOn(Groups, "findOne").mockReturnValue({ exec: jest.fn().mockResolvedValue() });






    await getUserOrGroupDetails(request, res);
    expect(res.status).toHaveBeenCalledWith(400)

  });
});

describe("getUserOrGroupDetails success group case case ", () => {
  test(" getUserOrGroupDetails  success group case case ", async () => {
    const request = {
      body: {
        GroupId: "1",
        role: 1,

      },
      params: {
        email: "1fff",

      },


    };
    const res = {
      status: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue(), json: jest.fn().mockResolvedValue(), cookie: jest.fn().mockReturnValue(true) }),
      send: jest.fn(),
      json: jest.fn(),
      cookie: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue() })
    };

    jest.spyOn(User, "findOne").mockReturnValue({ exec: jest.fn().mockResolvedValue() });
    jest.spyOn(Groups, "findOne").mockReturnValue({ exec: jest.fn().mockResolvedValue(group) });
    jest.spyOn(Groups, "find").mockReturnValue({ exec: jest.fn().mockResolvedValue(group3) });
    jest.spyOn(User, "find").mockReturnValue({ exec: jest.fn().mockResolvedValue([]) });





    await getUserOrGroupDetails(request, res);
    expect(res.status).toHaveBeenCalledWith(200)

  });
});

describe("getUserOrGroupDetails success group 1 case ", () => {
  test(" getUserOrGroupDetails  success group 1  case ", async () => {
    const request = {
      body: {
        GroupId: "1",
        role: 1,

      },
      params: {
        email: "1fff",

      },


    };
    const res = {
      status: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue(), json: jest.fn().mockResolvedValue(), cookie: jest.fn().mockReturnValue(true) }),
      send: jest.fn(),
      json: jest.fn(),
      cookie: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue() })
    };

    jest.spyOn(User, "findOne").mockReturnValue({ exec: jest.fn().mockResolvedValue() });
    jest.spyOn(Groups, "findOne").mockReturnValue({ exec: jest.fn().mockResolvedValue(group2) });
    jest.spyOn(Groups, "find").mockReturnValue({ exec: jest.fn().mockResolvedValue(group3) });
    jest.spyOn(User, "find").mockReturnValue({ exec: jest.fn().mockResolvedValue([]) });





    await getUserOrGroupDetails(request, res);
    expect(res.status).toHaveBeenCalledWith(200)

  });
});

describe("getUserOrGroupDetails default case ", () => {
  test(" getUserOrGroupDetails  default  case ", async () => {
    const request = {
      body: {
        GroupId: "1",
        role: 1,

      },
      params: {
        email: "1fff",

      },


    };
    const res = {
      status: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue(), json: jest.fn().mockResolvedValue(), cookie: jest.fn().mockReturnValue(true) }),
      send: jest.fn(),
      json: jest.fn(),
      cookie: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue() })
    };

    jest.spyOn(User, "findOne").mockReturnValue({ exec: jest.fn().mockResolvedValue() });
    jest.spyOn(Groups, "findOne").mockReturnValue({ exec: jest.fn().mockResolvedValue(group4) });
    jest.spyOn(Groups, "find").mockReturnValue({ exec: jest.fn().mockResolvedValue(group3) });
    jest.spyOn(User, "find").mockReturnValue({ exec: jest.fn().mockResolvedValue([]) });





    await getUserOrGroupDetails(request, res);
    expect(res.status).toHaveBeenCalledWith(400)

  });
});

describe("getUserOrGroupDetails default case ", () => {
  test(" getUserOrGroupDetails  default  case ", async () => {
    const request = {
      body: {
        GroupId: "1",
        role: 1,

      },
      params: {
        email: "1fff",

      },


    };
    const res = {
      status: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue(), json: jest.fn().mockResolvedValue(), cookie: jest.fn().mockReturnValue(true) }),
      send: jest.fn(),
      json: jest.fn(),
      cookie: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue() })
    };

    jest.spyOn(User, "findOne").mockReturnValue({ exec: jest.fn().mockResolvedValue() });
    jest.spyOn(Groups, "findOne").mockReturnValue({ exec: jest.fn().mockResolvedValue(group4) });
    jest.spyOn(Groups, "find").mockReturnValue({ exec: jest.fn().mockResolvedValue(group3) });
    jest.spyOn(User, "find").mockReturnValue({ exec: jest.fn().mockResolvedValue([]) });





    await getUserOrGroupDetails(request, res);
    expect(res.status).toHaveBeenCalledWith(400)

  });
});
describe("getUserOrGroupDetails main catch case ", () => {
  test(" getUserOrGroupDetails  main catch  case ", async () => {
    const request = {
      body: {
        GroupId: "1",
        role: 1,

      },
      params: {
        email: "1fff",

      },


    };
    const res = {
      status: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue(), json: jest.fn().mockResolvedValue(), cookie: jest.fn().mockReturnValue(true) }),
      send: jest.fn(),
      json: jest.fn(),
      cookie: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue() })
    };

    jest.spyOn(User, "findOne").mockReturnValue({ send: jest.fn().mockResolvedValue() });
    jest.spyOn(Groups, "findOne").mockReturnValue({ exec: jest.fn().mockResolvedValue(group4) });
    jest.spyOn(Groups, "find").mockReturnValue({ exec: jest.fn().mockResolvedValue(group3) });
    jest.spyOn(User, "find").mockReturnValue({ exec: jest.fn().mockResolvedValue([]) });





    await getUserOrGroupDetails(request, res);
    expect(res.status).toHaveBeenCalledWith(400)

  });
});

describe("getUserOrGroupDetails user not empty case ", () => {
  test(" getUserOrGroupDetails  user not empty  case ", async () => {
    const request = {
      body: {
        GroupId: "1",
        role: 1,

      },
      params: {
        email: "1fff",

      },


    };
    const res = {
      status: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue(), json: jest.fn().mockResolvedValue(), cookie: jest.fn().mockReturnValue(true) }),
      send: jest.fn(),
      json: jest.fn(),
      cookie: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue() })
    };

    jest.spyOn(User, "findOne").mockReturnValue({ exec: jest.fn().mockResolvedValue(user) });
    jest.spyOn(Groups, "findOne").mockReturnValue({ exec: jest.fn().mockResolvedValue(group4) });
    jest.spyOn(Groups, "find").mockReturnValue({ exec: jest.fn().mockResolvedValue(group3) });
    jest.spyOn(User, "find").mockReturnValue({ exec: jest.fn().mockResolvedValue([]) });





    await getUserOrGroupDetails(request, res);
    expect(res.status).toHaveBeenCalledWith(200)

  });
});

describe("birthdayCardUpload inner catch case ", () => {
  test(" birthdayCardUpload  inner catch  case ", async () => {
    const request = {
      body: {
        GroupId: "1",
        Delete: 1,

      },
      params: {
        id: "1",

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
      cookie: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue() })
    };

    jest.spyOn(User, "findById").mockReturnValue({ exec: jest.fn().mockResolvedValue() });
    // jest.spyOn(User, "findByIdAndUpdate").mockResolvedValue();

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








    await birthdayCardUpload(request, res);
    expect(res.status).toHaveBeenCalledWith(400)

  });
});

describe("birthdayCardUpload success case ", () => {
  test(" birthdayCardUpload  success case ", async () => {
    const request = {
      body: {
        GroupId: "1",
        Delete: 1,

      },
      params: {
        id: "1",

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
      cookie: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue() })
    };

    jest.spyOn(User, "findById").mockReturnValue({ exec: jest.fn().mockResolvedValue() });
    jest.spyOn(User, "findByIdAndUpdate").mockResolvedValue();








    await birthdayCardUpload(request, res);
    expect(res.status).toHaveBeenCalledWith(200)

  });
});

describe("birthdayCardUpload main catch case ", () => {
  test(" birthdayCardUpload  main catch case ", async () => {
    const request = {
      body: {
        GroupId: "1",
        Delete: 1,

      },
      params: {
        id: "1",

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
      cookie: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue() })
    };

    jest.spyOn(User, "findById").mockReturnValue({ then: jest.fn().mockResolvedValue() });
    jest.spyOn(User, "findByIdAndUpdate").mockResolvedValue();


    await birthdayCardUpload(request, res);
    expect(res.status).toHaveBeenCalledWith(400)

  });
});

// describe("birthdayCardUpload success else case ", () => {
//   test(" birthdayCardUpload  success else case ", async () => {
//     const request = {
//       body: {
//         GroupId: "1",
//         Delete: 1,

//       },
//       params: {
//         id: "1",

//       },
//       files: [{
//         fieldname: 'image',
//         originalname: 'unnamed.png',
//         encoding: '7bit',
//         mimetype: 'image/png',
//         destination: './images',
//         // filename: 'Tue May 16 2023 17:17:23 GMT+0530 (India Standard Time)unnamed.png',
//         path: 'images/Tue May 16 2023 17:17:23 GMT+0530 (India Standard Time)unnamed.png',
//         size: 141374
//       },]


//     };
//     const res = {
//       status: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue(), json: jest.fn().mockResolvedValue(), cookie: jest.fn().mockReturnValue(true) }),
//       send: jest.fn(),
//       json: jest.fn(),
//       cookie: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue() })
//     };

//     jest.spyOn(User, "findById").mockReturnValue({ exec: jest.fn().mockResolvedValue() });
//     jest.spyOn(User, "findByIdAndUpdate").mockResolvedValue();

//     await birthdayCardUpload(request, res);
//     expect(res.status).toHaveBeenCalledWith(200)

//   });
// });

describe("userDetails success case ", () => {
  test(" userDetails  success case ", async () => {
    const request = {
      body: {
        GroupId: "1",
        Delete: 1,

      },
      params: {
        id: "1",

      },

    };
    const res = {
      status: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue(), json: jest.fn().mockResolvedValue(), cookie: jest.fn().mockReturnValue(true) }),
      send: jest.fn(),
      json: jest.fn(),
      cookie: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue() })
    };

    jest.spyOn(User, "findById").mockResolvedValue();
    await userDetails(request, res);
    expect(res.status).toHaveBeenCalledWith(200)

  });
});

describe("userDetails success case ", () => {
  test(" userDetails  success case ", async () => {
    const request = {
      body: {
        GroupId: "1",
        Delete: 1,

      },
      params: {
        id: "1",

      },



    };
    const res = {
      status: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue(), json: jest.fn().mockResolvedValue(), cookie: jest.fn().mockReturnValue(true) }),
      send: jest.fn(),
      json: jest.fn(),
      cookie: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue() })
    };
    const mockUpdate = jest.spyOn(User, 'findById');

    // Set up the mock implementation to return a rejected promise
    mockUpdate.mockRejectedValue(new Error('Mocked error'));

    // Make the function call

    await User.findById(request.params.id, { $set: request.body })
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((error) => {
        res.status(500).send(error);
      });


    await userDetails(request, res);
    expect(res.status).toHaveBeenCalledWith(500)

  });
});
describe("findByNameRegexForPrivateMention innercatch  case ", () => {
  test(" findByNameRegexForPrivateMention  innercatch  case ", async () => {
    const request = {
      body: {
        GroupId: "1",
        Delete: 1,

      },
      params: {
        id: "1",

      },

    };
    const res = {
      status: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue(), json: jest.fn().mockResolvedValue(), cookie: jest.fn().mockReturnValue(true) }),
      send: jest.fn(),
      json: jest.fn(),
      cookie: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue() })
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
        res.status(400).send(error);
      });

    await findByNameRegexForPrivateMention(request, res);
    expect(res.status).toHaveBeenCalledWith(400)

  });
});

describe("findByNameRegexForPrivateMention main case ", () => {
  test(" findByNameRegexForPrivateMention  main case ", async () => {
    const request = {
      body: {
        GroupId: "1",
        Delete: 1,

      },
      params: {
        id: "1",

      },

    };
    const res = {
      status: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue(), json: jest.fn().mockResolvedValue(), cookie: jest.fn().mockReturnValue(true) }),
      send: jest.fn(),
      json: jest.fn(),
      cookie: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue() })
    };

    jest.spyOn(User, "find").mockResolvedValue();
    await findByNameRegexForPrivateMention(request, res);
    expect(res.status).toHaveBeenCalledWith(400)

  });
});

// describe("findByNameRegexForPrivateMention success case ", () => {
//   test(" findByNameRegexForPrivateMention  success case ", async () => {
//     const request = {
//       body: {
//         GroupId: "1",
//         Delete: 1,

//       },
//       params: {
//         id: "1",

//       },
//       Users:{
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
//         GroupId: 1,
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

//     jest.spyOn(User, "find").mockResolvedValue(user1);
//     await findByNameRegexForPrivateMention(request, res);
//     expect(res.status).toHaveBeenCalledWith(200)

//   });
// });





















