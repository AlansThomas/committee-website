const exp = require("express");
const user = require("../models/User.Model");
const usersTable = require("../models/User.Model");
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser')
const Joi = require('@hapi/joi');
///////////multer///////
const logger = require('../utils/logger.utils')
const multer = require('multer');
let csv = require('csvtojson');
const app = exp()

////////////csv//////////////////

app.use(bodyParser.urlencoded({ extended: false }));

//////////////////////csv validation///////////////
const schema = Joi.object().keys({
  UserName: Joi.string().max(50).regex(/^[a-zA-Z ]*$/, 'space and characters').required(),
  DOB: Joi.string().required(),
  Email: Joi.string().required().email().max(100).required(),
  Designation: Joi.string().valid('Software Engineer', 'Project Manager', 'Test Engineer').required(),

});
const schemaForId = Joi.object().keys({

  id: Joi.string().required(),

});

let cookieParser = require('cookie-parser');
const { application } = require("express");
application.use(cookieParser())
require('dotenv').config();
//google authentication
const passport = require('passport');
const UserTable = require("../models/User.Model");
const { newvalidation } = require("../utils/UserValidation");



exports.uploadFiles = async (req, res) => {

  let errorData;
  let salt = bcrypt.genSaltSync(10);
  let hashedPassword = bcrypt.hashSync("Innovature.AI", salt);

  csv()
    .fromFile(req.files[0].path)
    .then(async (jsonObj) => {
      try {

       jsonObj.forEach(function (obj) {
          const Validation = schema.validate(obj);
          errorData = schema.validate(obj);
          if (Validation.error) {
            res.status(400).send(Validation.error.details[0].message)
          }
        })
      }
      catch (error) {
        logger.error(`${error.status || 500} - 'error' - ${error.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        res.status(400).send(error)
      }

      try {
        if (!errorData.error) {

          jsonObj.forEach(function (obj) {

            obj.Password = hashedPassword;
            obj.UserNameSearch = obj.Email.split("@")[0]
            obj.TypeSearch = "Innovator"
          });

          let options = { upsert: true };
           await usersTable.insertMany(jsonObj, options).then((data) => {
            res.send(data)
          }).catch((error) => {
            logger.error(`${error.status || 500} - 'error' - ${error.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
            res.status(400).send(error)
          });
        }
      }
      catch (error) {
        logger.error(`${error.status || 500} - 'error' - ${error.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        res.status(400).send(error)
      }
    });
}



exports.manuallyAddUser = (newvalidation, (async (req, res) => {

  const data = req.body


  let username = req.body.Email.split("@")[0]


  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync("Innovature.AI", salt);
  

  data.Password = hashedPassword;
  data.UserNameSearch = username;
  data.TypeSearch = "Innovator"
  

  const usertableschema = new usersTable(data)

  await usertableschema.save().then((response) => {

    res.status(200).send({ "data": response })
  }).catch((error) => {
    logger.error(`${error.status || 500} - 'error' - ${error.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    res.status(404).json(error)
  })

}))


exports.newauth = (async (req, res) => {

  const salt = bcrypt.genSaltSync(10);

  const hash = bcrypt.hashSync(req.body.password, salt);
  


  const userObj = new user({
    username: req.body.username, email: req.body.email, password: hash
  })

  await userObj.save().then((data) => {
  
   

   res.status(200).send({ "data": data })

  }).catch((error) => {
    logger.error(`${error.status || 500} - 'error' - ${error.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    res.status(500).json(error)
  })
})

exports.newlogin = async (req, res, next) => {

  try {

    const users = await user.findOne({ username: req.body.username }).exec();


    if (users) {
     

      const passmatch = bcrypt.compareSync(req.body.password, users.password);
  

      const envtoken = "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.VFb0qJ1LRg_4ujbZoRMXnVkUgiuKq5KxWqNdbKq_G9Vvz-S1zZa9LPxtHWKa64zDl2ofkT8F6jBt_K4riU-fPg";
      
      if (passmatch) {
   
        const { password, isAdmin, ...otherDetails } = users._doc;
 
        const token = jwt.sign({ id: users._id, isAdmin: users.isAdmin }, envtoken)
      

        res.status(200).cookie("accesstoken", token, { httpOnly: true }).send({ "data": otherDetails, "token": token })
      }
      else {
        res.status(401).send("invalid credintials")
      }
    }
    else {
      res.status(403).send("not found")
    }
  }


  catch (error) {
    logger.error(`${error.status || 500} - 'error' - ${error.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);

    res.status(400).send(error)
  }

}


exports.updateUserType = (req, res) => {
  const objId = { "id": req.params.id }

  const Validation = schemaForId.validate(objId);


  if (Validation.error) {

    res.status(401).send(Validation.error)
  }

  UserTable.findByIdAndUpdate(req.params.id, { $set: req.body }).then((data) => {
    res.status(200).send(data)
  }).catch((error) => {

    logger.error(`${error.status || 500} - 'error' - ${error.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    res.status(400).send(error)
  })

}



exports.deleteUser = async(req, res) => {

  await UserTable.findByIdAndUpdate(req.params.id, { $set: req.body }).then((data) => {
    res.status(200).send(data)
  }).catch((error) => {
  
    logger.error(`${error.status || 500} - 'error' - ${error.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    res.status(400).send(error)
  })
}



exports.finduserById = (req, res) => {
  usersTable.findById(req.params.id).then((data) => {
    res.status(200).send(data)
  }).catch((error) => {
  
    logger.error(`${error.status || 500} - 'error' - ${error.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    res.status(400).send(error)
  })
}


