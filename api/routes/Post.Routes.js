const express = require('express');
const app = express();
const multer = require('multer')
const Post = require('../models/Post.Model')
const {postImagePrivateEdit,postOfCurrentUser,updatePostImage, postUpdation, postImage, deletePost, getDateFromDb, onePostWithComments, deletePostByAdmin, postById, allPostsPaginated, findHashPost, hashtagSearch, postImagePrivate, postsByUser, convertPrivatePostPublic, getPrivatePostsOfCurrentUser, getPostsOfCommittee, postByIdPrivate } = require("../controller/Post.Controller");
const router = express.Router();
const { verifyUser } = require('../middleware/Auth.MiddleWare.js');
const { roleGuard } = require('../middleware/RoleGuard.MiddleWare.js');
module.exports = router;
const bdyp = require('body-parser');
const bodyParser = require('body-parser');
app.use(bdyp.json());
const dotenv = require('dotenv');
dotenv.config();
//////////////////////
app.use(bodyParser.urlencoded({ extended: false }));

const UploadPost = require('../middleware/Multer.MiddleWare');
const {adminValidator} = require('../utils/ExpressVAlidator.Validator');
const {postValidator} = require('../validator/Post.Validator')
const {userValidator} =  require('../validator/User.Validator')
const {groupValidator} =  require('../validator/Group.Validator')


router.post("/postimage", verifyUser, roleGuard, UploadPost.UploadPost,adminValidator("PostImage"), postImage);
router.put("/postimageEdit", verifyUser, roleGuard, UploadPost.UploadPost,adminValidator("PostImage"), updatePostImage);
router.post("/postImagePrivate", verifyUser, roleGuard, UploadPost.UploadPost,adminValidator("PostImage"), postImagePrivate);
router.put("/postImagePrivateEdit", verifyUser, roleGuard, UploadPost.UploadPost,adminValidator("PostImage"), postImagePrivateEdit);
router.put("/updatepost/:id", verifyUser, roleGuard, UploadPost.UploadPost, postUpdation)
router.get("/allpostsPaginated", verifyUser, roleGuard, allPostsPaginated);
router.get("/postofcurrentUser", verifyUser, roleGuard, postOfCurrentUser);
router.delete("/deletepost/:id", verifyUser, roleGuard,postValidator('getPost'), deletePost)
router.get("/GetData/Date/:date", verifyUser, roleGuard, getDateFromDb)
router.get("/OnePostWithComments/:id", verifyUser, roleGuard, postValidator('getPost'), onePostWithComments)
router.delete("/deletepostbyadmin/:id", verifyUser, roleGuard, deletePostByAdmin)
router.get("/postbyId/:id", verifyUser, roleGuard, postValidator('getPost'), postById)
router.get("/postbyIdPrivate/:id", verifyUser, roleGuard, postValidator('getPost'), postByIdPrivate)
router.get("/Post/:id", verifyUser, roleGuard, findHashPost)
router.get("/hashtagSearch", verifyUser, roleGuard,postValidator("search"), hashtagSearch)
router.get("/getPostsOfUser/:id", verifyUser, roleGuard, groupValidator('id'), postsByUser)
router.put("/makePostPublic/:id", verifyUser, roleGuard,  postValidator('getPost'), convertPrivatePostPublic)
router.get("/getPrivatePostsOfCurrentUser", verifyUser, roleGuard, getPrivatePostsOfCurrentUser);
router.get("/getPostsOfCommittee", verifyUser, roleGuard, getPostsOfCommittee);


module.exports = router;