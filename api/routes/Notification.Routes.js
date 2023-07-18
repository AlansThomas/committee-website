const express=require('express');
const app = express();
const router=express.Router();
const bdyp = require('body-parser');
const bodyParser = require('body-parser');
const { verifyUser } = require('../middleware/Auth.MiddleWare.js');
const { roleGuard } = require('../middleware/RoleGuard.MiddleWare.js');
const notifyController=require('../controller/Notification.Controller');
const { adminValidator } = require('../utils/ExpressVAlidator.Validator.js');
app.use(bdyp.json());
app.use(bodyParser.urlencoded({extended: false}));
const {groupValidator} =  require('../validator/Group.Validator')
const UploadProfile = require('../middleware/Multer.MiddleWare');
const {glimpseValidator}=require('../validator/GlimpsesValidator')

router.get("/listPersonalNotify",verifyUser,roleGuard,notifyController.FindPersonalNotification);
router.get("/listGroupNotify",verifyUser,roleGuard,notifyController.FindGroupNotification);
router.put("/readPost/:id",verifyUser,roleGuard,notifyController.ReadPost);
router.get("/findPost",verifyUser,roleGuard,notifyController.findPost);
router.get("/findBirthdayUsers",verifyUser,roleGuard,notifyController.findUserBirthday);
router.get("/findAllNotify/:page",verifyUser,roleGuard,adminValidator("SearchPage"),notifyController.findAllNotify);
router.get("/findAllNotifyCommittee/:page",verifyUser,roleGuard,adminValidator("SearchPage"),notifyController.findAllNotifyforCommitty);
router.put("/readVerification/:id", verifyUser, roleGuard, notifyController.ReadVerification)
router.get("/unreadVerifications", verifyUser, roleGuard, notifyController.unreadVerifications)
router.get("/getTaggedPosts/:id",verifyUser,roleGuard,groupValidator('posts'),notifyController.taggedPosts);

//add glimpses
router.post("/addGlimpses",verifyUser,roleGuard,UploadProfile.UploadImage,notifyController.addGlimpses);
router.put("/glimpseDelete",verifyUser,roleGuard,glimpseValidator('glimpseDelete'),notifyController.deleteGlimpses);
router.get("/getGlimpses", verifyUser, roleGuard, notifyController.getGlimpses)
router.put("/editGlimpses", verifyUser, roleGuard,UploadProfile.UploadImage, notifyController.editGlimpses)




module.exports=router;