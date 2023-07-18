
const exp = require('express');
const app = exp();
///////////////////////json body validation///////////////////////
let path = require('path');
const bodyParser = require('body-parser')
//fetch data from the request
const UploadCsv = require('../middleware/Multer.MiddleWare');


const dotenv = require('dotenv');
dotenv.config();
/////////////////////
app.use(bodyParser.urlencoded({ extended: false }));
app.use(exp.static(path.resolve(__dirname, 'public')));
const { newjwtlogin, newjwtauth, SendOtp, ResetPassword, NewCreatedPassword, NewPassword,  refreshToken } = require('../controller/Jwtauth.Controller.js');

const { newauth, newlogin,  manuallyAddUser, updateUserType, deleteUser, finduserById, uploadFiles } = require('../controller/Auth.Controller');
const { register } = require('../utils/UserValidation');
const { roleGuard } = require('../middleware/RoleGuard.MiddleWare.js');
const { verifyUser } = require('../middleware/Auth.MiddleWare.js');
const { passwordValidator } = require('../validator/PasswordValidator')

const router = exp.Router();
router.post("/post", newauth)
router.post("/login", newlogin)

router.post("/upload", verifyUser, roleGuard,UploadCsv.UploadCsv,uploadFiles);
router.post("/add/user/manually", verifyUser, roleGuard, register, manuallyAddUser)
router.post("/update/user/type/:id", verifyUser, roleGuard, updateUserType)
router.post("/delete/user/:id", verifyUser, roleGuard, deleteUser)
router.get("/getUser/byId/:id", verifyUser, roleGuard, finduserById)
/////////jwt login////////////////git 
router.post("/jwt/login", newjwtlogin)
router.post("/jwt/register", newjwtauth)
router.post("/jwt/SendOtp", SendOtp)
router.post("/jwt/Reset", NewCreatedPassword)
router.post("/jwt/ChangePassword",passwordValidator('password1'), ResetPassword)
router.post("/jwt/ChangePswd/Home", passwordValidator('password'), NewPassword)
router.post("/jwt/refreshToken", refreshToken)
module.exports = router;