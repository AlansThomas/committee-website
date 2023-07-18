const exp = require("express");
const Event = require("../models/Event.Model");
const Game = require("../models/Game.Model");
const Group = require("../models/Groups.Model");
const notification = require("../models/Notification.Model")
const reportModel = require("../models/Report.Model")
const app = exp();
const User = require("../models/User.Model")
const TotalPoint = require('../models/TotalPoint.Model')
const logger = require('../utils/logger.utils')
const mongoose = require('mongoose')
const { error } = require("@hapi/joi/lib/types/alternatives");
const { readSync } = require("fs");
const { log } = require("console");
const { LoginTicket } = require("google-auth-library");
let cron = require('node-cron');
const path = require("path");
const Image_Path = process.env.Image_Path
const bdyp = require('body-parser')
const bodyParser = require('body-parser')
app.use(bdyp.json())
app.use(bodyParser.urlencoded({ extended: false }))
const joi = require('@hapi/joi');
const Schema = joi.object().keys({
  EventName: joi.string().min(1).max(30),
  EventDescription: joi.string().min(1).max(10000),
  StartDate: joi.date().required(),
  EndDate: joi.date().required(),
  UserId: joi.string().alphanum(),
  id: joi.string().alphanum(),
  quarterId: joi.string().alphanum().required()
})
const { validationResult } = require('express-validator');
const QuaterModel = require("../models/Quater.Model");
const NotificationModel = require("../models/Notification.Model");
const UserModel = require("../models/User.Model");


exports.newEvent = ((req, res) => {
  res.send("inside new event")
})

exports.event = ((req, res) => {
  try {
    Event.aggregate([

      {
        $lookup: {
          from: "userstables", localField: "UserId", foreignField: "_id", as: "UserList"
        }

      },
    ]).then(result => {
      res.send(result)
    })
  }
  catch (err) {
    res.send(err);
  }
})

exports.getEvents = (req, res) => {
  event.aggregate([
    { $sort: { "createdAt": -1 } },
    {
      $lookup: {
        from: "users", localField: "UserId", foreignField: "_id", as: "User"
      }
    },
    { $project: { "User.password": 0 } }
  ]).then(result => {
    res.send(result)
  })
}



exports.allEvents = async (req, res) => {
  try {
    await Event.find({ Delete: 0 }).populate("QuarterId", { QuaterName: true, QuaterNumber: true, QuaterYear: true, StartDate: true, EndDate: true }).sort({ createdAt: -1 }).then((response) => {
      res.status(200).json((response));

    }).catch((err) => {
      logger.error(`${err.status || 500} - 'error' - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
      res.status(404).json({ message: err.message });
    });
  }
  catch (e) {
    logger.error(`${e.status || 500} - 'error' - ${e.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    res.send(e);
  }

}



exports.eventSearch = async (req, res) => {

  try {

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.send(errors.errors[0].msg);
    }
    const { EventName, StartDate, EndDate, status } = req.query

    let searchQuery = {}
    searchQuery.Delete = 0;

    if (EventName)
      searchQuery.EventName = new RegExp(EventName, 'i')

    if (StartDate)
      searchQuery.StartDate = { $eq: new Date(StartDate) }

    if (EndDate)
      searchQuery.EndDate = { $eq: new Date(EndDate) }

    if (StartDate && EndDate) {
      searchQuery.StartDate = { $gte: new Date(StartDate) }
      searchQuery.EndDate = { $lte: new Date(EndDate) }
    }

    if (status == 1) {
      searchQuery.Status = 1
    }

    const events = await Event.find(searchQuery).sort({ createdAt: -1 }).catch((e) => {
      logger.error(`${e.status || 500} - 'error' - ${e.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
      res.status(400).send(e)
    });
    res.status(200).json(events);

  }
  catch (err) {
    logger.error(`${err.status || 500} - 'error' - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    res.status(400).json({ message: err })
  }
}


exports.eventDelete = (req, res) => {
  try {
    Event.findByIdAndUpdate(req.params.id, { $set: { Delete: 1 } }).then((data) => {
      TotalPoint.deleteMany({ EventId: req.params.id }).catch((er) => console.log(er));
      Game.updateMany({ EventId: req.params.id }, { $set: { Delete: 1 } }).catch((err) => console.log(err));
      res.status(200).send(data)
    }).catch((err) => {
      logger.error(`${err.status || 500} - 'error' - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
      res.status(400).send(error);
    })

    // logger.error(`${error.status || 500} - 'error' - ${error.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    // res.status(400).send("error")
  }
  catch (e) {
    logger.error(`${e.status || 500} - 'error' - ${e.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    res.status(400).send(e);
  }
}


async function CurrentQuarterEndNotify() {
  const currentQuatrter = await QuaterModel.find({
    $and: [
      { StartDate: { $lte: new Date() } },
      { EndDate: { $gte: new Date() } }
    ]
  });
  const currentDate = new Date()
  const currentQuarterDate = new Date(currentQuatrter[0]?.EndDate?.toISOString().split('T')[0]);
  const currentDateFormatted = new Date(currentDate.toISOString().split('T')[0]);
  const oneDay = 24 * 60 * 60 * 1000; // Number of milliseconds in a day
  const differenceInDays = Math.round(Math.abs((currentQuarterDate - currentDateFormatted) / oneDay));
  if (differenceInDays === 3) {
    let setList = { Message: "", Read: "" }
    setList.Message = "Quarter is about to end in three days."
    setList.Read = 1
    setList.verifyNotif = 1
    reportModel.insertMany(setList)
    NotificationModel.insertMany(setList)

  }
  if (differenceInDays === 0) {
    let setList = { Message: "", Read: "" }
    setList.Message = "Quarter is about to end today."
    setList.Read = 1
    setList.verifyNotif = 1
    reportModel.insertMany(setList)
    NotificationModel.insertMany(setList)

  }
}

cron.schedule('0 0 * * *', function () {
  const cd = new Date();
  const str = cd.toLocaleDateString('en-CA', { timeZone: 'Asia/Kolkata' });
  const currentDate = new Date(str).getTime();
  CurrentQuarterEndNotify();
  Event.find({}).then((data) => {
    data.forEach(async (element) => {
      let sd = element.StartDate?.toISOString().split('T', 1)[0];
      let beginDate = new Date(sd).getTime();

      let ed = element.EndDate?.toISOString().split('T', 1)[0];
      let closeDate = new Date(ed).getTime();


      if (beginDate == currentDate) {
        await Event.updateOne({ "_id": element._id.valueOf() }, { $set: { Status: 1 } }).catch((err) => {
          console.log(err)
        })
      }
      else if (currentDate > closeDate) {

        await Event.updateOne({ "_id": element._id.valueOf() }, { $set: { Status: 2 } }).catch((er) => {
          console.log(er)
        })
      }

    })
  })

})



exports.getCurrentEvents = async (req, res) => {
  try {
    await Event.find({ $and: [{ Delete: 0 }, { Status: 1 }] }).populate("QuarterId", { QuaterName: true, QuaterNumber: true, QuaterYear: true, StartDate: true, EndDate: true })

      .sort({ createdAt: -1 }).then((response) => {
        res.status(200).send(response);

      }).catch((err) => {
        logger.error(`${err.status || 500} - 'error' - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);

        res.status(400).send({ message: err });
      });
  }
  catch (e) {
    logger.error(`${e.status || 500} - 'error' - ${e.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    res.status(400).send(e);
  }
}

exports.getCurrentEventsWithGroup = async (req, res) => {
  let list = []
  try {

    const users = await User.findById(req.User._id).exec()
    TotalPoint.aggregate([
      {
        $match: {
          $and: [
            { "GroupId": new mongoose.Types.ObjectId(users.GroupId) },
            { "PublishToInnovature": true },
            { "PublishByCommittee": true },
            { "NotVerify": false },
            { "PostpondPublish": false },
            { "RemoveFromPublish": 0 },
            { "Delete": 0 },
          ]
        },
      },
      {
        $sort: { "createdAt": -1 }
      },
      {
        $group: {
          _id: {
            "GroupId": users.GroupId,
            "EventId": "$EventId"
          }, TotalPoint: { $sum: "$TotalPoint" },
        }
      },
      {
        $lookup: {

          from: "events", localField: "_id.EventId", foreignField: "_id", as: "eventlist"
        }
      },
      {
        $project: {
          "_id": 1,
          "eventlist.EventName": 1,
          "eventlist.Status": 1,
          "eventlist.createdAt": 1,
          "TotalPoint": 1,
          "createdAt": 1
        }
      },
    ]).then((result) => {
      result.forEach(element => {
        if (element.eventlist[0].Status == 1) {
          list.push(element);
        }
      })
      res.status(200).send(list);
    }).catch((err) => {
      logger.error(`${err.status || 500} - 'error' - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
      res.status(404).send({ message: err.message });
    })

  }
  catch (e) {
    logger.error(`${e.status || 500} - 'error' - ${e.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    res.send(e);
  }
}





exports.getEventsWithGroup = async (req, res) => {

  try {
    const users = await User.findById(req.User._id).exec();
    TotalPoint.aggregate([
      {
        $match: {
          $and: [
            { "GroupId": new mongoose.Types.ObjectId(users.GroupId) },
            { "PublishToInnovature": true },
            { "PublishByCommittee": true },
            { "NotVerify": false },
            { "PostpondPublish": false },
            { "RemoveFromPublish": 0 },
            { "Delete": 0 },
          ]
        },
      },
      {
        $sort: { "createdAt": -1 }
      },

      {
        $group: {
          _id: {
            "GroupId": users.GroupId,
            "EventId": "$EventId"
          }, TotalPoint: { $sum: "$TotalPoint" },
        }
      },
      {
        $lookup: {

          from: "events", localField: "_id.EventId", foreignField: "_id", as: "eventlist"
        }
      },
      {
        $project: {
          "_id": 1,
          "eventlist.EventName": 1,
          "eventlist.createdAt": 1,
          "TotalPoint": 1,
          "createdAt": 1
        }
      },
    ]).then((result) => {
      res.status(200).send(result)
    }).catch((e) => {
      logger.error(`${e.status || 500} - 'error' - ${e.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
      res.status(404).send({ message: e.message });
    })
  }
  catch (err) {
    logger.error(`${err.status || 500} - 'error' - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    res.status(400).send(err)
  }
}


exports.eventById = (req, res) => {

  Event.findById(req.params.id).populate("QuarterId", { QuaterName: true, QuaterNumber: true, QuaterYear: true, StartDate: true, EndDate: true }).then((data) => {
    return res.status(200).send(data);
  }).catch((e) => {
    logger.error(`${e.status || 500} - 'error' - ${e.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    return res.status(400).send(e)
  })
  //   logger.error(`${error.status || 500} - 'error' - ${error.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
  //  return res.status(400).send(Validation.error)
}


async function statusUpdate(req, res) {
  try {
    const cd = new Date();
    const str = cd.toLocaleDateString('en-CA', { timeZone: 'Asia/Kolkata' });
    const events = await Event.findById(req.params.id).exec();
    if (events.StartDate.toISOString().split('T', 1)[0] === str) {
      Event.findByIdAndUpdate(events._id, { $set: { Status: 1 } }).catch((err) => {
        res.status(400).send(err)
      })
    }
  }
  catch (e) {
    logger.error(`${e.status || 500} - 'error' - ${e.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    res.send(e);
  }
}


exports.eventUpdation = async (req, res) => {

  try {

    const cd = new Date();
    const str = cd.toLocaleDateString('en-CA', { timeZone: 'Asia/Kolkata' });
    const currentDate = new Date(str).getTime();

    let Validation = Schema.validate(req.body)
    if (!Validation.error) {
      const quarter = await QuaterModel.findOne({
        $and: [
          { _id: req.body?.quarterId }, { Status: 1 }
        ]
      })
      if (!quarter) {
        res.status(400).send({ errorCode: 404, errMsg: "Quarter not found" })
      }
      const quarterStartDate = quarter?.StartDate.toISOString().split("T")[0];
      const quarterEndDate = quarter?.EndDate.toISOString().split("T")[0];
      if (req.body?.StartDate < quarterStartDate) {
        return res.status(400).send({ errorCode: 1001, errMsg: "Event start date must be greater than or equalto selected quarter start date" })
      }
      else if (req.body?.StartDate > quarterEndDate) {
        return res.status(400).send({ errorCode: 1001, errMsg: "Event start date must be lesser than or equalto selected quarter end date" })
      }
      else if (req.body?.EndDate < quarterStartDate) {
        return res.status(400).send({ errorCode: 1001, errMsg: "Event end date must be greater than or equalto selected quarter start date" })
      }
      else if (req.body?.EndDate > quarterEndDate) {
        return res.status(400).send({ errorCode: 1001, errMsg: "Event end date must be lesser than or equalto selected quarter end date" })
      }

      Event.findById(req.params.id).then(async (data) => {

        let datedate = await data.StartDate
        console.log(datedate);
        const sd = await data?.StartDate?.getTime();
        if (sd == undefined || sd > currentDate) {
          Event.findByIdAndUpdate(req.params.id, { $set: req.body }).then(async (eventData) => {
            await statusUpdate(req, res);
            res.status(200).send({ msg: 'event updated', eventData })
          }).catch((e) => {
            logger.error(`${e.status || 500} - 'error' - ${e.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
            res.status(400).send({ msg: 'error in event updation', e });
          })
        }
        else {
          res.status(400).send("Event Started Further Updation Not Possible")
        }
      })
    }

    else {
      logger.error(`${error.status || 500} - 'error' - ${error.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
      res.status(400).send(Validation.error)
    }
  }
  catch (err) {
    logger.error(`${err.status || 500} - 'error' - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    res.send(err);
  }
}




async function statusOfEventCreated(req, res, data) {
  try {
    const cd = new Date();
    const str = cd.toLocaleDateString('en-CA', { timeZone: 'Asia/Kolkata' });
    // console.log(data.StartDate, "66666666");
    let sd = await data.StartDate.toISOString().split('T', 1)[0];
    if (sd === str) {
      Event.findByIdAndUpdate(data._id, { $set: { Status: 1 } }).exec()
    }
  }
  catch (e) {
    logger.error(`${e.status || 500} - 'error' - ${e.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    return res.send(e)
  }
}

exports.postEvent = (async (req, res, next) => {

  try {


    let Validation = Schema.validate(req.body)
    if (!Validation.error) {
      const eventName = await Event.findOne({ EventName: req.body.EventName, Delete: 0 }).exec()
      if (eventName) {
        res.status(400).send("Event name must be unique")
      }
      const quarter = await QuaterModel.findOne({
        $and: [
          { _id: req.body?.quarterId }, { Status: 1 }
        ]
      })
      if (!quarter) {
        res.status(400).send({ errorCode: 404, errMsg: "Quarter not found" })
      }
      const quarterStartDate = quarter?.StartDate.toISOString().split("T")[0];
      const quarterEndDate = quarter?.EndDate.toISOString().split("T")[0];




      if (req.body?.StartDate < quarterStartDate) {
        return res.status(400).send({ errorCode: 1001, errMsg: "Event start date must be greater than or equalto selected quarter start date" })
      }
      else if (req.body?.StartDate > quarterEndDate) {
        return res.status(400).send({ errorCode: 1001, errMsg: "Event start date must be lesser than or equalto selected quarter end date" })
      }
      else if (req.body?.EndDate < quarterStartDate) {
        return res.status(400).send({ errorCode: 1001, errMsg: "Event end date must be greater than or equalto selected quarter start date" })
      }
      else if (req.body?.EndDate > quarterEndDate) {
        return res.status(400).send({ errorCode: 1001, errMsg: "Event end date must be lesser than or equalto selected quarter end date" })
      }

      const newevent = new Event({
        EventName: req.body.EventName,
        EventDescription: req.body.EventDescription,
        StartDate: req.body.StartDate,
        EndDate: req.body.EndDate,
        UserId: req.body.UserId,
        QuarterId: req.body.quarterId
      })
      newevent.File = Image_Path + req.files[0].filename;
      await newevent.save().then(async (data) => {
        await statusOfEventCreated(req, res, data)
        res.status(200).send({ msg: 'new event created', data })
      }).catch((err) => {
        logger.error(`${err.status || 500} - 'error' - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        res.status(400).send({ msg: 'error in event creation', err });
      })

      next();
    }
    else {
      logger.error(`${error.status || 500} - 'error' - ${error.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
      res.status(400).send(Validation.error)
    }
  }
  catch (e) {
    logger.error(`${e.status || 500} - 'error' - ${e.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    return res.send(e);
  }

})


exports.addQuaters = async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).send(errors.errors[0].msg);
    }
    let value;
    const genericvalue = req.headers.genericvalue
    if (genericvalue != 2) {
      res.status(403).json({
        errorCode: 403,
        errMsg: "unauthorised access"
      })
    }

    const currentDate = new Date()
    const year = currentDate.getFullYear()
    const dates = currentDate.toISOString().split("T")[0]
    const quater = await QuaterModel.find({ $and: [{ Status: 1 }, { QuaterYear: year }] })
    const alreadyExist = await QuaterModel.find({

      $or: [
        {
          $and: [
            { StartDate: { $lte: req.body.startDate } },
            { EndDate: { $gte: req.body.startDate } }
          ]
        },
        {
          $and: [
            { StartDate: { $lte: req.body.endDate } },
            { EndDate: { $gte: req.body.endDate } }
          ]
        }
      ]
    });

    if (alreadyExist.length > 0) {
      return res.status(400).json({
        errorCode: 610,
        errMsg: "The selected start date or end date is btw a Quarter"
      });
    }

    const quaterNumber = await QuaterModel.findOne({ $and: [{ Status: 1 }, { QuaterNumber: req.body.quaterNumber }] })
    if (quaterNumber) {
      return res.status(400).json({
        errorCode: 527,
        errMsg: "This quater number is already used"
      });
    }
    if (quater.length >= 4) {
      return res.status(400).json({
        errorCode: 525,
        errMsg: "Only 4 quaters are allowed to be created"
      });
    }
    console.log("1");
    if (quater.length > 1) {
      // value = await endDateValidation(req, quater, dates);
    }
    console.log("2");
    switch (value) {
      case 1:
        return res.status(400).json({
          errorCode: 521,
          errMsg: "start-date must be greater than  quater1 end-date"
        });
      case 2:
        return res.status(400).json({
          errorCode: 522,
          errMsg: "start-date must be greater than  quater2 end-date"
        })
      case 3:
        return res.status(400).json({
          errorCode: 523,
          errMsg: "start-date must be greater than  quater3 end-date"
        })
      case 4:
        return res.status(400).json({
          errorCode: 526,
          errMsg: "start-date cannot be lesser than current date"
        })
      case 5:
        return res.status(400).json({
          errorCode: 528,
          errMsg: "quater number must be 1,2,3,4"
        })

      default:
        break;
    }
    const newQuarter = new QuaterModel({
      QuaterName: req.body.quaterName,
      StartDate: req.body.startDate,
      EndDate: req.body.endDate,
      QuaterNumber: req.body.quaterNumber,
      Status: 1,
      QuaterYear: year,
    })
    newQuarter.save();
    res.status(200).send(newQuarter)
  } catch (error) {
    console.log(error);
    res.status(400).send(error)

  }
}

exports.ediQuaters = async (req, res) => {
  try {
    let quarterNumberIncrement;
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).send(errors.errors[0].msg);
    }
    let value;
    let previousQuarterNumber
    const genericvalue = req.headers.genericvalue
    if (genericvalue != 2) {
      res.status(403).json({
        errorCode: 403,
        errMsg: "unauthorised access"
      })
    }
    const currentDate = new Date()
    const year = currentDate.getFullYear()
    const dates = currentDate.toISOString().split("T")[0]
    console.log(req.body.quaterName, "####");
    const quarterName = req.body.quaterName?.toLowerCase()
    console.log(quarterName, "$$$");
    const editQuarter = await QuaterModel.findOne({ $and: [{ Status: 1 }, { _id: req.body.quarterId }] })
    if (!editQuarter) {
      return res.status(400).json({
        errorCode: 404,
        errMsg: "QuarterId not found"
      });
    }
    const uniqueName = await QuaterModel.findOne({ $and: [{ Status: 1 }, { QuaterName: { $regex: req.body.quaterName, $options: "i" } }] })
    if (uniqueName && uniqueName?._id.valueOf() != req.body.quarterId && uniqueName?.QuaterName?.toLowerCase() == quarterName) {
      return res.status(400).json({
        errorCode: 445,
        errMsg: "QuarterName is Unique"
      });
    }
    if (editQuarter.QuaterNumber > 1) {
      previousQuarterNumber = editQuarter.QuaterNumber - 1
    }
    const previousQuarter = await QuaterModel.findOne({ $and: [{ Status: 1 }, { QuaterNumber: previousQuarterNumber }, { QuaterYear: year }] })
    if (editQuarter.QuaterNumber < 4) {
      quarterNumberIncrement = editQuarter.QuaterNumber + 1

    }
    const nextQuarter = await QuaterModel.findOne({ $and: [{ QuaterYear: year, QuaterNumber: quarterNumberIncrement }] }).exec();
    value = await endDateValidation(req, editQuarter, dates, nextQuarter, previousQuarter, res);

    switch (value) {
      case 1:
        return res.status(400).send(
          {
            errorCode: 606,
            errMsg: "End date should be less than the next quarters end"
          });
      case 2:
        return res.status(400).json({
          errorCode: 522,
          errMsg: "Start date must be greater than  quarter1 end date"
        })
      case 3:
        return res.status(400).json({
          errorCode: 523,
          errMsg: "End date should be less than the  quarters3 end date"
        })
      case 4:
        return res.status(400).json({
          errorCode: 524,
          errMsg: "Start date must be greater than  quarter2 end date"
        })

      case 5:
        return res.status(400).json({
          errorCode: 525,
          errMsg: "End date should be less than the  quarters4 end date"
        })
      case 6:
        return res.status(400).json({
          errorCode: 524,
          errMsg: "Start date must be greater than  quarter3 end date"
        })

      case 7: return res.status(400).json({
        errorCode: 604,
        errMsg: "End date cannot be editted after quarter ended"
      })
      case 8: return res.status(400).json({
        errorCode: 605,
        errMsg: "Year cannot be changed"
      })



      default:
    }
    const newEndDate = new Date(req.body.endDate);
    if (nextQuarter) {
      if (newEndDate >= nextQuarter.StartDate) {
        const previousStart = nextQuarter.StartDate;
        let incrementedEndDate = new Date(newEndDate);
        nextQuarter.StartDate = incrementedEndDate.setDate(incrementedEndDate.getDate() + 1);
        nextQuarter.save();

        const events = await Event.updateMany({ $and: [{ StartDate: { $gte: previousStart, $lte: newEndDate } }, { QuarterId: nextQuarter._id }] }, { $set: { StartDate: null, EndDate: null } }).exec()
        const game = await Game.updateMany({ $and: [{ StartDate: { $gte: previousStart, $lte: newEndDate } }, { QuarterId: nextQuarter._id }] }, { $set: { StartDate: null, EndDate: null } }).exec()
        if (events?.modifiedCount > 0) {
          let setList = { Message: "", Read: "" }
          setList.Message = "Current quarter extended ,events startdate and endate is updated to null in the between range ."
          setList.Read = 1
          setList.verifyNotif = 1
          reportModel.insertMany(setList)
          NotificationModel.insertMany(setList)
        }
        if (game?.modifiedCount > 0) {
          let setList = { Message: "", Read: "" }
          setList.Message = "Current quarter extended ,game startdate and endate is updated to null in the between range ."
          setList.Read = 1
          setList.verifyNotif = 1
          reportModel.insertMany(setList)
          NotificationModel.insertMany(setList)
        }

      }
    }
    editQuarter.QuaterName = req.body.quaterName;
    editQuarter.StartDate = req.body.startDate;
    editQuarter.EndDate = req.body.endDate;
    editQuarter.save()
    res.status(200).send(editQuarter)



  } catch (error) {
    logger.error(`${error.status || 500} - 'error' - ${error.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    res.status(400).send(error.message)
  }


}

async function endDateValidation(request, editQuarter, currentdate, nextQuarter, previousQuarter, response) {
  try {
    const startDate = new Date(request.body.startDate);
    const endDate = new Date(request.body.endDate);
    if (editQuarter.EndDate.toISOString().split("T")[0] < currentdate) {
      return 7;

    }
    const reqEndYear = parseInt(request.body.endDate.split("-")[0])
    const editQuarterEndDate = editQuarter.EndDate.toISOString().split("T")[0]
    const editEndYear = parseInt(editQuarterEndDate.split("-")[0])
    if (reqEndYear > editEndYear) {
      return 8;

    }
    //  let value1=await Validation1(request,currentdate,editQuarter);
    //  if(value1 == 7||8){
    //   return value1
    //  }

    if (editQuarter.QuaterNumber === 1) {
      if (endDate >= nextQuarter.EndDate) {
        return 1
      }
    }
    else if (editQuarter.QuaterNumber === 2) {

      if (previousQuarter.EndDate >= startDate) {
        return 2
      }
      else if (endDate >= nextQuarter.EndDate) {
        return 3
      }
    }
    else if (editQuarter.QuaterNumber === 3) {
      if (previousQuarter.EndDate >= startDate) {
        return 4
      }
      else if (endDate >= nextQuarter.EndDate) {
        return 5
      }
      // let value2=Quarter3(previousQuarter,startDate,nextQuarter,endDate);
      // if(value2==4||5){
      //   return value2
      // }
    }
    else {
      if (previousQuarter.EndDate >= startDate) {
        return 6
      }

    }


  } catch (error) {
    logger.error(`${error.status || 500} - 'error' - ${error.message} - ${request.originalUrl} - ${request.method} - ${request.ip}`);
    return response.status(400).send(error.message)
  }

}
async function Quarter3(previousQuarter, startDate, nextQuarter, endDate) {
  if (previousQuarter.EndDate <= startDate) {
    return 4
  }
  else if (endDate >= nextQuarter.EndDate) {
    return 5
  }
}

async function Validation1(req, currentdate, editQuarter) {
  try {

    if (editQuarter.EndDate.toISOString().split("T")[0] < currentdate) {
      return 7;

    }
    const reqEndYear = parseInt(req.body.endDate.split("-")[0])
    const editQuarterEndDate = editQuarter.EndDate.toISOString().split("T")[0]
    const editEndYear = parseInt(editQuarterEndDate.split("-")[0])
    if (reqEndYear > editEndYear) {
      return 8;

    }
  } catch (error) {
    logger.error(`${error.status || 500} - 'error' - ${error.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    return res.status(400).send(error)
  }




}

exports.getQuater = async (req, res) => {

  try {
    await QuaterModel.find({ $and: [{ Status: 1 }] }).sort({ QuaterNumber: +1 }).then((response) => {
      res.status(200).send(response);

    })
  } catch (error) {
    res.status(400).send(error)

  }
}

exports.getCurrentYearsQuarters = async (req, res) => {

  try {

    if (req.body.year) {
      const yearQuarters = await QuaterModel.find({
        $and: [
          { QuaterYear: req.body.year }
        ]
      }).sort({ QuaterNumber: +1 });
      res.status(200).send(yearQuarters)

    }
    else {
      res.status(400).send("year not recieved")
    }

  } catch (error) {
    res.status(400).send(error)

  }

}

exports.createQuarter = async (req, res) => {
  try {

    if (req.headers.genericvalue != 2) {
      return res.status(403).send({ errorCode: 403, errMsg: "Unauthoriased" })
    }
    const currentDate = new Date()
    const year = currentDate.getFullYear()
    console.log(year, "++++===");
    const quarters = await QuaterModel.find({
      $and: [{ Status: 1 }
        , { QuaterYear: year }]
    })
    if (quarters.length >= 4) {
      return res.status(400).send({ errorCode: 802, errMsg: "Cannot Create Quarter this year" })
    }

    // const dates = currentDate.toISOString().split("T")[0]

    const newQuarter1 = await new QuaterModel({
      QuaterName: "Quarter_1",
      StartDate: new Date(`${year}-01-01`),
      EndDate: new Date(`${year}-03-31`),
      QuaterNumber: 1,
      Status: 1,
      QuaterYear: year,
    })
    newQuarter1.save()
    const newQuarter2 = await new QuaterModel({
      QuaterName: "Quarter_2",
      StartDate: new Date(`${year}-04-01`),
      EndDate: new Date(`${year}-06-30`),
      QuaterNumber: 2,
      Status: 1,
      QuaterYear: year,
    })
    newQuarter2.save()
    const newQuarter3 = await new QuaterModel({
      QuaterName: "Quarter_3",
      StartDate: new Date(`${year}-07-01`),
      EndDate: new Date(`${year}-09-30`),
      QuaterNumber: 3,
      Status: 1,
      QuaterYear: year,
    })
    newQuarter3.save()
    const newQuarter4 = await new QuaterModel({
      QuaterName: "Quarter_4",
      StartDate: new Date(`${year}-10-01`),
      EndDate: new Date(`${year}-12-31`),
      QuaterNumber: 4,
      Status: 1,
      QuaterYear: year,
    })
    newQuarter4.save()
    if (newQuarter1 && newQuarter2 && newQuarter3 && newQuarter4) {
      res.status(200).send("Quarter Created successfully")
    }

  } catch (error) {
    return res.status(400).json({ errorCode: 400, errMsg: error })
  }


}

exports.getQuarterEvents = async (req, res) => {
  try {
    if (req.body.quarterId) {
      const eventQuarters = await Event.find({
        $and: [
          { QuarterId: req.body.quarterId },
          { Delete: 0 },
        ]
      })

      return res.status(200).send(eventQuarters)
    }
    else {
      const currentQuarter = await QuaterModel.find({
        $and: [
          { StartDate: { $lte: new Date() } },
          { EndDate: { $gte: new Date() } }
        ]
      });
      if (currentQuarter.length > 0) {
        const quarterId = currentQuarter[0]._id.valueOf();
        const currentEventQuarters = await Event.find({
          $and: [
            { Status: 1 },
            { QuarterId: quarterId },
            { Delete: 0 },
          ]
        })
        return res.status(200).send(currentEventQuarters)

      }
      else {
        res.status(400).send({ errorCode: 404, errMsg: "Quarter not found" })
      }

    }
  } catch (error) {
    return res.status(400).send({ errMsg: error.message, errorCode: "catch Expression" })
  }

}
exports.yearlyReset = async (req, res) => {
  try {
    const currentDate = new Date()
    const currentYear = currentDate.getFullYear()
    let quarterEvents;
    let quarterGames;
    let quarter;
    let groupUser;
    if (req.body?.year >= currentYear) {
      return res.status(400).send({ errCode: 915, errMsg: "Cannot reset this year" })
    }
    const yearQuarters = await QuaterModel.find({
      $and: [
        { QuaterYear: req.body?.year },
      ]
    })
    if (yearQuarters.length != 4) {
      return res.status(400).send({ errCode: 916, errMsg: "Please reset all quarters in the selected year for yearly reset" })
    }

    const groups = await Group.find({
      $and: [
        { Delete: 0 },

      ]
    })
    await Promise.all(yearQuarters.map(async (element) => {
       quarterEvents = await Event.updateMany({
        $and: [
          { QuarterId: element?._id },

        ]
      }, { $set: { Delete: 1 } }).exec()
       quarterGames = await Game.updateMany({
        $and: [
          { QuarterId: element?._id },

        ]
      }, { $set: { Delete: 1 } }).exec()

      quarter = await QuaterModel.updateOne({
        $and: [
          { _id:element?._id },

        ]
      }, { $set: { YearlyResetStatus:0} }).exec()
    }));

      await Promise.all(groups.map(async (data)=>{
      groupUser=  await User.updateMany({
          $and: [
            { GroupId: data?._id },
          ]
        }, { $set: { GroupIdObj:null, GroupId: "0", GroupRole: 0 } }).exec()

    })); 
    const deleteGroup=await Group.deleteMany({GroupType: 0})
    if(deleteGroup?.deletedCount>0&&quarterEvents?.modifiedCount > 0&&quarterGames?.modifiedCount > 0&&quarter?.modifiedCount > 0&&groupUser?.modifiedCount > 0){
     return res.status(200).send("yearly reseted successfully")
    }
  } catch (error) {
    res.status(400).send(error.message)

  }
}





