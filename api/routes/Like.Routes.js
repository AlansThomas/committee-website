const express=require('express');
const app = express();
const router=express.Router();
const bdyp = require('body-parser');
const bodyParser = require('body-parser');
const { verifyUser } = require('../middleware/Auth.MiddleWare.js');
const { roleGuard } = require('../middleware/RoleGuard.MiddleWare.js');
const {likePost, disLikePost} = require('../controller/Like.Controller')
app.use(bdyp.json());
app.use(bodyParser.urlencoded({extended: false}));


router.post("/likepost",verifyUser,roleGuard, likePost);
router.post("/dislikepost",verifyUser,roleGuard, disLikePost);


module.exports=router;