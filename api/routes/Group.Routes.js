const exp = require('express');
const app = exp();
let path = require('path');
const { validationG } = require('../utils/GroupValidation.js')
const bodyParser = require('body-parser')
//fetch data from the request
const multer = require('multer');
app.use(bodyParser.urlencoded({ extended: false }));
const router = exp.Router();
const GroupTable = require('../models/Groups.Model.js');
const { updatesingleuser,updateProfileImage, UpdateGroupOfAllUsers, FindAllGroups, findGroupById, FindUsersOfAGroup, updateGroupDetails, GroupDelete, FindAllCommittee, findCommity, UpdateCommitteeOfAllUsers, FindUsersOfACommittee, FindUsersOfACommitteeDelete, FindGroupName, FindGroupNameForInnovature, groupwisepoints, groupNameAndMembers, findGroupOnEventdsOnly, FindUsersOfAGroupWithoutCommitteeMember, uploadFiles, getGroupDetails } = require('../controller/Group.Controller.js');
const { verify } = require('crypto');
const Joi = require('@hapi/joi');
const dotenv = require('dotenv');
const { verifyUser } = require('../middleware/Auth.MiddleWare.js');
const UserTable = require('../models/User.Model.js');
const { roleGuard } = require('../middleware/RoleGuard.MiddleWare.js');
const uploadGroup=require('../middleware/Multer.MiddleWare')
dotenv.config();
//////////////////////
const Image_Path=process.env.Image_Path
const devUrl=process.env.devUrl
const {groupValidator} = require('../validator/Group.Validator');


router.post("/create",verifyUser,roleGuard,uploadGroup.UpdateGroupImage, uploadFiles);
router.put("/UpdatePic/:id",verifyUser,roleGuard,uploadGroup.UpdateGroupImage, updateProfileImage);
router.put("/Update/Single/UserGroup/:id",verifyUser,roleGuard, updatesingleuser);
router.put("/Update/Multiple/UsersGroup/:id",verifyUser,roleGuard, UpdateGroupOfAllUsers)
router.put("/Update/Multiple/UsersCommittee/:id",verifyUser,roleGuard, UpdateCommitteeOfAllUsers)
router.get("/findAllGroup",verifyUser,roleGuard,FindAllGroups)
router.get("/findGroupById/:id",verifyUser,roleGuard,findGroupById)
router.get("/FindAllUser/inGroup/:id",verifyUser,roleGuard,FindUsersOfAGroup)
router.get("/FindAllUser/inCommittee/:id",verifyUser,roleGuard,FindUsersOfACommittee)
router.put("/Delete/CommitteeOrGroup/:id",verifyUser,roleGuard,FindUsersOfACommitteeDelete)
router.post("/FindCommittee",verifyUser,roleGuard,FindAllCommittee);
router.get("/FindGroupByNAme/:gname",verifyUser,roleGuard,FindGroupName);
router.get("/FindGroupByNAmeForInnovature/:gname",verifyUser,roleGuard,FindGroupNameForInnovature);
router.put("/UpdateGroupDetails/:id",verifyUser,roleGuard,updateGroupDetails)
router.put("/UpdateDelete/:id",verifyUser,roleGuard,GroupDelete)
router.get("/GetDataOfCommittee",verifyUser,roleGuard,findCommity)
router.get("/groupnameandmembers",verifyUser,roleGuard, groupNameAndMembers)
router.get("/FindUsersOfAGroupWithoutCommitteeMember/:id", verifyUser, roleGuard, FindUsersOfAGroupWithoutCommitteeMember)
router.get("/GetEventBaseGroup/:id",verifyUser,roleGuard,findGroupOnEventdsOnly)
router.get("/GetGroupForMention/:id",verifyUser,roleGuard,findGroupOnEventdsOnly)




module.exports = router;




