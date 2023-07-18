const express=require('express');
const app = express();
const Comment = require('../models/Comment.Model')
const Post = require('../models/Post.Model')
const router=express.Router();
const { commentPost,editComment,deleteComment, commentList } = require("../controller/Comment.Controller");
const bdyp = require('body-parser');
const { verifyUser } = require('../middleware/Auth.MiddleWare.js');
const { roleGuard } = require('../middleware/RoleGuard.MiddleWare.js');
const bodyParser = require('body-parser');
app.use(bdyp.json());
app.use( bodyParser.json()); 
app.use(bodyParser.urlencoded({extended: false})); 

const {postValidator} = require('../validator/Post.Validator')

router.post("/postcomment",verifyUser,roleGuard, postValidator('postComment'), commentPost);
router.put("/editcomment",verifyUser,roleGuard, postValidator('editComment'), editComment);
router.put("/deletecomment",verifyUser,roleGuard, deleteComment);
router.get("/listcomment/:id",verifyUser,roleGuard, postValidator('getPost'), commentList);

module.exports=router;

