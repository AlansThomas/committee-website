const exp = require("express");
const Group = require('../models/Groups.Model.js')

const Post = require("../models/Post.Model");
const User = require("../models/User.Model");
const app = exp();
const Comment = require("../models/Comment.Model");
const { roleGuard } = require('../middleware/RoleGuard.MiddleWare');
const { verifyUser } = require('../middleware/Auth.MiddleWare');
const bdyp = require('body-parser')
const bodyParser = require('body-parser')
app.use(bdyp.json())
const formidable = require('formidable');
app.use(bodyParser.urlencoded({ extended: false }))
const mongoose = require('mongoose')
const path = require("path");
const Image_Path = process.env.Image_Path
const logger = require('../utils/logger.utils')
const joi = require('@hapi/joi');
const { data } = require("../utils/logger.utils");
const { func, date } = require("@hapi/joi");
const { validationResult } = require("express-validator");
const NotificationModel = require("../models/Notification.Model");
const PostModel = require("../models/Post.Model");
const ReportModel = require("../models/Report.Model.js");
const GroupsModel = require("../models/Groups.Model.js");
const { type } = require("os");
const Schema = joi.object().keys({

  id: joi.string().alphanum()
})
const schemaforpage = joi.object().keys({

  page: joi.number(),

});


exports.onePostWithComments = (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.send(errors.errors[0].msg);
    }
    Comment.aggregate([
      {
        $match: {
          "PostId": new mongoose.Types.ObjectId(req.params.id),
          'Delete': 0
        }
      },
      {
        $sort: {
          "createdAt": -1
        }
      },
      {
        $lookup: {
          from: "posts", localField: "PostId", foreignField: "_id", as: "list"
        },

      },
      {
        $lookup: {
          from: "userstables", localField: "UserId", foreignField: "_id", as: "userslist"
        }
      },
      {
        $project: {
          "userslist.Password": 0,
          "userslist.Otp": 0,
          "userslist.GroupRole": 0,
          "userslist.Designation": 0,
          "userslist.Delete": 0,
          "userslist.GroupId": 0,
          "userslist.CommitteeId": 0,
          "userslist.CommitteeRole": 0,
        }
      }
    ]).then((result) => {
      res.send(result)
    }).catch((error) => {
      logger.error(`${error.status || 500} - 'error' - ${error.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
      res.send(error)
    })
  }
  catch (error) {
    res.send(error)
  }
}


exports.postOfCurrentUser = (async (req, res) => {
  try {
    Post.aggregate([
      {
        $match: {
          'Delete': 0,
          'UserId': new mongoose.Types.ObjectId(req.User._id),
          'PostedUser': { $not: { $regex: /Recreation Committee/ } },
        }
      },
      {
        $sort: {
          "createdAt": -1
        }
      },
      {
        $lookup: {
          from: "userstables", localField: "UserId", foreignField: "_id", as: "userlist"
        },
      },
      {
        $lookup: {
          from: "comments", localField: "Comments", foreignField: "_id", as: "Comments",
          pipeline: [{ $sort: { "createdAt": -1 } }, { $limit: 3 }]
        }
      },
      {
        $project: {
          "userlist.Password": 0,
          "userlist.Otp": 0,
          "userlist.GroupRole": 0,
          "userlist.Designation": 0,
          "userlist.Delete": 0,
          "userlist.GroupId": 0,
          "userlist.CommitteeId": 0,
          "userlist.CommitteeRole": 0,
          "userlist.CommitteCreateDate": 0,
          "userlist.GroupCreateDate": 0,
          "userlist.DOB": 0,
          "userlist.UserNameSearch": 0,
          "userlist.Type": 0,
          "userlist.createdAt": 0,
          "userlist.updatedAt": 0,
          "userlist.__v": 0,
          "Comments.UserId": 0,
          "Comments.PostId": 0,
          "Comments.Delete": 0,
          "Comments.updatedAt": 0,
        }
      }
    ]).then((result) => {
      res.send(result)
    }).catch((error) => {
      logger.error(`${error.status || 500} - 'error' - ${error.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
      res.send(error)
    })
  }
  catch (e) {
    logger.error(`${e.status || 500} - 'error' - ${e.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    res.send(e)
  }
})


exports.allPostsPaginated = async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).send(errors.errors[0].msg);
    }
    const page = req.query.page - 1;
    Post.aggregate([
      {
        $match: { $and: [{ Delete: 0 }, { Tags: "1" }] }
      },
      {
        $sort: { "updatedAt": -1 }
      },
      {
        $lookup: { from: "userstables", localField: "UserId", foreignField: "_id", as: "userlist" }
      },
      {
        $lookup: {
          from: "comments", localField: "Comments", foreignField: "_id", as: "Comments",
          pipeline: [{ $sort: { "createdAt": -1 } }, { $limit: 3 }]
        }
      },
      {
        $project: {
          "userlist.Password": 0,
          "userlist.Otp": 0,
          "userlist.GroupRole": 0,
          "userlist.Designation": 0,
          "userlist.Delete": 0,
          "userlist.GroupId": 0,
          "userlist.CommitteeId": 0,
          "userlist.CommitteeRole": 0,
          "userlist.CommitteCreateDate": 0,
          "userlist.GroupCreateDate": 0,
          "userlist.DOB": 0,
          "userlist.UserNameSearch": 0,
          "userlist.Type": 0,
          "userlist.createdAt": 0,
          "userlist.updatedAt": 0,
          "userlist.__v": 0,
          "Comments.UserId": 0,
          "Comments.PostId": 0,
          "Comments.Delete": 0,
          "Comments.updatedAt": 0,
        }
      },
      { $skip: page * 10 },
      { $limit: 10 }
    ]).then((result) => {
      res.status(200).send(result)
    }).catch((error) => {
      logger.error(`${error.status || 500} - 'error' - ${error.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
      res.status(404).send({ message: error.message });
    })

  }
  catch (e) {
    logger.error(`${e.status || 500} - 'error' - ${e.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    res.send(e)
  }
}

async function notificationAndReportDelete(req, res) {
  NotificationModel.deleteMany({ PostId: new mongoose.Types.ObjectId(req.params.id) }).then(() => {
    ReportModel.deleteMany({ PostId: new mongoose.Types.ObjectId(req.params.id) }).then(() => {
      res.status(200).send("post deleted")
    })
  })
}


function postDeleteByCommittee(req, res) {
  Post.findByIdAndUpdate(req.params.id, { Delete: 1 }).then(() => {
    notificationAndReportDelete(req, res)
  }).catch((error) => {
    logger.error(`${error.status || 500} - 'error' - ${error.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    res.status(400).send(error);
  })
}

function postDeleteByUser(req, res, post) {
  try {
    if (post.UserId.valueOf() === req.User._id.valueOf()) {
      Post.findByIdAndDelete(req.params.id).then(() => {
        notificationAndReportDelete(req, res)
      }).catch((err) => {
        logger.error(`${err.status || 500} - 'error' - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        res.status(400).send(err);
      })
    }
    else {
      logger.error(`${error.status || 500} - 'error' - ${error.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
      res.status(403).send("you can only delete your post")
    }
  }
  catch (e) {
    logger.error(`${e.status || 500} - 'error' - ${e.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    res.send(e)
  }
}

exports.deletePost = async (req, res) => {

  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).send(errors.errors[0].msg);
    }
    const post = await Post.findById(req.params.id).exec();
    if (post.PostedUser == "Recreation Committee" && req.headers.genericvalue == 1) {
      postDeleteByCommittee(req, res);
    }
    else if (post.PostedUser != "Recreation Committee") {
      postDeleteByUser(req, res, post)
    }
    else {
      res.status(401).send("Cannot delete a post by committee")
    }
  }
  catch (e) {
    logger.error(`${e.status || 500} - 'error' - ${e.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    res.send(e)
  }
}

exports.getDateFromDb = (req, res) => {
  Post.aggregate([
    { $sort: { createdAt: -1 } },
    {
      $project: {
        date: {
          $dateToString: {
            format: "%Y-%m-%d",
            date: "$createdAt"
          }
        }, PostImage: 1, PostDescription: 1, Like: 1, Dislike: 1
      }
    },
    {
      $match: {
        date: req.params.date
      }
    }
  ]).then((response) => {
    res.send(response)
  })
}

exports.deletePostByAdmin = (req, res) => {
  try {
    let Validation = Schema.validate(req.params)
    if (!Validation.error) {

      Post.findByIdAndDelete(req.params.id).then(() => {
        notificationAndReportDelete(req, res)
      }).catch((err) => {
        logger.error(`${err.status || 500} - 'error' - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        res.status(400).send(err)
      })
    }
    else {
      logger.error(`${error.status || 500} - 'error' - ${error.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
      res.status(400).send(Validation.error)
    }
  }
  catch (e) {
    logger.error(`${e.status || 500} - 'error' - ${e.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    res.send(e)
  }
}

exports.postById = (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.send(errors.errors[0].msg);
    }
    Post.aggregate([
      {
        $match: {
          "_id": new mongoose.Types.ObjectId(req.params.id),
          "Delete": 0
        }
      },

      {
        $lookup: {

          from: "userstables", localField: "UserId", foreignField: "_id", as: "userslist"

        }
      },
      {
        $project: {
          "userslist.Password": 0,
          "userslist.Otp": 0,
          "userslist.GroupRole": 0,
          "userslist.Designation": 0,
          "userslist.Delete": 0,
          "userslist.GroupId": 0,
          "userslist.CommitteeId": 0,
          "userslist.CommitteeRole": 0
        }
      }
    ]).then((result) => {
      res.status(200).send(result)
    }).catch((err) => {
      logger.error(`${err.status || 500} - 'error' - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
      res.status(404).send({ message: err.message });
    })
  }
  catch (e) {
    logger.error(`${e.status || 500} - 'error' - ${e.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    res.send(e)
  }
}

exports.postByIdPrivate = async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.send(errors.errors[0].msg);
    }
    const posts = await Post.aggregate([
      {
        $match: {
          "_id": new mongoose.Types.ObjectId(req.params.id),
          "Delete": 0
        }
      },

      {
        $lookup: {

          from: "userstables", localField: "UserId", foreignField: "_id", as: "userslist"

        }
      },
      {
        $project: {
          "userslist.Password": 0,
          "userslist.Otp": 0,
          "userslist.GroupRole": 0,
          "userslist.Designation": 0,
          "userslist.Delete": 0,

          "userslist.CommitteeId": 0,
          "userslist.CommitteeRole": 0
        }
      }
    ]).catch((error) => {
      logger.error(`${error.status || 500} - 'error' - ${error.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
      res.status(404).send({ message: error.message });
    })

    if (posts[0]?.Tags != "1") {
      const openUserID = req.User.GroupId ? req.User.GroupId : 0
      const postedUserID = posts[0].userslist[0].GroupId ? posts[0].userslist[0].GroupId : 1

      if (openUserID == postedUserID) {
        res.status(200).send(posts)
      }
      else {
        res.status(400).send("You are not able to access this post")
      }
    }
    else {
      res.status(200).send(posts)
    }
  }
  catch (e) {
    logger.error(`${e.status || 500} - 'error' - ${e.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    res.send(e)
  }
}



exports.postUpdation = (req, res) => {
  try {

    Post.findById(req.params.id).then(() => {

      Post.findByIdAndUpdate(req.params.id, { $set: req.body, PostImage: req.files[0].path }).then((post) => {
        res.send(post)

      }).catch((err) => {
        res.status(400).send(err)

      })
    })

  }

  catch (error) {
    logger.error(`${error.status || 500} - 'error' - ${error.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    res.send(error)
  }
}



async function notify(req, res, postData, flag) {

  try {
    let notifyList = [];
    const committee = await GroupsModel.findOne({ GroupType: 1, Delete: 0 }).exec()
    const findUser = async (element) => {
      let emailId = element + "@gmail.com"

      await User.findOne({
        $and: [{ Email: emailId }, { Delete: 0 }],
      }).then(async (resp) => {

        if (resp !== null) {


          let set = { Message: "", PostId: "", PostedUser: "", TaggedUser: "" }
          set.Message = flag == 1 ? "Recreation Committee tagged you in a Post" : req.User.UserName + " tagged you in a Post";
          set.PostId = postData._id;
          set.PostedUser = req.User._id;
          set.TaggedUser = resp?._id

          notifyList.push(set)
        }
        else {

          await Group.findOne({
            $and: [{ GroupName: element }, { Delete: 0 }],
          }).then((groupResp) => {
            let setList = { Message: "", PostId: "", PostedUser: "", TaggedGroup: "" }
            setList.Message = "your group " + element + " tagged in a post";
            setList.PostId = postData._id;
            setList.PostedUser = req.User._id;
            setList.TaggedGroup = groupResp?._id
            notifyList.push(setList)

          })
        }
      })
    }

    let List = [];
    List = req.body.Tags

    for (let element of List) {
      await findUser(element);
    }

    if (List.indexOf("Recreation Committee") != -1) {
      let setList = { Message: "", PostId: "", PostedUser: "", TaggedGroup: "" }
      setList.Message = "Recreation Committee tagged in a post";
      setList.PostId = postData._id;
      setList.PostedUser = req.User._id;
      setList.TaggedGroup = committee._id.valueOf()
      notifyList.push(setList)
    }

    if (List.length == 0) {
      await Group.findOne({
        $and: [{ _id: req.User.GroupId }, { Delete: 0 }],
      }).then((resp) => {
        let setList = { Message: "", PostId: "", PostedUser: "", TaggedGroup: "" }
        setList.Message = "your group " + resp.GroupName + " tagged  in a post";
        setList.PostId = postData._id;
        setList.PostedUser = req.User._id;
        setList.TaggedGroup = req.User.GroupId
        notifyList.push(setList)
      })
    }
    let options = { upsert: true };
    await NotificationModel.insertMany(notifyList, options).then((response) => {
      res.send("saved")
    })
  } catch (error) {
    logger.error(`${error.status || 500} - 'error' - ${error.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    res.status(400).send({ msg: 'error in post creation', error });
  }
}

async function getTagsPost(req, res, postdata, flag) {
  let listTags = []
  listTags = req.body.Tags;
  if (listTags?.length > 0) {
    await notify(req, res, postdata, flag);
  }
  else {
    res.send("saved")
  }
}



exports.updatePostImage = async (req, res) => {
  try {
    let pathList = []
    let array=[]

    if (req.files.length > 0) {
      req.files.forEach(data => {
        pathList.push(Image_Path + data.filename)

      });
    }
    const postId = req.body.postId;
    const post = await PostModel.findById(postId);
   array = req.body.imageDeleteArray?.toString().split(",");
    // const array1 = JSON.parse(array);
    const genericvalue = req.headers.genericvalue;
    if (post?.UserId.valueOf() != req.User._id.valueOf()) {
      return res.status(403).json({
        errorCode: 510,
        errorMsg: "Can only edit your post"
      })
    }
    const copy = JSON.parse(JSON.stringify(post));
    if (array?.length > 0) {
      array.forEach(i => {
        if (post.PostImage.length > 0) {
          post.PostImage.remove(copy.PostImage[i])

        }
      });


    }
    const flattenedArray = [...pathList, ...post.PostImage];
    if (post) {
      post.PostDescription = req.body.PostDescription;
      post.UserId = req.User._id.valueOf();
      post.PostedUser = req.User.UserName;
      post.HashTags = req.body.HashTags;
      if (req.body.imageStatus === "0") {
        post.PostImage = null;
      }
      if (req.files.length > 0) {
        post.PostImage = flattenedArray;
      }
      if (genericvalue == 1) {
        post.PostedUser = "Recreation Committee";
      }
      await post.save().then((data) => {
        let flag = genericvalue
        notify1(req, res, data, flag, postId)
      })
    }

  } catch (error) {
    console.log(error);
    res.status(400).send(error)
  }
};
async function notify1(req, res, data, flag, editPostId) {
  try {
    let notifyList = [];
    const findUser = async (element) => {
      let emailId = element + "@gmail.com";
      await User.findOne({
        $and: [{ Email: emailId }, { Delete: 0 }],
      }).then(async (resp) => {
        if (resp !== null) {
          let set = { Message: "", PostId: "", PostedUser: "", TaggedUser: "" };
          set.Message =
            flag == 1
              ? "Recreation Committee tagged you in a Post"
              : req.User.UserName + " tagged you in a Post";
          set.PostId = data._id;
          set.PostedUser = req.User._id;
          set.TaggedUser = resp?._id;
          console.log(set.Message);
          notifyList.push(set);
        } else {
          await Group.findOne({
            $and: [{ GroupName: element }, { Delete: 0 }],
          }).then((resp) => {
            let setList = {
              Message: "",
              PostId: "",
              PostedUser: "",
              TaggedGroup: "",
            };
            setList.Message = "your group " + element + " tagged in a post";
            setList.PostId = data._id;
            setList.PostedUser = req.User._id;
            setList.TaggedGroup = resp?._id;
            notifyList.push(setList);
          });
        }
      });
    };

    let List = [];
    List = req.body.Tags;
    await NotificationModel.updateMany({ PostId: editPostId }, { $set: { Status: 0 } });
    if (List?.length > 0) {
      for (let element of List) {
        console.log(List.indexOf("Recreation"));
        await findUser(element);
      }
    } else {
      return res.status(200).send("Updated")
    }
    if (List.indexOf("Recreation") != -1) {
      let setList = {
        Message: "",
        PostId: "",
        PostedUser: "",
        TaggedGroup: "",
      };
      setList.Message = "Recreation Committee tagged in a post";
      setList.PostId = data._id;
      setList.PostedUser = req.User._id;
      setList.TaggedGroup = "63d11da066c2aca9be2e9c64";
      notifyList.push(setList);
    }

    let options = { upsert: true };
    await NotificationModel.insertMany(notifyList, options).then((response) => {
      res.status(200).send("Updated");
    });
  } catch (error) {
    logger.error(
      `${error.status || 500} - 'error' - ${error.message} - ${req.originalUrl
      } - ${req.method} - ${req.ip}`
    );

    res.status(400).send({ msg: "error in post updation", error });
  }
}

exports.postImage = async (req, res, next) => {
  let pathList = []


  if (req.files.length > 0) {
    req.files.forEach(data => {
      pathList.push(Image_Path + data.filename)

    });
  }
  const genericvalue = req.headers.genericvalue
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).send(errors.errors[0].msg);
  }
  const switchVar = req.headers.genericvalue;
  switch (switchVar) {
    case "1":
      const newpost = new Post({
        PostDescription: req.body.PostDescription,
        UserId: req.User._id,
        PostedUser: "Recreation Committee",
        HashTags: req.body.HashTags,
      })
      if (pathList.length > 0) {
        newpost.PostImage = pathList
      }

      await newpost.save().then(async (post) => {
        console.log(post, "+++++++++++++++++++++=====");
        const flag = genericvalue
        getTagsPost(req, res, post, flag)
      }).catch((error) => {
        logger.error(`${error.status || 500} - 'error' - ${error.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        res.status(400).send({ msg: 'error in post creation', error });
      })
      return true;

    case "0":

      const newpost2 = new Post({
        PostDescription: req.body.PostDescription,
        UserId: req.User._id,
        PostedUser: req.User.UserName,
        HashTags: req.body.HashTags,
      })

      if (pathList.length > 0) {
        newpost2.PostImage = pathList
      }

      await newpost2.save().then(async (post) => {
        const flag = false
        getTagsPost(req, res, post, flag)
      }).catch((error) => {
        logger.error(`${error.status || 500} - 'error' - ${error.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        res.status(400).send({ msg: 'error in post creation', error });
      })
      return true;

    case "2":
      break;

    default:
      break;

  }

}




exports.findHashPost = (req, res) => {
  try {
    let hashTags = req.params.id;
    PostModel.aggregate([
      {
        "$match": {
          HashTags: { $in: [hashTags] }
        },
      },
      {
        $project: {
          "PostedUser": 0,
          "updatedAt": 0,
          "PersonalTags": 0,
          "GroupTags": 0,
          "Delete": 0,
        }
      },
      { $sort: { "updatedAt": -1 } },
    ]).then((response) => {
      res.send(response)
    }).catch((error) => {
      logger.error(`${error.status || 500} - 'error' - ${error.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
      res.status(400).send(error)
    })
  } catch (e) {
    logger.error(`${e.status || 500} - 'error' - ${e.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    res.status(400).send(e)
  }
}


exports.hashtagSearch = (async (req, res) => {

  try {
    const list2 = "[]";
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.send(errors.errors[0].msg);
    }
    const tags = req.query.tags

    let filter = { $and: [{ HashTags: { $in: [new RegExp(tags, 'i')] } }, { Tags: "1" }, { Delete: 0 }] }
    if (tags === "") {
      res.send(list2)
    }
    else {
      Post.aggregate([
        {
          $match: filter
        },
        {
          $sort: { "updatedAt": -1 }
        },
        {
          $lookup: {
            from: "userstables", localField: "UserId", foreignField: "_id", as: "userlist"
          }
        },
        {
          $project: {
            "userlist.Password": 0,
            "userlist.Otp": 0,
            "userlist.GroupRole": 0,
            "userlist.Designation": 0,
            "userlist.Delete": 0,
            "userlist.GroupId": 0,
            "userlist.CommitteeId": 0,
            "userlist.CommitteeRole": 0,
            "userlist.CommitteCreateDate": 0,
            "userlist.GroupCreateDate": 0,
            "userlist.DOB": 0,
            "userlist.UserNameSearch": 0,
            "userlist.Type": 0,
            "userlist.createdAt": 0,
            "userlist.updatedAt": 0,
            "userlist.__v": 0,
          }
        }
      ]).then((posts) => {
        if (posts == "[]") {
          res.status(200).json("no data found");
        }
        else {
          res.status(200).json(posts);
        }
      }).catch((error) => {
        logger.error(`${error.status || 500} - 'error' - ${error.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        res.status(400).json({ message: error })
      })
    }
  }
  catch (e) {
    logger.error(`${e.status || 500} - 'error' - ${e.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    res.status(400).json({ message: e })
  }
})



async function notifyPrivate(req, res, privatePostDetails) {
  try {
    let notifyList = [];

    const findUser = async (element) => {
      let emailId = element + "@gmail.com"
      await User.findOne({ $and: [{ Email: emailId }, { GroupId: req.User.GroupId }, { Delete: 0 }] }).then(async (resp) => {
        if (resp !== null) {
          let set = { Message: "", PostId: "", PostedUser: "", TaggedUser: "" }
          set.Message = req.User.UserName + " tagged you in a Post";
          set.PostId = privatePostDetails._id;
          set.PostedUser = req.User._id;
          set.TaggedUser = resp?._id
          notifyList.push(set)
        }
      })
    }
    let List = [];
    List = req.body.Tags
    for (let element of List) {
      await findUser(element);
    }

    let options = { upsert: true };
    await NotificationModel.insertMany(notifyList, options).then((response) => {
      res.send("saved")
    })
  }
  catch (error) {
    logger.error(`${error.status || 500} - 'error' - ${error.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    res.status(400).send({ msg: 'error in post creation', error });
  }

}


async function checkTagsAndGroupId(req, res) {
  try {
    let tagsList = req.body.Tags
    let userList = []
    if (req.User.GroupId == "0")
      return "Cannot make a private post unless you belong to a group";

    else if (tagsList?.length > 0) {
      for (const tags of tagsList) {
        let emailId = tags + "@gmail.com"
        const taggedUser = await User.findOne({ $and: [{ Email: emailId }, { Delete: 0 }] }, { UserName: true, GroupId: true }).exec()
        if (taggedUser?.GroupId != req.User.GroupId) {
          userList.push(tags)
        }
      }
      if (userList?.length > 0) {
        return "Mentioned user " + userList + " is not your group member.";
      }
    }
  }
  catch (error) {
    logger.error(`${error.status || 500} - 'error' - ${error.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    res.status(400).send(error)
  }
}

async function getTags(req, res, privatePostData) {
  let listTags = []
  listTags = req.body.Tags;
  if (listTags?.length > 0) {
    await notifyPrivate(req, res, privatePostData);
  }
  else {
    res.send("saved")
  }
}

exports.postImagePrivateEdit = async (req, res) => {
  let pathList = [];
  let array=[];


  if (req.files.length > 0) {
    req.files.forEach(data => {
      pathList.push(Image_Path + data.filename)

    });
  }
  const postId = req.body.postId;
  const post = await PostModel.findById(postId);
  array = req.body.imageDeleteArray?.toString().split(","); 
  if (!post) {
    res.status(400).json({
      errorCode: 511,
      errorMsg: "Post not found"
    })
  }
  if (post.UserId.valueOf() != req.User._id.valueOf()) {
    return res.status(403).json({
      errorCode: 510,
      errorMsg: "Can only edit your post"
    })
  }
  const copy = JSON.parse(JSON.stringify(post));
  if (array.length > 0) {
    array.forEach(i => {
      if (post.PostImage.length > 0) {
        post.PostImage.remove(copy.PostImage[i])

      }
    });


  }
  const flattenedArray = [...pathList, ...post.PostImage];
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).send(errors.errors[0].msg);
  }
  const errorMsg = await checkTagsAndGroupId(req, res);
  if (req.body.imageStatus === 0) {
    post.PostImage = null;
  }
  if (errorMsg)
    return res.status(400).send({ message: errorMsg, errorCode: 400 })
  post.PostDescription = req.body.PostDescription;
  post.UserId = req.User._id.valueOf();
  post.PostedUser = req.User.UserName;
  post.HashTags = req.body.HashTags;
  post.Tags = req.User.GroupId
  if (req.files.length > 0) {
    post.PostImage =flattenedArray
  }
  await post.save().then(async (postWithFile) => {
    await notifyPrivate1(req, res, postWithFile, postId)
  })


}
async function notifyPrivate1(req, res, privatePostDetails, privatePostId) {
  try {
    let notifyList = [];

    const findUser = async (element) => {
      let emailId = element + "@gmail.com"
      await User.findOne({ $and: [{ Email: emailId }, { GroupId: req.User.GroupId }, { Delete: 0 }] }).then(async (resp) => {
        if (resp !== null) {
          let set = { Message: "", PostId: "", PostedUser: "", TaggedUser: "" }
          set.Message = req.User.UserName + " tagged you in a Post";
          set.PostId = privatePostDetails._id;
          set.PostedUser = req.User._id;
          set.TaggedUser = resp?._id
          notifyList.push(set)
        }
      })
    }
    let List = [];
    List = req.body.Tags
    await NotificationModel.updateMany({ PostId: privatePostId }, { $set: { Status: 0 } });
    if (List?.length > 0) {
      for (let element of List) {
        await findUser(element);
      }
      let options = { upsert: true };
      await NotificationModel.insertMany(notifyList, options).then((response) => {
        res.status(200).send("Updated")
      })
    }
    else {
      res.status(200).send("Updated")
    }
  }
  catch (error) {
    logger.error(`${error.status || 500} - 'error' - ${error.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    res.status(400).send({ msg: 'error in post creation', error });
  }

}

exports.postImagePrivate = (async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).send(errors.errors[0].msg);
    }
    const errorMsg = await checkTagsAndGroupId(req, res);
    if (errorMsg)
      return res.status(400).send({ message: errorMsg, errorCode: 400 })

    if (req.files[0]?.filename) {

      const newpost2 = new Post({

        PostDescription: req.body.PostDescription,
        UserId: req.User._id,
        PostImage: Image_Path + req.files[0].filename,
        PostedUser: req.User.UserName,
        HashTags: req.body.HashTags,
        Tags: req.User.GroupId

      })
      await newpost2.save().then(async (postWithFile) => {
        await getTags(req, res, postWithFile)
      }).catch((err) => {
        logger.error(`${err.status || 500} - 'error' - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        res.status(400).send({ msg: 'error in post creation', err });
      })
      return true;
    }
    else {
      const newpost2 = new Post({

        PostDescription: req.body.PostDescription,
        UserId: req.User._id,
        PostedUser: req.User.UserName,
        HashTags: req.body.HashTags,
        Tags: req.User.GroupId

      })
      await newpost2.save().then(async (postWithoutFile) => {
        await getTags(req, res, postWithoutFile)
      }).catch((er) => {
        logger.error(`${er.status || 500} - 'error' - ${er.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        res.status(400).send({ msg: 'error in post creation', er });
      })
      return true;
    }

  }
  catch (e) {
    logger.error(`${e.status || 500} - 'error' - ${e.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    res.status(400).send(e)
  }
})





exports.getPrivatePostsOfCurrentUser = (req, res) => {
  try {
    Post.aggregate([
      {
        $match: {
          $and: [{ Tags: req.User.GroupId }, { Delete: 0 }]
        }
      },
      {
        $sort: { updatedAt: -1 }
      },
      {
        $lookup: { from: "userstables", localField: "UserId", foreignField: "_id", as: "userlist" }
      },
      {
        $lookup: {
          from: "comments", localField: "Comments", foreignField: "_id", as: "Comments",
          pipeline: [{ $sort: { "createdAt": -1 } }, { $limit: 3 }]
        }
      },
      {
        $project: {
          "userlist.Password": 0,
          "userlist.Otp": 0,
          "userlist.GroupRole": 0,
          "userlist.Designation": 0,
          "userlist.Delete": 0,
          "userlist.GroupId": 0,
          "userlist.CommitteeId": 0,
          "userlist.CommitteeRole": 0,
          "userlist.CommitteCreateDate": 0,
          "userlist.GroupCreateDate": 0,
          "userlist.DOB": 0,
          "userlist.UserNameSearch": 0,
          "userlist.Type": 0,
          "userlist.createdAt": 0,
          "userlist.updatedAt": 0,
          "userlist.__v": 0,
          "Comments.UserId": 0,
          "Comments.PostId": 0,
          "Comments.Delete": 0,
          "Comments.updatedAt": 0,
        }
      }
    ]).then((result) => {
      res.status(200).send(result)
    }).catch((err) => {
      logger.error(`${err.status || 500} - 'error' - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
      res.status(400).send({ message: err.message });
    })
  }
  catch (error) {
    logger.error(`${error.status || 500} - 'error' - ${error.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    res.send(error)
  }
}



exports.postsByUser = (async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).send(errors.errors[0].msg);
    }

    let filter = { 'Delete': 0, 'Tags': "1", 'UserId': new mongoose.Types.ObjectId(req.params.id), 'PostedUser': { $not: { $regex: /Recreation Committee/ } } }

    let userLookup = { from: "userstables", localField: "UserId", foreignField: "_id", as: "userlist" }

    let commentLookup = { from: "comments", localField: "Comments", foreignField: "_id", as: "Comments", pipeline: [{ $sort: { "createdAt": -1 } }, { $limit: 3 }] }

    let projection = {
      "userlist.Password": 0, "userlist.Otp": 0, "userlist.GroupRole": 0, "userlist.Designation": 0, "userlist.Delete": 0,
      "userlist.GroupId": 0, "userlist.CommitteeId": 0, "userlist.CommitteeRole": 0, "userlist.CommitteCreateDate": 0, "userlist.GroupCreateDate": 0,
      "userlist.DOB": 0, "userlist.UserNameSearch": 0, "userlist.Type": 0, "userlist.createdAt": 0, "userlist.updatedAt": 0,
      "userlist.__v": 0, "Comments.UserId": 0, "Comments.PostId": 0, "Comments.Delete": 0, "Comments.updatedAt": 0
    }

    let pipeline = [{ $match: filter }, { $sort: { createdAt: -1 } }, { $lookup: userLookup }, { $lookup: commentLookup }, { $project: projection }]

    Post.aggregate(pipeline).then((result) => {
      res.status(200).send(result)
    }).catch((error) => {
      logger.error(`${error.status || 500} - 'error' - ${error.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
      res.status(400).send(error)
    })
  }
  catch (e) {
    logger.error(`${e.status || 500} - 'error' - ${e.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    res.status(400).send(e)
  }

})


exports.convertPrivatePostPublic = async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).send(errors.errors[0].msg);
    }
    const post = await Post.findById(req.params.id).exec()
    if (post.Tags == 1) {
      return res.status(400).send("Post is already public")
    }
    Post.findByIdAndUpdate(req.params.id, { $set: { Tags: "1" } }).then((publicPost) => {
      if (publicPost)
        res.status(200).send("Post made public")
    }).catch((err) => {
      logger.error(`${err.status || 500} - 'error' - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
      res.status(400).send(err)
    })
  }
  catch (error) {
    logger.error(`${error.status || 500} - 'error' - ${error.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    res.status(400).send(error)
  }
}


exports.getPostsOfCommittee = async (req, res) => {
  try {

    Post.aggregate([
      {
        $match: {
          'Delete': 0,
          'PostedUser': { $regex: /Recreation Committee/ }
        }
      },
      {
        $sort: {
          "createdAt": -1
        }
      },
      {
        $lookup: {
          from: "userstables", localField: "UserId", foreignField: "_id", as: "userlist"
        },
      },
      {
        $lookup: {
          from: "comments", localField: "Comments", foreignField: "_id", as: "Comments",
          pipeline: [{ $sort: { "createdAt": -1 } }, { $limit: 3 }]
        }
      },
      {
        $project: {
          "userlist.Password": 0,
          "userlist.Otp": 0,
          "userlist.GroupRole": 0,
          "userlist.Designation": 0,
          "userlist.Delete": 0,
          "userlist.GroupId": 0,
          "userlist.CommitteeId": 0,
          "userlist.CommitteeRole": 0,
          "userlist.CommitteCreateDate": 0,
          "userlist.GroupCreateDate": 0,
          "userlist.DOB": 0,
          "userlist.UserNameSearch": 0,
          "userlist.Type": 0,
          "userlist.createdAt": 0,
          "userlist.updatedAt": 0,
          "userlist.__v": 0,
          "Comments.UserId": 0,
          "Comments.PostId": 0,
          "Comments.Delete": 0,
          "Comments.updatedAt": 0,
        }
      }
    ]).then((result) => {
      res.status(200).send(result)
    }).catch((error) => {
      logger.error(`${error.status || 500} - 'error' - ${error.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
      res.status(400).send(error)
    })
  }
  catch (e) {
    logger.error(`${e.status || 500} - 'error' - ${e.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    res.send(e)
  }
}