const app = require("../routes/Auth.Routes");
const { default: mongoose } = require("mongoose");
const User = require("../models/User.Model");
const { newjwtlogin } = require("../controller/Jwtauth.Controller");
const bcrypt = require('bcryptjs');
const { userLogin, resultLogin, userLogin1 } = require("./data");
const jwt = require('jsonwebtoken');
const { refreshToken } = require("../controller/Jwtauth.Controller");
const { newjwtauth } = require("../controller/Jwtauth.Controller");
const { NewPassword } = require("../controller/Jwtauth.Controller");
const { NewCreatedPassword } = require("../controller/Jwtauth.Controller");
const { SendOtp } = require("../controller/Jwtauth.Controller");
const { ResetPassword } = require("../controller/Jwtauth.Controller");
const otpGenerator = require('otp-generator');
const nodemailer = require('nodemailer');







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
jest.mock("otp-generator",()=>({
  generate:jest.fn(),
}))

jest.mock('nodemailer', () => ({
  createTransport: jest.fn().mockReturnValueOnce({
    sendMail: jest.fn().mockResolvedValueOnce({
      response: 'Mail sent successfully',
    }),
  }),
}));



afterEach(() => {
  jest.clearAllMocks();
});
afterAll(() => {
  mongoose.connection.close()
})
describe("login user not exist", () => {
  test("user not exist", async () => {
    const request = {
      method: "POST",
      user: "user123",
      body: {
        email: "alans.thomas@innovaturelabs.com",
        password: "12345"
      },
    };
    const res = {
      status: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue(), json: jest.fn().mockResolvedValue() }),
      send: jest.fn(),
      json: jest.fn(),
      cookie: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue() })
    };

    jest.spyOn(User, "findOne").mockReturnValue({ exec: jest.fn().mockResolvedValue(userLogin1) });
    bcrypt.compareSync.mockResolvedValue(null)
    jest.spyOn(User, "findOneAndUpdate").mockReturnValue({ exec: jest.fn().mockResolvedValue() });
    await newjwtlogin(request, res);
    expect(res.status).toHaveBeenCalledWith(401)

  });
});

describe("login user Invalid credentials", () => {
  test("Invalid credentials", async () => {
    const request = {
      method: "POST",
      user: "user123",
      body: {
        email: "alans.thomas@innovaturelabs.com",
        password: "12345"
      },
    };
    const res = {
      status: jest.fn().mockReturnValue({
        send: jest.fn().mockResolvedValue(), json: jest.fn().mockReturnValue({
          Success: 0,
          Message: "Invalid credentials"
        })
      }),
      send: jest.fn(),
      json: jest.fn(),
      cookie: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue(resultLogin) })
    };

    jest.spyOn(User, "findOne").mockReturnValue({ exec: jest.fn().mockResolvedValue(userLogin) });
    bcrypt.compareSync.mockResolvedValue(null)
    jest.spyOn(User, "findOneAndUpdate").mockReturnValue({ exec: jest.fn().mockResolvedValue() });
    await newjwtlogin(request, res);
    expect(res.status).toHaveBeenCalledWith(401)
    expect(res.status().json).toHaveBeenCalledWith({
      Success: 0,
      Message: "Invalid credentials"
    })

  });
});

describe("login user success case", () => {
  test("user must login", async () => {
    const request = {
      method: "POST",
      user: "user123",
      body: {
        email: "alans.thomas@innovaturelabs.com",
        password: "12345"
      },
    };
    const res = {
      status: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue(), json: jest.fn().mockResolvedValue(), cookie: jest.fn().mockReturnValue() }),
      send: jest.fn(),
      json: jest.fn(),
      cookie: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue(resultLogin) })
    };

    jest.spyOn(User, "findOne").mockReturnValue({ exec: jest.fn().mockResolvedValue(userLogin) });
    bcrypt.compareSync.mockResolvedValue("jshdfkj")
    jest.spyOn(User, "findOneAndUpdate").mockReturnValue({ exec: jest.fn().mockResolvedValue() });
    await newjwtlogin(request, res);
    expect(res.status).toHaveBeenCalledWith(200);

  });
});

describe("login user catch error", () => {
  test(" catch error", async () => {
    const request = {
      method: "POST",
      user: "user123",
      body: {
        email: "alans.thomas@innovaturelabs.com",
        password: "12345"
      },
    };
    const res = {
      status: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue(), json: jest.fn().mockResolvedValue() }),
      send: jest.fn(),
      json: jest.fn(),
      cookie: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue(resultLogin) })
    };

    jest.spyOn(User, "findOne").mockReturnValue({ exec: jest.fn().mockResolvedValue(userLogin) });
    bcrypt.compareSync.mockResolvedValue(true)
    jest.spyOn(User, "findOneAndUpdate").mockReturnValue({ exec: jest.fn().mockResolvedValue() });
    await newjwtlogin(request, res);
    expect(res.status).toHaveBeenCalledWith(401)

  });
});

describe("refreshToken successfull ", () => {
  test(" refreshToken successfull", async () => {
    const request = {
      body: {
        token: 'test_token'
      }
    };
    const res = {
      status: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue(), json: jest.fn().mockResolvedValue(), cookie: jest.fn().mockReturnValue() }),
      send: jest.fn(),
      json: jest.fn(),
      cookie: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue(resultLogin) })
    };
    jwt.verify.mockResolvedValue({ id: '640037c674963a59edb8743c', iat: 1683719933, exp: 1683727133 })
    jest.spyOn(User, "findOne").mockReturnValue({ exec: jest.fn().mockResolvedValue(userLogin) });
    let aaa = await refreshToken(request, res);
    expect(res.status).toHaveBeenCalledWith(200)

  });
});

describe("refreshToken expires ", () => {
  test(" refreshToken expires", async () => {
    const request = {
      body: {
        token: 'test_token'
      }
    };
    const res = {
      status: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue(), json: jest.fn().mockResolvedValue(), cookie: jest.fn().mockReturnValue() }),
      send: jest.fn(),
      json: jest.fn(),
      cookie: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue(resultLogin) })
    };
    jwt.verify.mockResolvedValue(null)
    jest.spyOn(User, "findOne").mockReturnValue({ exec: jest.fn().mockResolvedValue(userLogin) });
    await refreshToken(request, res);
    expect(res.status).toHaveBeenCalledWith(403)

  });
});

describe("register ", () => {
  test("user register", async () => {
    const request = {
      body: {
        password: 'cececes'
      }
    };
    const res = {
      status: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue() }),
      send: jest.fn(),
      json: jest.fn(),
      cookie: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue(resultLogin) })
    };
    bcrypt.genSaltSync.mockResolvedValue(10)
     bcrypt.hashSync.mockResolvedValue("jshdfkj")
    jest.spyOn(User, "findOne").mockReturnValue({ exec: jest.fn().mockResolvedValue(userLogin) });
    jest.spyOn(User.prototype, 'save').mockResolvedValue(userLogin);

      await newjwtauth(request, res);
    expect(res.status).toHaveBeenCalledWith(200)

  });
});



// describe("New password and old password cannot be the same ", () => {
//   test("user New password and old password cannot be the same", async () => {
//     const request = {
//       body: {
//         oldpassword: 'cececes'
//       }
//     };
//     const res = {
//       status: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue() }),
//       send: jest.fn(),
//       json: jest.fn(),
//       cookie: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue(resultLogin) })
//     };
  
//     jest.spyOn(User, "findOne").mockReturnValue({ exec: jest.fn().mockResolvedValue(userLogin) });
//      bcrypt.compareSync.mockResolvedValue(true)
    

//       await NewPassword(request, res);
//     expect(res.status).toHaveBeenCalledWith(402)

//   });
// });


// describe("password mismatch", () => {
//   test("user password mismatch", async () => {
//     const request = {
//       body: {
//         email : "alans.thomas@innovaturelabs.com",
//         oldpassword : "Innovature.AI",
//         Password : "Innovatuzzre.Emp"
//       }
//     };
//     const res = {
//       status: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue() }),
//       send: jest.fn(),
//       json: jest.fn(),
//       cookie: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue(resultLogin) })
//     };

//     jest.spyOn(User, "findOne").mockReturnValue({ exec: jest.fn().mockResolvedValue(userLogin) });
//      bcrypt.compareSync.mockResolvedValue(false)


//       await NewPassword(request, res);
//     expect(res.status).toHaveBeenCalledWith(403)

//   });
// });

describe("password changed ", () => {
  test("user  password is changed successfully", async () => {
    const request = {
      body: {
        email : "alans.thomas@innovaturelabs.com",
        oldpassword : "12345",
        Password : "swsss"
      }
    };
    const res = {
      status: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue(),json: jest.fn().mockResolvedValue() }),
      send: jest.fn(),
      json: jest.fn(),
      cookie: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue(resultLogin) })
    };
  
    jest.spyOn(User, "findOne").mockReturnValue({ exec: jest.fn().mockResolvedValue(userLogin) });
     bcrypt.compareSync.mockResolvedValueOnce(true)
     bcrypt.compareSync.mockResolvedValueOnce(false)
     bcrypt.genSaltSync.mockResolvedValueOnce(10)
     bcrypt.hashSync.mockResolvedValueOnce({Password:"$2a$10$drCzhKpTqLJAjXpxbr5ekOxtljxHFZeQnvXLRtJqMEEJDZwn6FgDO"})


     jest.spyOn(User, "findByIdAndUpdate").mockResolvedValue({Password:"$2a$10$drCzhKpTqLJAjXpxbr5ekOxtljxHFZeQnvXLRtJqMEEJDZwn6FgDO"})
  

      await NewPassword(request, res);
    expect(res.status).toHaveBeenCalledWith(200)

  });
});

describe("password changed user does not exist", () => {
  test("user password changed user does not exist", async () => {
    const request = {
      body: {
        email : "alans.thomas@innovaturelabs.com",
        oldpassword : "12345",
        Password : "swsss"
      }
    };
    const res = {
      status: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue(),json: jest.fn().mockResolvedValue() }),
      send: jest.fn(),
      json: jest.fn(),
      cookie: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue(resultLogin) })
    };
  
    jest.spyOn(User, "findOne").mockReturnValue({ exec: jest.fn().mockResolvedValue(null) });
     bcrypt.compareSync.mockResolvedValueOnce(true)
     bcrypt.compareSync.mockResolvedValueOnce(false)
     bcrypt.genSaltSync.mockResolvedValueOnce(10)
     bcrypt.hashSync.mockResolvedValueOnce({Password:"$2a$10$drCzhKpTqLJAjXpxbr5ekOxtljxHFZeQnvXLRtJqMEEJDZwn6FgDO"})


     jest.spyOn(User, "findByIdAndUpdate").mockResolvedValue({Password:"$2a$10$drCzhKpTqLJAjXpxbr5ekOxtljxHFZeQnvXLRtJqMEEJDZwn6FgDO"})
      await NewPassword(request, res);
    expect(res.status).toHaveBeenCalledWith(400)

  });
});

describe("NewCreatedPassword otp incorrect", () => {
  test("user NewCreatedPassword otp incorrect", async () => {
    const request = {
      body: {
       otp:""
      }
    };
    const res = {
      status: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue(),json: jest.fn().mockResolvedValue() }),
      send: jest.fn(),
      json: jest.fn(),
      cookie: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue(resultLogin) })
    };
  
    jest.spyOn(User, "findOne").mockReturnValue({ exec: jest.fn().mockResolvedValue(userLogin) });
  
      await NewCreatedPassword(request, res);
    expect(res.status).toHaveBeenCalledWith(403)

  });
});

describe("NewCreatedPassword invalid otp", () => {
  test("user NewCreatedPassword invalid otp", async () => {
    const request = {
      body: {
       otp:"sxsx"
      }
    };
    const res = {
      status: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue(),json: jest.fn().mockResolvedValue() }),
      send: jest.fn(),
      json: jest.fn(),
      cookie: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue(resultLogin) })
    };
  
    jest.spyOn(User, "findOne").mockReturnValue({ exec: jest.fn().mockResolvedValue(userLogin) });
      await NewCreatedPassword(request, res);
    expect(res.status).toHaveBeenCalledWith(401)

  });
});

describe("NewCreatedPassword success case", () => {
  test("user NewCreatedPassword success case", async () => {
    const request = {
      body: {
       otp:"99km0b"
      }
    };
    const res = {
      status: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue(),json: jest.fn().mockResolvedValue() }),
      send: jest.fn(),
      json: jest.fn(),
      cookie: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue(resultLogin) })
    };
  
  
    jest.spyOn(User, "findOne").mockReturnValue({ exec: jest.fn().mockResolvedValue(userLogin) });
    jest.spyOn(User, "findByIdAndUpdate").mockResolvedValue();
      await NewCreatedPassword(request, res);
    expect(res.status).toHaveBeenCalledWith(200)

  });
});

describe("NewCreatedPassword catch case", () => {
  test("user NewCreatedPassword catch case", async () => {
    const request = {
      body: {
       otp:"99km0b"
      }
    };
    const res = {
      status: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue(),json: jest.fn().mockResolvedValue() }),
      send: jest.fn(),
      json: jest.fn(),
      cookie: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue(resultLogin) })
    };
  
  
    jest.spyOn(User, "findOne").mockReturnValue({ exec: jest.fn().mockResolvedValue(userLogin) });
    jest.spyOn(User, "findByIdAndUpdate").mockReturnValue({then:jest.fn()});
      await NewCreatedPassword(request, res);
    expect(res.status).toHaveBeenCalledWith(401)

  });
});

describe("SendOtp  invalid otp", () => {
  test("user SendOtp invalid otp", async () => {
    const request = {
      body: {
       email:"fr4f4ff"
      }
    };
    const res = {
      status: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue(),json: jest.fn().mockResolvedValue() }),
      send: jest.fn(),
      json: jest.fn(),
      cookie: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue(resultLogin) })
    };
  
    jest.mock('otp-generator', () => ({
      generate: jest.fn().mockReturnValue('123456'),
    }));
    jest.spyOn(User, "findOneAndUpdate").mockReturnValue({then:jest.fn()});
      await SendOtp(request, res);
    expect(res.status).toHaveBeenCalledWith(401)

  });
});

describe("SendOtp  invalid otp", () => {
  test("user SendOtp invalid otp", async () => {
    const request = {
      body: {
       email:"fr4f4ff"
      }
    };
    const res = {
      status: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue(),json: jest.fn().mockResolvedValue() }),
      send: jest.fn(),
      json: jest.fn(),
      cookie: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue(resultLogin) })
    };
  
    jest.mock('otp-generator', () => ({
      generate: jest.fn().mockReturnValue('123456'), // Mock the generate function to always return '123456'
    }));
    jest.spyOn(User, "findOneAndUpdate").mockResolvedValue();
      await SendOtp(request, res);
    expect(res.status).toHaveBeenCalledWith(200)

  });
});
// describe("ResetPassword success case", () => {
//   test("user ResetPassword success case", async () => {
//     const request = {
//       body: {
//        Email:"drffff",
//        Password:"rfffff"
//       }
//     };
//     const res = {
//       status: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue(),json: jest.fn().mockResolvedValue() }),
//       send: jest.fn(),
//       json: jest.fn(),
//       cookie: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue(resultLogin) })
//     };
  
   
 

//     jest.spyOn(User, "findOne").mockReturnValue({ exec: jest.fn().mockResolvedValue(userLogin) });
//     bcrypt.genSaltSync.mockResolvedValueOnce(10)
//     bcrypt.hashSync.mockResolvedValueOnce({Password:"$2a$10$drCzhKpTqLJAjXpxbr5ekOxtljxHFZeQnvXLRtJqMEEJDZwn6FgDO"})

//     jest.spyOn(User, "findOneAndUpdate").mockResolvedValueOnce();
//       await ResetPassword(request, res);
//     expect(res.status).toHaveBeenCalledWith(200)

//   });
// });

describe("ResetPassword  email and password is empty", () => {
  test("user ResetPassword email and password is empty", async () => {
    const request = {
      body: {
       Email:"",
       Password:""
      }
    };
    const res = {
      status: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue(),json: jest.fn().mockResolvedValue() }),
      send: jest.fn(),
      json: jest.fn(),
      cookie: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue(resultLogin) })
    };
      await ResetPassword(request, res);
    expect(res.status).toHaveBeenCalledWith(403)

  });
});



describe("ResetPassword catch case", () => {
  test("user ResetPassword catch case", async () => {
    const request = {
      body: {
       Email:"drffff",
       Password:"rfffff"
      }
    };
    const res = {
      status: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue(),json: jest.fn().mockResolvedValue() }),
      send: jest.fn(),
      json: jest.fn(),
      cookie: jest.fn().mockReturnValue({ send: jest.fn().mockResolvedValue(resultLogin) })
    };
  
    jest.spyOn(User, "findOne").mockReturnValue({ exec: jest.fn().mockResolvedValue(userLogin) });
    bcrypt.genSaltSync.mockResolvedValueOnce(10)
    bcrypt.hashSync.mockResolvedValueOnce({Password:"$2a$10$drCzhKpTqLJAjXpxbr5ekOxtljxHFZeQnvXLRtJqMEEJDZwn6FgDO"})

    jest.spyOn(User, "findOneAndUpdate").mockReturnValueOnce(null);
      await ResetPassword(request, res);
    expect(res.status).toHaveBeenCalledWith(400)

  });
});











