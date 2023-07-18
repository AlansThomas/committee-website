const jwt = require("jsonwebtoken");
const logger = require('../utils/logger.utils');

require('dotenv').config();
const UserTable = require("../models/User.Model");
exports.verifyUser = async (req, res, next) => {
  try {
    const envtoken = "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.VFb0qJ1LRg_4ujbZoRMXnVkUgiuKq5KxWqNdbKq_G9Vvz-S1zZa9LPxtHWKa64zDl2ofkT8F6jBt_K4riU-fPg";
    // console.log("inside middlware")
    //we provided this token into the req, api->index.js file
    const token = req.headers.authorization
    //token length less than 500 means its an jwt token otherways google token
    const checklog = async(user) => {
 
     try {
      logger.info('PASSWORD CHANGE'+PasswordChange);

 
      if (user.PasswordChange ==1) {
       
         await UserTable.findOneAndUpdate({Email:user.Email},{$set : {PasswordChange : 0}}).then((data)=>{
      logger.info('finded data'+data);
   
         return res.status(403).send("TokenExpires")
       
      }).exec();
    
      }
     } catch (error) {

      
     }
    
  }

 



    if (token !== null || token !== undefined) {
      const base64String = token.split('.')[1];
      await JSON.parse(Buffer.from(base64String,
        'base64').toString('ascii'));
     
      const decodedid = await jwt.verify(token, envtoken)
    
      const user = await UserTable.findOne({
        $and: [{
          _id: decodedid.id
        }, {
          Delete: 0
        }]
      }).exec();
      //  logger.info(user)
      
      if (user) {
        await checklog(user);
        req.User = user;
      // logger.info('user'+req.User);
       
        next();

      } else {
      return  res.status(404).send("User not Found")
      }
    } else {
      logger.info(' error 68');

    return  res.status(403).send("TokenExpires")

    }
  } catch (error) {
    logger.info(' error 75');

  return  res.status(403).send("TokenExpires")
  }
};
