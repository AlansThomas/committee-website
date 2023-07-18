const notification = require("../models/Notification.Model");
const logger = require("../utils/logger.utils");
const mongoose = require("mongoose");
const UserTable = require("../models/User.Model.js");
const GroupTable = require("../models/Groups.Model");
const PostModel = require("../models/Post.Model");
const Glimpses = require("../models/Glimpses");
const Event = require("../models/Event.Model");
const Image_Path = process.env.Image_Path;
let cron = require("node-cron");

const { validationResult } = require("express-validator");

cron.schedule("* * * * *", async function () {
  try {
    const unUpdate = async () => {
      await UserTable.updateMany(
        { BirthdayStatus: 1 },
        { $set: { BirthdayStatus: 0 } },
        { multi: true }
      ).catch((er) => {
        logger.error(
          `${er.status || 500} - 'error' - ${er.message} - ${
            req.originalUrl
          } - ${req.method} - ${req.ip}`
        );
        console.log(er);
      });
    };

    const update = async (userlist) => {
      await UserTable.updateMany(
        { _id: { $in: userlist } },
        { $set: { BirthdayStatus: 1 } },
        { multi: true }
      ).catch((err) => {
        logger.error(
          `${err.status || 500} - 'error' - ${err.message} - ${
            req.originalUrl
          } - ${req.method} - ${req.ip}`
        );

        console.log(err);
      });
    };
    let today = new Date();

    // Calculate the first day of the week (Sunday)
    let firstDayOfWeek = new Date(
      today.setDate(today.getDate() - today.getDay())
    );
    let secndDayOfWeek = new Date(
      today.setDate(today.getDate() - today.getDay() + 1)
    );
    let thirdDayOfWeek = new Date(
      today.setDate(today.getDate() - today.getDay() + 2)
    );
    let fourthDayOfWeek = new Date(
      today.setDate(today.getDate() - today.getDay() + 3)
    );
    let fifthDayOfWeek = new Date(
      today.setDate(today.getDate() - today.getDay() + 4)
    );
    let sixthDayOfWeek = new Date(
      today.setDate(today.getDate() - today.getDay() + 5)
    );

    // Calculate the last day of the week (Saturday)
    let lastDayOfWeek = new Date(
      today.setDate(today.getDate() - today.getDay() + 6)
    );

    // Format the dates as strings (yyyy-mm-dd)
    let firstDayOfWeekStr = firstDayOfWeek.toISOString().slice(0, 10);
    let secndDayOfWeekStr = secndDayOfWeek.toISOString().slice(0, 10);
    let thirdDayOfWeekStr = thirdDayOfWeek.toISOString().slice(0, 10);
    let fourthDayOfWeekStr = fourthDayOfWeek.toISOString().slice(0, 10);
    let fifthDayOfWeekStr = fifthDayOfWeek.toISOString().slice(0, 10);
    let sixthDayOfWeekStr = sixthDayOfWeek.toISOString().slice(0, 10);
    let lastDayOfWeekStr = lastDayOfWeek.toISOString().slice(0, 10);

    // Print the results
    // console.log("First day of the week: " + firstDayOfWeekStr);
    // console.log("Last day of the week: " + lastDayOfWeekStr);

    let list = [];
    await UserTable.find({ Delete: 0 }).then(async (data) => {
      for (let element of data) {
        const userDOB = element.DOB;

        // Convert user's DOB string to a Date object
        const dobDate = new Date(userDOB);

        // Get today's date as a Date object
        let currentYear = new Date().getFullYear();
        dobDate.setFullYear(currentYear);

        let dates = dobDate.toISOString().slice(0, 10);
        let check =
          firstDayOfWeekStr == dates ||
          secndDayOfWeekStr == dates ||
          thirdDayOfWeekStr == dates ||
          fourthDayOfWeekStr == dates ||
          fifthDayOfWeekStr == dates ||
          sixthDayOfWeekStr == dates ||
          lastDayOfWeekStr == dates;
        // Check if it's the user's birthday
        if (check) {
          list.push(element._id);
        }
      }
      await unUpdate();
      await update(list);
    });
  } catch (e) {
    console.log(e);
  }
});

exports.FindPersonalNotification = (req, res) => {
  try {
    let userId = req.User._id;
    notification
      .aggregate([
        {
          $lookup: {
            from: "posts",
            localField: "PostId",
            foreignField: "_id",
            as: "Postlist",
          },
        },
        {
          $lookup: {
            from: "userstables",
            localField: "PostedUser",
            foreignField: "_id",
            as: "userlist",
          },
        },
        { $sort: { updatedAt: -1 } },
        {
          $match: {
            PersonalTags: { $in: [userId] },
          },
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
            "userlist.PasswordChange": 0,
            PostedUser: 0,
            createdAt: 0,
            updatedAt: 0,
            "Postlist.PersonalTags": 0,
            "Postlist.GroupTags": 0,
            "Postlist.Delete": 0,
          },
        },
      ])
      .then((response) => {
        res.status(200).send(response);
      });
  } catch (error) {
    logger.error(
      `${error.status || 500} - 'error' - ${error.message} - ${
        req.originalUrl
      } - ${req.method} - ${req.ip}`
    );
    res.status(400).send(error);
  }
};

exports.FindGroupNotification = (req, res) => {
  try {
    let groupId = req.User.GroupId;
    notification
      .aggregate([
        {
          $lookup: {
            from: "posts",
            localField: "PostId",
            foreignField: "_id",
            as: "Postlist",
          },
        },
        {
          $match: {
            GroupTags: { $in: [new mongoose.Types.ObjectId(groupId)] },
          },
        },
        {
          $lookup: {
            from: "userstables",
            localField: "PostedUser",
            foreignField: "_id",
            as: "userlist",
          },
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
            "userlist.PasswordChange": 0,
            PostedUser: 0,
            createdAt: 0,
            updatedAt: 0,
            "Postlist.PersonalTags": 0,
            "Postlist.GroupTags": 0,
            "Postlist.Delete": 0,
          },
        },
        { $sort: { updatedAt: -1 } },
      ])
      .then((response) => {
        res.status(200).send(response);
      });
  } catch (error) {
    logger.error(
      `${error.status || 500} - 'error' - ${error.message} - ${
        req.originalUrl
      } - ${req.method} - ${req.ip}`
    );
    res.status(400).send(error);
  }
};

exports.findPost = (req, res) => {
  try {
    let userId = req.User._id;
    let groupId = req.User.GroupId;
    notification
      .aggregate([
        {
          $match: {
            $or: [{ TaggedGroup: groupId }, { TaggedUser: userId }],
          },
        },
        {
          $lookup: {
            from: "posts",
            localField: "PostId",
            foreignField: "_id",
            as: "Postlist",
          },
        },
        { $sort: { updatedAt: -1 } },
        {
          $lookup: {
            from: "userstables",
            localField: "PostedUser",
            foreignField: "_id",
            as: "userlist",
          },
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
            "userlist.PasswordChange": 0,
            PostedUser: 0,
            updatedAt: 0,
            "Postlist.PersonalTags": 0,
            "Postlist.GroupTags": 0,
            "Postlist.Delete": 0,
            "userlist.createdAt": 0,
            "userlist.updatedAt": 0,
            "userlist.GroupCreateDate": 0,
            "userlist.CommitteCreateDate": 0,
          },
        },
      ])
      .then((response) => {
        res.status(200).send(response);
      })
      .catch((error) => {
        logger.error(
          `${error.status || 500} - 'error' - ${error.message} - ${
            req.originalUrl
          } - ${req.method} - ${req.ip}`
        );
        res.status(400).send(error);
      });
  } catch (e) {
    logger.error(
      `${e.status || 500} - 'error' - ${e.message} - ${req.originalUrl} - ${
        req.method
      } - ${req.ip}`
    );
    res.status(400).send(e);
  }
};

exports.findAllNotify = async (req, res) => {
  try {
    const page = req.params.page > 0 ? req.params.page - 1 : 0;
    let userId = req.User._id;
    let groupId = req.User.GroupId;
    if (groupId == "0") {
      await notification
        .aggregate([
          {
            $match: { $or: [{ TaggedUser: userId }, { NotifiedUser: userId }] },
          },
          {
            $match: { PostedUser: { $ne: userId } },
          },
          {
            $sort: { createdAt: -1 },
          },
          {
            $lookup: {
              from: "userstables",
              localField: "PostedUser",
              foreignField: "_id",
              as: "userlist",
            },
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
              "userlist.PasswordChange": 0,
              updatedAt: 0,
              "Postlist.PersonalTags": 0,
              "Postlist.GroupTags": 0,
              "Postlist.Delete": 0,
              "userlist.createdAt": 0,
              "userlist.updatedAt": 0,
              "userlist.GroupCreateDate": 0,
              "userlist.CommitteCreateDate": 0,
            },
          },
          { $skip: page * 10 },
          { $limit: 10 },
        ])
        .then(async (response) => {
          await notification
            .aggregate([
              {
                $match: {
                  $or: [{ TaggedUser: userId }, { NotifiedUser: userId }],
                },
              },
              {
                $match: { PostedUser: { $ne: userId } },
              },
              {
                $match: { Read: 0 },
              },
              { $group: { _id: null, count: { $sum: 1 } } },
            ])
            .then((resp) => {
              let list = [];
              list.push(resp);
              list.push(response);
              res.status(200).send(list);
            });
        })
        .catch((err) => {
          logger.error(
            `${err.status || 500} - 'error' - ${err.message} - ${
              req.originalUrl
            } - ${req.method} - ${req.ip}`
          );
          res.status(400).send(err);
        });
    } else {
      await notification
        .aggregate([
          {
            $match: {
              $or: [
                { TaggedGroup: new mongoose.Types.ObjectId(groupId) },
                { TaggedUser: userId },
                { NotifiedUser: userId },
              ],
            },
          },
          {
            $match: {
              PostedUser: { $ne: userId },
            },
          },
          {
            $sort: { createdAt: -1 },
          },
          {
            $lookup: {
              from: "userstables",
              localField: "PostedUser",
              foreignField: "_id",
              as: "userlist",
            },
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
              "userlist.PasswordChange": 0,
              updatedAt: 0,
              "Postlist.PersonalTags": 0,
              "Postlist.GroupTags": 0,
              "userlist.createdAt": 0,
              "userlist.updatedAt": 0,
              "Postlist.Delete": 0,
              "userlist.GroupCreateDate": 0,
              "userlist.CommitteCreateDate": 0,
            },
          },
          { $skip: page * 10 },
          { $limit: 10 },
        ])
        .then(async (notifyData) => {
          await notification
            .aggregate([
              {
                $match: {
                  $or: [
                    { TaggedGroup: new mongoose.Types.ObjectId(groupId) },
                    { TaggedUser: userId },
                    { NotifiedUser: userId },
                  ],
                },
              },
              {
                $match: { PostedUser: { $ne: userId } },
              },
              {
                $match: { Read: 0 },
              },
              { $group: { _id: null, count: { $sum: 1 } } },
            ])
            .then((data) => {
              let list1 = [];
              list1.push(data);
              list1.push(notifyData);
              res.status(200).send(list1);
            });
        })
        .catch((er) => {
          logger.error(
            `${er.status || 500} - 'error' - ${er.message} - ${
              req.originalUrl
            } - ${req.method} - ${req.ip}`
          );
          res.status(400).send(er);
        });
    }
  } catch (e) {
    logger.error(
      `${e.status || 500} - 'error' - ${e.message} - ${req.originalUrl} - ${
        req.method
      } - ${req.ip}`
    );
    res.status(400).send(e);
  }
};

exports.findAllNotifyforCommitty = async (req, res) => {
  try {
    const page = req.params.page > 0 ? req.params.page - 1 : 0;
    await notification
      .aggregate([
        {
          $match: {
            $or: [
              { Message: "Recreation Committee tagged in a post" },
              { verifyNotif: 1 },
            ],
          },
        },
        {
          $lookup: {
            from: "userstables",
            localField: "PostedUser",
            foreignField: "_id",
            as: "userlist",
          },
        },
        {
          $sort: { createdAt: -1 },
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
            "userlist.PasswordChange": 0,
            updatedAt: 0,
            "Postlist.PersonalTags": 0,
            "Postlist.GroupTags": 0,
            "Postlist.Delete": 0,
            "userlist.createdAt": 0,
            "userlist.updatedAt": 0,
            "userlist.GroupCreateDate": 0,
            "userlist.CommitteCreateDate": 0,
          },
        },
        { $skip: page * 10 },
        { $limit: 10 },
      ])
      .then(async (data) => {
        await notification
          .aggregate([
            {
              $match: {
                $or: [
                  { Message: "Recreation Committee tagged in a post" },
                  { verifyNotif: 1 },
                ],
              },
            },
            {
              $match: { Read: 0 },
            },
            { $group: { _id: null, count: { $sum: 1 } } },
          ])
          .then((resp) => {
            let list2 = [];
            list2.push(resp);
            list2.push(data);
            res.status(200).send(list2);
          });
      })
      .catch((error) => {
        logger.error(
          `${error.status || 500} - 'error' - ${error.message} - ${
            req.originalUrl
          } - ${req.method} - ${req.ip}`
        );
        res.status(400).send(error);
      });
  } catch (e) {
    logger.error(
      `${e.status || 500} - 'error' - ${e.message} - ${req.originalUrl} - ${
        req.method
      } - ${req.ip}`
    );
    res.status(400).send(e);
  }
};

exports.findUserBirthday = (req, res) => {
  let photos = [];
  UserTable.aggregate([
    {
      $match: {
        $and: [
          { BirthdayStatus: 1 },
          { Delete: 0 },
          { BirthdayCard: { $ne: null } },
        ],
      },
    },
    { $sort: { updatedAt: -1 } },
  ])
    .then(async (data) => {
      data.forEach((element) => {
        photos.push(element.BirthdayCard);
      });

      const glimpse = await Glimpses.find({ Status: 1 });
      glimpse.forEach((data) => {
        photos.push(data.GlimpsesPath);
      });
      // const flattenedArray = photos.reduce((acc, current) => acc.concat(current), []);
      res.status(200).send(photos);
    })
    .catch((error) => {
      logger.error(
        `${error.status || 500} - 'error' - ${error.message} - ${
          req.originalUrl
        } - ${req.method} - ${req.ip}`
      );
      res.status(400).send(error);
    });
};

exports.ReadVerification = (req, res) => {
  try {
    notification
      .findOneAndUpdate(
        { $and: [{ _id: req.params.id }, { Delete: 0 }] },
        { $set: { PointVerificationRead: 1 } }
      )
      .then((resp) => {
        res.status(200).send(resp);
      });
  } catch (e) {
    logger.error(
      `${e.status || 500} - 'error' - ${e.message} - ${req.originalUrl} - ${
        req.method
      } - ${req.ip}`
    );
    res.status(400).send(e);
  }
};

exports.unreadVerifications = (req, res) => {
  try {
    notification
      .find({ $and: [{ PointVerificationRead: 0 }, { Delete: 0 }] })
      .then((resp) => {
        res.status(200).send(resp);
      });
  } catch (e) {
    logger.error(
      `${e.status || 500} - 'error' - ${e.message} - ${req.originalUrl} - ${
        req.method
      } - ${req.ip}`
    );
    res.status(400).send(e);
  }
};

exports.ReadPost = async (req, res) => {
  try {
    notification.findByIdAndUpdate(req.params.id, { Read: 1 }).then((resp) => {
      res.status(200).send("notification Readed");
    });
  } catch (error) {
    logger.error(
      `${error.status || 500} - 'error' - ${error.message} - ${
        req.originalUrl
      } - ${req.method} - ${req.ip}`
    );
    res.status(400).send(error);
  }
};

exports.taggedPosts = async (req, res) => {
  try {
    let list = [];
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send(errors.errors[0].msg);
    }
    let filter;
    const user = await UserTable.findOne({
      $and: [{ _id: req.params.id }, { Delete: 0 }],
    }).exec();
    if (user) {
      filter = {
        $or: [{ TaggedGroup: user.GroupId }, { TaggedUser: user._id }],
      };
    }
    const group = await GroupTable.findOne({
      $and: [{ _id: req.params.id }, { Delete: 0 }],
    }).exec();
    if (group) {
      filter = { TaggedGroup: group._id };
    }
    await notification
      .aggregate([
        {
          $match: filter,
        },
        {
          $lookup: {
            from: "posts",
            localField: "PostId",
            foreignField: "_id",
            as: "Postlist",
          },
        },
        { $sort: { updatedAt: -1 } },
        {
          $lookup: {
            from: "userstables",
            localField: "PostedUser",
            foreignField: "_id",
            as: "userlist",
          },
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
            "userlist.PasswordChange": 0,
            PostedUser: 0,
            updatedAt: 0,
            "Postlist.PersonalTags": 0,
            "Postlist.GroupTags": 0,
            "Postlist.Delete": 0,
            "userlist.createdAt": 0,
            "userlist.updatedAt": 0,
            "userlist.GroupCreateDate": 0,
            "userlist.CommitteCreateDate": 0,
          },
        },
      ])
      .then((response) => {
        response.forEach((post) => {
          if (post.Postlist[0]?.Tags == 1) {
            list.push(post);
          }
        });
        res.status(200).send(list);
      })
      .catch((error) => {
        logger.error(
          `${error.status || 500} - 'error' - ${error.message} - ${
            req.originalUrl
          } - ${req.method} - ${req.ip}`
        );
        res.status(400).send(error);
      });
  } catch (e) {
    logger.error(
      `${e.status || 500} - 'error' - ${e.message} - ${req.originalUrl} - ${
        req.method
      } - ${req.ip}`
    );
    res.status(400).send(e);
  }
};

exports.addGlimpses = (req, res) => {
  try {
    let pathList;
    let addGlimpses;
    if (req.files.length <= 0) {
      res.status(400).send({
        errorCode: 704,
        errorMsg: "No Files Recieved",
      });
    }

    req.files.forEach((data) => {
      pathList = Image_Path + data.filename;
      if (pathList) {
        addGlimpses = new Glimpses({
          GlimpsesPath: pathList,
          Status: 1,
        });
        addGlimpses.save();
      }
    });
    return res.status(200).send("Glimpses added successfully");
  } catch (error) {
    return res.status(400).send("catch Exception", error);
  }
};

exports.deleteGlimpses = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send(errors.errors[0].msg);
    }
    const condition = { _id: req.body.glimpseId };
    const update = { $set: { Status: 0 } };
    const deleteGlimpse = await Glimpses.findOneAndUpdate(condition, update);
    if (deleteGlimpse) {
      res.status(200).send("deleted glimpse");
    }
  } catch (error) {
    res.status(400).send("catch exception", error);
  }
};

exports.getGlimpses = async (req, res) => {
  try {
    const getGlimpse = await Glimpses.find({ Status: 1 });

    if (getGlimpse) {
      res.status(200).send(getGlimpse);
    }
  } catch (error) {
    res.status(400).send("catch exception", error);
  }
};

exports.editGlimpses = async (req, res) => {
  try {
    if (req.files.length <= 0) {
      return res.status(400).send({
        errorCode: 704,
        errorMsg: "No Files Recieved",
      });
    } else if (req.files.length > 1) {
      return res.status(400).send({
        errorCode: 801,
        errorMsg: "One file at a time",
      });
    }
    const editGlimpse = await Glimpses.findOne({
      $and: [{ _id: req.body.glimpseId }, { Status: 1 }],
    });
    if (!editGlimpse) {
      return res
        .status(400)
        .send({ errorCode: 404, errorMsg: "Glimpse not found" });
    }
    editGlimpse.GlimpsesPath = Image_Path + req.files[0].filename;
    editGlimpse.save();

    if (editGlimpse) {
      return res.status(200).send(editGlimpse);
    }
  } catch (error) {
    return res.status(400).send(error);
  }
};
