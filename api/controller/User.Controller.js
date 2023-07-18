const UserTable = require("../models/User.Model.js");
const User = require("../models/User.Model.js");
const Gallery = require("../models/HomeGallery.Model");
const Group = require("../models/Groups.Model");
const Image_Path = process.env.Image_Path
const joi = require('@hapi/joi');
const logger = require('../utils/logger.utils')
let cron = require('node-cron');
const mongoose = require('mongoose')

const { validationResult } = require('express-validator');
const GroupsModel = require("../models/Groups.Model");
const { lock } = require("../routes/User.Routes.js");


const Schema = joi.object().keys({
  GroupId: joi.string().alphanum(),
  id: joi.string().alphanum(),
  Role: joi.number(),

})


exports.updateuser = (req, res) => {
  if (req.body.UserName == "" || req.body.UserName == null)

    res.status(400).send("Username cannot be empty")
  else {
    User.findByIdAndUpdate(req.params.id, { $set: req.body }).then((data) => {
      res.status(200).send("User Profile Updated")
    }).catch((error) => {
      logger.error(`${error.status || 500} - 'error' - ${error.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
      res.status(400).send(error)
    })
  }
}



exports.deleteuser = (req, res) => {
  User.findByIdAndDelete(req.params.id).then((data) => {
    res.status(200).send("deleted successfully")
  }).catch((error) => {
    logger.error(`${error.status || 500} - 'error' - ${error.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    res.status(403).json(error)
  })
}


exports.FindbyNameAndEmail = (req, res) => {
  const keyword =
  {
    $and: [
      { username: { $regex: req.query.username } },
      { email: { $regex: req.query.email } }
    ],
  }
  User.find(keyword).find({ _id: { $ne: req.params.id } }).then((data) => {
    res.status(200).send(data)
  })
}



exports.FindByEmail = (req, res) => {
  logger.info("inside loggin  " + req.body)
  const keyword =
  {
    $and: [
      { Email: req.body.email }, { Delete: 0 }
    ]
  }

  UserTable.findOne(keyword).then((response) => {
    if (response.Type != null) {
      logger.info("inside loggin  " + req.body)
      res.status(200).json(response.Type)
    }
    else {
      res.status(404).send("User Not Exist")
    }
  }).catch((error) => {
    logger.error(`${error.status || 500} - 'error' - ${error.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    res.status(400).json(error)
  })

}



exports.displayallusers = (req, res) => {

  User.aggregate([
    {
      $match: { "Delete": 0 }
    },
    {
      $lookup: {
        from: "groups", localField: "GroupIdObj", foreignField: "_id", as: "grouplist"
      }
    },
    { $sort: { "updatedAt": -1 } },
    {
      $project: {
        "UserName": 1,
        "Email": 1,
        "Type": 1,
        "DOB": 1,
        "GroupRole": 1,
        "GroupId": 1,
        "Designation": 1,
        "grouplist.GroupName": 1
      }
    },
  ]).then(async (data) => {
    res.status(200).send(data)
  }).catch((error) => {
    logger.error(`${error.status || 500} - 'error' - ${error.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    res.status(403).json(error)
  })

}



exports.getGropuMembers = (req, res) => {
  User.find({ "GroupRole": req.body.GroupRole }).then((data) => {
    res.status(200).send(data)
  }).catch((error) => {
    logger.error(`${error.status || 500} - 'error' - ${error.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    res.status(403).json(error)
  })
}


exports.findByEmailRegex = async (req, res, next) => {
  try {
    await UserTable.find({ $and: [{ CommitteeId: "0" }, { Delete: 0 }, { 'Email': { '$regex': '^' + req.params.Email, $options: 'i' } }] })
      .then((resp) => {
        res.status(200).send(resp);
      }).catch((error) => {
        logger.error(`${error.status || 500} - 'error' - ${error.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        res.status(400).send(error)
      })
  } catch (e) {
    logger.error(`${e.status || 500} - 'error' - ${e.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    res.status(400).send(e)
  }
}



exports.paginationRecord = async (req, res, next) => {

  let condition = [{ $and: [{ Type: { '$lt': 2 } }, { Delete: 0 }] }]
  let currentPage = 0;
  let pageSize = 0;
  let skip = 0;
  let limit = 0;
  try {

    if (!req.body) {

      let responseObj = {
        "status": "error",
        "msg": "Input is missing.",
        "body": {}
      }
      res.status(403).send(responseObj);
    } else {


      if (req.body.UserName) {

        condition.push({ 'UserName': { '$regex': req.body.UserName, $options: 'i' } });

      }
      if (req.body.Designation) {

        condition.push({ "Designation": req.body.Designation });

      }
      if (req.body.currentPage && req.body.pageSize) {



        currentPage = req.body.currentPage;
        pageSize = req.body.pageSize;

        skip = pageSize * (currentPage - 1);
        limit = pageSize;

      }

      await UserTable.find({ $and: condition }).skip(skip).limit(limit).then((docs) => {

        let responseObj = {
          "status": "success",
          "msg": "Record found.",
          "body": docs
        }
        res.status(200).send(responseObj);

      }).catch((err) => {
        let responseObj = {
          "status": "error",
          "msg": "Input is missing.",
          "body": {}
        }
        res.status(403).send(responseObj);
      })
    }
  } catch (error) {
    logger.error(`${error.status || 500} - 'error' - ${error.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    res.status(401).send(error)
  }
}


exports.AddNewUsersToGroup = (req, res) => {
  User.find({ $and: [{ GroupId: "0" }, { Delete: 0 }, { Type: { '$lt': 2 } }] }, { UserName: true, Email: true, Type: true, DOB: true, GroupRole: true, Designation: true }).sort({ "updatedAt": -1 }).then((data) => {
    res.status(200).send(data)
  }).catch((error) => {
    logger.error(`${error.status || 500} - 'error' - ${error.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    res.status(403).json(error)
  })
}



exports.updateProfileImage = (req, res) => {
  const ImagePath = Image_Path + req.files[0].filename
  UserTable.updateOne({ _id: req.params.id }, { $set: { UserImage: ImagePath } }).then((data) => {
    res.status(200).send(data)
  }).catch((error) => {
    logger.error(`${error.status || 500} - 'error' - ${error.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    res.status(401).send(error)
  })
}


exports.AddNewUsersToCommittee = (req, res) => {
  User.find({ $and: [{ CommitteeId: "0" }, { Delete: 0 }, { Type: { $ne: 2 } }] }, { UserName: true, Email: true, Type: true, DOB: true, GroupRole: true, Designation: true }).sort({ "updatedAt": -1 }).then((data) => {
    res.status(200).send(data)
  }).catch((error) => {
    logger.error(`${error.status || 500} - 'error' - ${error.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    res.status(403).json(error)
  })

}


exports.searchUser = async (req, res) => {
  const { searchQuery } = req.query
  try {
    const value = new RegExp(searchQuery, 'i');
    const searchdata = await User.find({ $or: [{ UserName: value }] }).exec();
    res.status(200).json({ data: searchdata });
  }
  catch (error) {
    logger.error(`${error.status || 500} - 'error' - ${error.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    res.status(404).json({ message: error.message })
  }

}





exports.currentUserDetails = (req, res) => {
  try {
    User.findById(req.User._id, { UserName: true, Email: true, Type: true, Designation: true, DOB: true, GroupRole: true, UserImage: true }).then((data) => {
      res.status(200).send(data)
    }).catch((error) => {
      logger.error(`${error.status || 500} - 'error' - ${error.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
      res.status(400).send(error)
    })
  }
  catch (e) {
    logger.error(`${e.status || 500} - 'error' - ${e.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    res.status(400).send(e)
  }
}


exports.updateGroupCapandVC = (req, res) => {
  try {

    const reqbody = ({
      GroupId: req.body.GroupId,
      Role: req.body.role,
      id: req.params.id
    })


    let Validation = Schema.validate(reqbody)
    if (!Validation.error) {
      if (req.body.role === 2) {



        User.findOneAndUpdate({ $and: [{ GroupRole: 2 }, { GroupId: req.body.GroupId }] }, { $set: { GroupRole: 0 } })
          .catch((er) => {
            logger.error(`${er.status || 500} - 'error' - ${er.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
            res.status(401).send(er)
          })
        User.findOneAndUpdate({ $and: [{ _id: req.params.id }, { GroupId: req.body.GroupId }, { Delete: 0 }] }, { $set: { GroupRole: 2 } }).then((data) => {
          res.status(200).send({ msg: "Role changed to captain" });
        }).catch((err) => {
          logger.error(`${err.status || 500} - 'error' - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
          res.status(400).json(err)
        })
      }


      if (req.body.role === 1) {



        User.findOneAndUpdate({ $and: [{ GroupRole: 1 }, { GroupId: req.body.GroupId }] }, { $set: { GroupRole: 0 } })
          .catch((error1) => {
            logger.error(`${error1.status || 500} - 'error' - ${error1.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
            res.status(401).send(error1)
          })
        User.findOneAndUpdate({ $and: [{ _id: req.params.id }, { GroupId: req.body.GroupId }, { Delete: 0 }] }, { $set: { GroupRole: 1 } }).then((data) => {
          res.status(200).send({ msg: "Role changed to vice captain" });
        }).catch((error2) => {
          logger.error(`${error2.status || 500} - 'error' - ${error2.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
          res.status(400).json(error2)
        })
      }
    }

    else {


      res.status(400).send(Validation.error)
    }
  }
  catch (e) {


    logger.error(`${e.status || 500} - 'error' - ${e.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    res.status(401).send(e)
  }
}


exports.findByEmailRegexForGroup = async (req, res) => {

  try {
    await UserTable.find({ $and: [{ GroupId: "0" }, { Delete: 0 }, { Type: { '$lt': 2 } }, { 'Email': { '$regex': '^' + req.params.Email, $options: 'i' } }] }).then((resp) => {

      res.status(200).send(resp);

    }).catch((err) => {
      logger.error(`${err.status || 500} - 'error' - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
      res.status(401).send(err)
    })

  } catch (error) {
    logger.error(`${error.status || 500} - 'error' - ${error.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    res.status(401).send(error)
  }
}






exports.findByNameRegexForMention = async (req, res) => {

  const committee = await GroupsModel.findOne({ GroupType: 1, Delete: 0 }).exec()



  const addUser = async (resp) => {

    let listSearch = [];


    for (const element of resp) {


      let userSet = { text: "", value: "", url: "" }
      userSet.text = element.UserNameSearch;
      userSet.value = element.UserNameSearch;
      userSet.url = element._id;
      listSearch.push(userSet);
    }

    return listSearch;
  }


  const addGroup = async (data) => {


    Group.find({ $and: [{ GroupType: "0" }, { Delete: 0 }] }).sort({ "createdAt": -1 }).then(async (response) => {

      let list = []
      list = data


      for (const element of response) {


        let userSet = { text: "", value: "", url: "" }

        userSet.text = element.GroupName;
        userSet.value = element.GroupName;
        userSet.url = element._id;
        list.push(userSet);

      }




      let committeeSet = { text: "Recreation Committee", value: "Recreation Committee", url: committee?._id.valueOf() }


      await list.push(committeeSet);


      res.status(200).send({ "searchList": list })



    }).catch((error) => {

      

      logger.error(`${error.status || 500} - 'error' - ${error.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
      res.status(403).json(error)
    })
  }
  try {
    await UserTable.find({ $and: [{ Delete: 0 }, { Type: { '$lt': 2 } }] }, { UserName: 1, Email: 1, UserNameSearch: 1, _id: 1 })
      .then(async (resp) => {

        let data = await addUser(resp);

        await addGroup(data)

      }).catch((err) => {

        logger.error(`${err.status || 500} - 'error' - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        res.status(401).send(err)
      })

  } catch (e) {

    logger.error(`${e.status || 500} - 'error' - ${e.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    res.status(401).send(e)
  }

}


exports.searchOnInnovators = (async (req, res) => {

  try {
  
    const errors = validationResult(req)
  
    if (!errors.isEmpty()) {
      return res.status(400).send(errors.errors[0].msg);
    }
    const { UserName, Email, Designation, Type, fromDOB, toDOB } = req.query
    const { Committee, GroupId } = req.body;

    let searchQuery = {}
    searchQuery.Delete = 0;

    if (GroupId) {
      searchQuery.GroupId = GroupId;
    }

    if (Committee == 1) {
      searchQuery.Type = 1
      searchQuery.CommitteeId = req.body.CommitteeId
    }
    if (UserName)
      searchQuery.UserName = new RegExp(UserName, 'i')

    if (Designation)
      searchQuery.Designation = new RegExp(Designation, 'i')
     

    if (Type)
      searchQuery.TypeSearch = new RegExp(Type, 'i')

    if (fromDOB && toDOB)
      searchQuery.DOB = { $gte: new Date(fromDOB), $lte: new Date(toDOB) }

    if (Email)
      searchQuery.Email = { $regex: '^' + Email, $options: 'i' }
    const pipeline = [
      { $match: searchQuery },
      { $sort: { updatedAt: -1 } },
      { $lookup: { from: "groups", localField: "GroupIdObj", foreignField: "_id", as: "grouplist" } },
      { $project: { UserName: true, Email: true, DOB: true, Designation: true, Type: true, GroupRole: true, "grouplist.GroupName": true } }
    ];
    await User.aggregate(pipeline).then((users) => {
      res.status(200).json(users);
    }).catch((error) => {
      logger.error(`${error.status || 500} - 'error' - ${error.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
      res.status(400).json({ message: error })
    })

  }
  catch (e) {
    logger.error(`${e.status || 500} - 'error' - ${e.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    res.status(400).json({ message: e })
  }
})




exports.birthdaysOfCurrentMonth = async (req, res) => {
  try {

    let birthdaysOfThisMonth = []
    let date = new Date()
  

    let month = date.getMonth() + 1;
    birthdaysOfThisMonth.length = 0;
    

    const users = await User.find({ Delete: 0 }, { UserName: true, UserImage: true, DOB: true, BirthdayCard: true }).sort({ DOB: 1 }).exec();
    
    users.forEach((element) => {
      
      if (((element.DOB.getMonth()) + 1) === month) {
        console.log("6");

        birthdaysOfThisMonth.push(element);
      }
    })
   

    const sortedBirthdayList = birthdaysOfThisMonth.slice().sort((a, b) => {
      const dayA = a.DOB.getUTCDate();
      const dayB = b.DOB.getUTCDate();
      return dayA - dayB;
    })
   

    res.status(200).send(sortedBirthdayList)

  }
  catch (error) {

    res.status(400).send(error);
  }
}


exports.getUserOrGroupDetails = async (req, res) => {
  try {

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).send(errors.errors[0].msg);
    }

    const user = await User.findOne({ $and: [{ _id: req.params.id }, { Delete: 0 }] }, { UserName: true, UserImage: true, Email: true, UserNameSearch: true, DOB: true, Type: true, Designation: true }).exec()

    if (user) {
     

      let userData = { userDetails: user }
      return res.status(200).send(userData)
    }
   


    const group = await Group.findOne({ $and: [{ _id: req.params.id }, { Delete: 0 }] }).exec()


    if (!group) {
      return res.status(400).send("Profile not found")
    }
    


    let details = [group]
    let data = {}

    switch (group.GroupType) {

      case 1:
      
        const committee = await Group.find({ $and: [{ GroupType: 1 }, { Delete: 0 }] }).exec()
      
        
        const committeeMembers = await User.find({ $and: [{ CommitteeId: committee[0]._id }, { Delete: 0 }] }, { UserName: true, UserImage: true, Email: true, UserNameSearch: true, DOB: true, Type: true, Designation: true }).exec()

        details = [...details, ...committeeMembers];
        data = { committeeDetails: details };
        return res.status(200).send(data);


      case 0:


        const groupData = await Group.find({ _id: req.params.id }).exec()
    

        const groupMembers = await User.find({ $and: [{ GroupId: groupData[0]._id }, { Delete: 0 }] }, { UserName: true, UserImage: true, Email: true, UserNameSearch: true, DOB: true, Type: true, Designation: true }).exec()

        details = [...details, ...groupMembers];
        data = { groupDetails: details };
        return res.status(200).send(data);

      default:
        return res.status(400).send("Invalid Group Type")

    }

  }
  catch (error) {
    logger.error(`${error.status || 500} - 'error' - ${error.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    res.status(400).json({ message: error })
  }
}



exports.birthdayCardUpload = async (req, res) => {
  try {
    let card;
    const user = await User.findById(req.params.id, { BirthdayCard: true }).exec()
    if (req.files[0]?.filename)
   
      card = Image_Path + req.files[0].filename
    else if (req.body.Delete == 1 && user.BirthdayCard == null)
      return res.status(400).send("Already Deleted");
    else
      card = null

    User.findByIdAndUpdate(req.params.id, { $set: { BirthdayCard: card } }).then(async (data) => {
      res.status(200).send("Updated")
    }).catch((error) => {
      logger.error(`${error.status || 500} - 'error' - ${error.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
      res.status(400).send(error)
    })
  }
  catch (e) {
    logger.error(`${e.status || 500} - 'error' - ${e.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    res.status(400).json({ message: e })
  }
}



exports.userDetails = (req, res) => {

  User.findById(req.params.id, { UserName: true, UserImage: true, BirthdayCard: true, Email: true, DOB: true, Designation: true, UserNameSearch: true, Type: true }).then((user) => {
    res.status(200).json(user)
  }).catch((err) => {
    res.status(500).json(err)
  });
}


exports.findByNameRegexForPrivateMention = async (req, res) => {
  const addUser = async (resp) => {
    let searchList = [];
    for (const element of resp) {
      let userSet = { text: "", value: "", url: "" }

      userSet.text = element.UserNameSearch;
      userSet.value = element.UserNameSearch;
      userSet.url = element._id;
      searchList.push(userSet);
    }
    return searchList;
  }

  try {
    await UserTable.find({ $and: [{ Delete: 0 }, { GroupId: req.User.GroupId }, { Type: { '$lt': 2 } }] }, { UserName: 1, Email: 1, UserNameSearch: 1, _id: 1 }).then(async (resp) => {
      let list = await addUser(resp);
      res.status(200).send({ "searchList": list })
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

exports.addImage = async (req, res) => {
  try {
    let pathList;
    let addImages
    if (req.files.length <= 0) {
       return res.status(400).send({
            errorCode: 704,
            errorMsg: "No Files Recieved"
        })
    }
    if (req.files.length >7) {
      return res.status(400).send({
          errorCode: 901,
          errorMsg: "Only 7 images accepted at a time"
      })
  }


    req.files.forEach(data => {
        pathList=(Image_Path + data.filename)
        if (pathList) {
          addImages = new Gallery({
               ImagePath: pathList,
                Status: 1

            })
            addImages.save()
        }

    });
   return res.status(200).send("Images added successfully")


} catch (error) {
   return res.status(400).send("catch Exception", error)
}


}

exports.getImage = async (req, res) => {
  try {
    const galleryImages=await Gallery.find({Status:1})
   res.status(200).send(galleryImages)
  } catch (error) {
    res.status(400).send("Exception in catch")
  }
}
exports.deleteImage = async (req, res) => {


  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).send(errors.errors[0].msg);
    }
    const condition = { _id: req.body.imageId };
    const update = { $set: { Status: 0 } };
    const deleteGalleryImage = await Gallery.findOneAndUpdate(condition, update)
    if (deleteGalleryImage) {
        res.status(200).send("deleted GalleryImage")
    }
} catch (error) {
    res.status(400).send("catch exception")
}
}




