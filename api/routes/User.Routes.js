const express = require("express");
const {searchOnInnovators, updateuser, deleteuser,updateProfileImage, FindbyNameAndEmail,getUserOrGroupDetails, displayallusers, getGropuMembers, paginationRecord, currentUserDetails, AddNewUsersToGroup, searchUser,  committeemember, AddNewUsersToCommittee, FindByEmail, updateGroupCapandVC, findByEmailRegex, findByEmailRegexForGroup, findByNameRegexForMention, birthdaysOfCurrentMonth, birthdayCardUpload, userDetails, findByNameRegexForPrivateMention,addImage,getImage,deleteImage } = require("../controller/User.Controller");
const router = express.Router();
const auth = require("../middleware/Auth.MiddleWare");
const app=express();
const dotenv = require('dotenv');
const { roleGuard } = require("../middleware/RoleGuard.MiddleWare");
dotenv.config();
//////////////////////
const UploadProfile = require('../middleware/Multer.MiddleWare');
const BirthdayCardUpload = require('../middleware/Multer.MiddleWare')
app.use(express.static(__dirname + '/api/images'));
const {userValidator} = require('../validator/User.Validator')
const {groupValidator} = require('../validator/Group.Validator')
const { verifyUser } = require('../middleware/Auth.MiddleWare.js');
const {glimpseValidator}=require('../validator/GlimpsesValidator')







router.put("/UpdatePic/:id",auth.verifyUser,roleGuard,UploadProfile.UploadImage, updateProfileImage);
router.get("/Display/FilteredUser",auth.verifyUser,roleGuard,paginationRecord)
router.put("/UpdateUser/:id",auth.verifyUser,roleGuard, updateuser)
// router.put("/UpdateUser/GroupRole/:id",auth.verifyUser,roleGuard, updateuser)
// router.put("/UpdateUser/Group/:id",auth.verifyUser,roleGuard, updateuser)
router.delete("/delete",auth.verifyUser,roleGuard,deleteuser)
router.get("/email/:id",auth.verifyUser,roleGuard, FindbyNameAndEmail)
router.post("/FindByEmail",FindByEmail)
router.get('/display/All/user',auth.verifyUser,roleGuard,displayallusers)
router.get('/group/members',auth.verifyUser,roleGuard, getGropuMembers);
router.get("/Display/AddUsersToNewGroup",auth.verifyUser,roleGuard,AddNewUsersToGroup)
router.get("/Display/AddUsersToNewCommittee",auth.verifyUser,roleGuard,AddNewUsersToCommittee)
router.get("/searchuser",auth.verifyUser,roleGuard, searchUser)
router.get("/currentuserDetails",auth.verifyUser,roleGuard,currentUserDetails)
router.put("/updateGroupCapandVC/:id", auth.verifyUser, roleGuard, updateGroupCapandVC)
router.get("/findByEmailInMaterial/:Email",auth.verifyUser,roleGuard,findByEmailRegex)
router.get("/findByEmailRegexForGroup/:Email",auth.verifyUser,roleGuard,findByEmailRegexForGroup)

router.get("/findByNameRegexForMention",auth.verifyUser,roleGuard,findByNameRegexForMention)
router.post("/searchOnInnovators", auth.verifyUser,roleGuard, userValidator('search'), searchOnInnovators)
router.get("/birthdaysOfCurrentMonth", auth.verifyUser,roleGuard,birthdaysOfCurrentMonth) 
router.get("/getUserOrGroupDetails/:id", auth.verifyUser, roleGuard, groupValidator('id'), getUserOrGroupDetails)
router.put("/birthdayCardUpdate/:id", auth.verifyUser, roleGuard, BirthdayCardUpload.UploadBirthdayCard, birthdayCardUpload)
router.get("/getUserDetails/:id",auth.verifyUser,roleGuard, userDetails)
router.get("/findByNameRegexForPrivateMention",auth.verifyUser,roleGuard,findByNameRegexForPrivateMention)


//Admin home gallery image upload
router.post("/addImage",verifyUser,roleGuard,UploadProfile.UploadImage,addImage);
router.get("/getImage",verifyUser,roleGuard,getImage);
router.put("/deleteImage",verifyUser,roleGuard,glimpseValidator('imageDelete'),deleteImage);



module.exports = router
