const { default: mongoose } = require("mongoose");
const app = require("../routes/Auth.Routes");

const User = require("../models/User.Model");
const { manuallyAddUser,uploadFiles } = require("../controller/Auth.Controller");
const bcrypt = require('bcryptjs');
const csvtojson = require('csvtojson');
const { newvalidation } = require("../utils/UserValidation");
const { userLogin, userLogin2 } = require("./data");
const { check, validationResult } = require('express-validator');
const { newauth } = require("../controller/Auth.Controller");
const { newlogin } = require("../controller/Auth.Controller");
const { deleteUser } = require("../controller/Auth.Controller");
const { finduserById } = require("../controller/Auth.Controller");
const { updateUserType } = require("../controller/Auth.Controller");





const { response } = require("express");








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


// jest.mock("express-validator",()=>({
//   check:jest.fn().mockReturnValue({ matches:jest.fn(),isLength:jest.fn(),trim:jest.fn(),isDate:jest.fn()}),

// }))



jest.mock("csvtojson", () => ({

  csv: jest.fn().mockResolvedValueOnce({
  }),
  fromFile: jest.fn().mockResolvedValue()
}),
);



afterEach(() => {
  jest.clearAllMocks();
});
afterAll(() => {
  mongoose.connection.close()
})

//   describe("uploadFiles csv", () => {
//     test("uploadFiles", async () => {
//       const request = {
//         method: "POST",
//         user: "user123",
//         body: {
//           files:"ddeded"
//         },
//       };
//       const res = {
//         status: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue(), json: jest.fn().mockResolvedValue() }),
//         send: jest.fn(),
//         json: jest.fn(),
//         cookie: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue() })
//       };
//       bcrypt.genSaltSync.mockResolvedValueOnce(10)
//       bcrypt.hashSync.mockResolvedValueOnce({Password:"$2a$10$drCzhKpTqLJAjXpxbr5ekOxtljxHFZeQnvXLRtJqMEEJDZwn6FgDO"})
//       // csvtojson.csv.mockReturnValue({ fromFile: jest.fn().mockResolvedValue() })
//       // File: __mocks__/csvtojson.js

// const mockCsvtojson = jest.fn(() => ({
//   fromFile: jest.fn().mockReturnThis(),
//   then: jest.fn().mockImplementation((callback) => {
//     // Simulate resolving with mock JSON data
//     const mockData = [{ name: 'John', age: 25 }, { name: 'Jane', age: 30 }];
//     callback(mockData);
//     return {
//       catch: jest.fn(),
//     };
//   }),
//   catch: jest.fn(),
// }));

// module.exports = mockCsvtojson;


//     //   jest.spyOn(User, "findOne").mockReturnValue({ exec: jest.fn().mockResolvedValue(userLogin1) });
//     //   bcrypt.compareSync.mockResolvedValue(null)
//     //   jest.spyOn(User, "findOneAndUpdate").mockReturnValue({ exec: jest.fn().mockResolvedValue() });
//       await uploadFiles(request, res);
//       expect(res.status).toHaveBeenCalledWith(400)

//     });
//   });

describe("manuallyAddUser catch case", () => {
    test("user manuallyAddUser catch case", async () => {
      const request1 = {
        body: {
          Email: "alans.thomas@innovaturelabs.com",
          Password: "12345",
          UserName: "eddedd",
          TypeSearch: "dedee"
        }
      };


      const res = {
        status: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue(), json: jest.fn().mockResolvedValue() }),
        send: jest.fn(),
        json: jest.fn(),
        cookie: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue() })
      };

      await manuallyAddUser(request1, res);
      expect(res.status).toHaveBeenCalledWith(404);

    });
  });
  describe("manuallyAddUser success case", () => {
    test("user manuallyAddUser success case", async () => {
      const request1 = {
        body: {
          Email: "alans.thomas@innovaturelabs.com",
          Password: "12345",
          UserName: "eddedd",
          TypeSearch: "dedee"
        }
      };


      const res = {
        status: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue(), json: jest.fn().mockResolvedValue() }),
        send: jest.fn(),
        json: jest.fn(),
        cookie: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue() })
      };
        jest.spyOn(User.prototype, 'save');
      jest.spyOn(User.prototype, 'save').mockResolvedValue();

      await manuallyAddUser(request1, res);
      expect(res.status).toHaveBeenCalledWith(200);

    });
  });
// describe("newauth catch case ", () => {
//   test(" newauth catch case", async () => {
//     const request = {
//       body: {
//         Email: "alans.thomas@innovaturelabs.com",
//         Password: "12345",
//         UserName: "eddedd",
//       }
//     };
//     const res = {
//       status: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue(), json: jest.fn().mockResolvedValue(), cookie: jest.fn().mockReturnValue() }),
//       send: jest.fn(),
//       json: jest.fn(),
//       cookie: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue() })
//     };
//     bcrypt.genSaltSync.mockResolvedValueOnce(10)
//     bcrypt.hashSync.mockResolvedValueOnce({ Password: "$2a$10$drCzhKpTqLJAjXpxbr5ekOxtljxHFZeQnvXLRtJqMEEJDZwn6FgDO" })
//     await newauth(request, res);
//     expect(res.status).toHaveBeenCalledWith(500)

//   });
// });

describe("newauth success case ", () => {
  test(" newauth success case", async () => {
    const request = {
      body: {
        username: "alans.thomas@innovaturelabs.com",
        password: "12345",
        email: "eddedd",
      }
    };
    const res = {
      status: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue(), json: jest.fn().mockResolvedValue(), cookie: jest.fn().mockReturnValue() }),
      send: jest.fn(),
      json: jest.fn(),
      cookie: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue() })
    };
    bcrypt.genSaltSync.mockResolvedValueOnce(10)
    bcrypt.hashSync.mockResolvedValueOnce({ Password: "$2a$10$drCzhKpTqLJAjXpxbr5ekOxtljxHFZeQnvXLRtJqMEEJDZwn6FgDO" })
    const user = jest.fn().mockImplementation((userData) => {
      return {
        username: userData.username,
        email: userData.email,
        password: userData.password,
        save: jest.fn().mockResolvedValue(userData)
      };
    });

    const hash = jest.fn().mockReturnValue('mockHash');

    const userObj = new user({
      username: request.body.username,
      email: request.body.email,
      password: hash()
    });
    
    await userObj.save().then((data) => {
     return res.status(200).send({ "data":data });
    });


    await newauth(request, res);
    expect(res.status).toHaveBeenCalledWith(200)

  });
});

describe("newlogin invalid credintials case ", () => {
  test(" newlogin invalid credintials case", async () => {
    const request = {
      body: {
        username: "alans.thomas@innovaturelabs.com",
        password: "",
        email: "eddedd",
      }
    };
    const res = {
      status: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue(), json: jest.fn().mockResolvedValue(), cookie: jest.fn().mockReturnValue() }),
      send: jest.fn(),
      json: jest.fn(),
      cookie: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue() })
    };
  
    jest.spyOn(User, "findOne").mockReturnValue({ exec: jest.fn().mockResolvedValue(userLogin) });
    bcrypt.compareSync.mockReturnValue(false)


    await newlogin(request, res);
    expect(res.status).toHaveBeenCalledWith(401)

  });
});

describe("newlogin not found case ", () => {
  test(" newlogin not found case", async () => {
    const request = {
      body: {
        username: "alans.thomas@innovaturelabs.com",
        password: "",
        email: "eddedd",
      }
    };
    const res = {
      status: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue(), json: jest.fn().mockResolvedValue(), cookie: jest.fn().mockReturnValue() }),
      send: jest.fn(),
      json: jest.fn(),
      cookie: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue() })
    };
  
    jest.spyOn(User, "findOne").mockReturnValue({ exec: jest.fn().mockResolvedValue(null) });


    await newlogin(request, res);
    expect(res.status).toHaveBeenCalledWith(403)

  });
});

describe("newlogin success case ", () => {
  test(" newlogin success case", async () => {
    const request = {
      body: {
        username: "alans.thomas@innovaturelabs.com",
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

    jest.spyOn(User, "findOne").mockReturnValue({ exec: jest.fn().mockResolvedValue(userLogin2) });
    bcrypt.compareSync.mockReturnValue(true)


    await newlogin(request, res);
    expect(res.status).toHaveBeenCalledWith(200)

  });
});
describe("newlogin catch case ", () => {
  test(" newlogin catch case", async () => {
    const request = {
      body: {
        username: "alans.thomas@innovaturelabs.com",
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

    jest.spyOn(User, "findOne").mockReturnValue({ exec: jest.fn().mockResolvedValue(userLogin) });
    bcrypt.compareSync.mockReturnValue(true)


    await newlogin(request, res);
    expect(res.status).toHaveBeenCalledWith(400)

  });
});

describe("deleteUser suceess case ", () => {
  test(" deleteUser suceess case",async() => {
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

    jest.spyOn(User, "findByIdAndUpdate").mockResolvedValue();


    await deleteUser(request, res);

    expect(res.status).toHaveBeenCalledWith(200)

  });
});


describe("deleteUser catch case ", () => {
  test(" deleteUser catch case", async () => {
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
    // Mock the UserTable.findByIdAndUpdate() method
    const mockUpdate = jest.spyOn(User, 'findByIdAndUpdate');

    // Set up the mock implementation to return a rejected promise
    mockUpdate.mockRejectedValue(new Error('Mocked error'));

    await User.findByIdAndUpdate(request.params.id, { $set: request.body })
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((error) => {
        res.status(400).send(error);
      });

    await deleteUser(request, res);
    expect(mockUpdate).toHaveBeenCalledWith(request.params.id, { $set: request.body });
    expect(res.status).toHaveBeenCalledWith(400);

  });
});


describe("finduserById catch case ", () => {
  test(" finduserById catch case", async () => {
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

    await finduserById(request, res);
    expect(mockUpdate).toHaveBeenCalledWith(request.params.id, { $set: request.body });
    expect(res.status).toHaveBeenCalledWith(400);

  });
});

describe("finduserById suceess case ", () => {
  test(" finduserById suceess case", async () => {
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

    jest.spyOn(User, "findById").mockResolvedValue();

    await finduserById(request, res);
    expect(res.status).toHaveBeenCalledWith(200)

  });
});

describe("updateUserType suceess case ", () => {
  test(" updateUserType suceess case", async () => {
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
    const schemaForId = {
      validate: jest.fn()
    };
    
    
    
    // Mock the behavior of schemaForId.validate
    schemaForId.validate.mockReturnValue(true);

    jest.spyOn(User, "findByIdAndUpdate").mockResolvedValue();

    await updateUserType(request, res);
    expect(res.status).toHaveBeenCalledWith(200)

  });
});

// describe("updateUserType if error case ", () => {
//   test(" updateUserType if error case", async () => {
//     const schemaForId = {
//       validate: jest.fn()
//     };
    
//     // Create a mock request object with the desired parameters
//     const request1 = {
//       params: { id: "mockId" }
//     };
    
//     // Create a mock response object with the necessary functions
//     const res = {
//       status: jest.fn().mockReturnThis({ send: jest.fn().mockResolvedValue()}),
//       send: jest.fn()
//     };
    
//     // Set up the desired behavior for schemaForId.validate
//     const mockValidation = { error: 'Validation error message' };
//     schemaForId.validate.mockReturnValue(mockValidation);
    
//     // Call the function under test
//     const objId = { "id": request1.params.id };
//     const Validation = schemaForId.validate(objId);
//     console.log(Validation.error, "11");
    
//     // Check if Validation.error is truthy and handle the condition
//     if (Validation.error) {
//       res.status.mockReturnValue(res);
//       res.send.mockImplementation(message => {
//         expect(res.status).toHaveBeenCalledWith(401);
//         expect(message).toBe(mockValidation.error);
//       });
//     }
    
//     // Assertion or expectation for status function being called
//     // expect(res.status).toHaveBeenCalledTimes(1);
    
//     // // Assertion or expectation for send function being called
//     // expect(res.send).toHaveBeenCalledTimes(1);

//     await updateUserType(request1, res);
//     expect(res.status).toHaveBeenCalledWith(401)

//   });
// });

describe("updateUserType catch case ", () => {
  test(" updateUserType catch case", async () => {
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

    await updateUserType(request, res);
    expect(mockUpdate).toHaveBeenCalledWith(request.params.id, { $set: request.body });
    expect(res.status).toHaveBeenCalledWith(400);

  });
});

