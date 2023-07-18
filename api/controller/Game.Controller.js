const exp = require("express");
const Game = require("../models/Game.Model");
const Group = require('../models/Groups.Model.js')
const Event = require('../models/Event.Model')
const Users = require('../models/User.Model')
const TotalPoint = require('../models/TotalPoint.Model')
const TotalPointBackup = require('../models/TotalPointBackup.Model')
const app = exp();
const bdyp = require('body-parser')
const bodyParser = require('body-parser')
app.use(bdyp.json())
app.use(bodyParser.urlencoded({ extended: false }))
const mongoose = require('mongoose');
const logger = require('../utils/logger.utils')
let cron = require('node-cron');
const joi = require('@hapi/joi');
const { validationResult } = require('express-validator');

const Schema = joi.object().keys({
  GameName: joi.string().min(1).max(30),
  GameDesc: joi.string().min(1).max(250),
  StartDate: joi.string(),
  EndDate: joi.string(),
  UserId: joi.string().alphanum(),
  EventId: joi.string().alphanum(),
  id: joi.string().alphanum()
})

const Image_Path = process.env.Image_Path

exports.gamePoint = (req, res) => {
  try {
    let Validation = Schema.validate(req.params)
    if (!Validation.error) {
      TotalPoint.aggregate([
        {
          $match: {
            $and: [
              { "GameId": new mongoose.Types.ObjectId(req.params.id) },
              { "PublishToInnovature": true },
              { "PublishByCommittee": true },
              { "NotVerify": false },
              { "PostpondPublish": false },
              { "RemoveFromPublish": 0 },
              { "Delete": 0 },
            ]
          }
        },
        {
          $group: {
            _id: {
              "GroupId": "$GroupId",
              "GameId": "$GameId"
            }, TotalPoint: { $sum: "$TotalPoint" },
          }
        },
        {
          $lookup: {
            from: "groups", localField: "_id.GroupId", foreignField: "_id", as: "grouplist"
          }
        },
        {
          $project: {
            "_id": 1,
            "grouplist.GroupName": 1,
            "grouplist.createdAt": 1,
            "TotalPoint": 1,
            "createdAt": 1
          }
        },
      ]).then((result) => {
        res.send(result)
      }).catch((err) => {
        logger.error(`${err.status || 500} - 'error' - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        res.status(404).json({ message: err.message });
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



exports.allGames = async (req, res) => {
  try {
    await Game.find({ Delete: 0 }).sort({ createdAt: -1 }).populate("EventId", { EventName: 1, EventDescription: 1 }).then((response) => {
      res.status(200).json((response));

    }).catch((error) => {
      logger.error(`${error.status || 500} - 'error' - ${error.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
      res.status(404).json({ message: error.message });
    });
  }
  catch (e) {
    logger.error(`${e.status || 500} - 'error' - ${e.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    res.send(e)
  }
}



cron.schedule('0 0 * * *', async function () {
  const cd = new Date();
  const str = cd.toLocaleDateString('en-CA', { timeZone: 'Asia/Kolkata' });
  const currentDate = new Date(str).getTime();
  Game.find({}).then((data) => {
    data.forEach(async (element) => {

      let sd = element.StartDate.toISOString().split('T', 1)[0];
      let beginDate = new Date(sd).getTime();

      let ed = element.EndDate.toISOString().split('T', 1)[0];
      let closeDate = new Date(ed).getTime();


      if (beginDate == currentDate) {

        await Game.updateOne({ "_id": element._id }, { "Status": "1" }).catch((err) => {
          res.status(400).send(err)
        })

      }
      else if (currentDate > closeDate) {

        await Game.updateOne({ "_id": element._id }, { "Status": "0" }).catch((error) => {
          res.status(400).send(error)
        })
      }
    })
  })

})


exports.findGamesWithEventId = (async (req, res) => {
  try {
    await Game.find({ EventId: req.body.EventId, Delete: 0 }).then((data) => {
      res.status(200).send(data);
    }).catch((error) => {
      logger.error(`${error.status || 500} - 'error' - ${error.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);

      res.status(404).json({ message: error });
    });
  } catch (err) {
    logger.error(`${err.status || 500} - 'error' - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);

    res.send(err)

  }
})

exports.deleteGame = (req, res) => {
  try {

    let Validation = Schema.validate(req.params)
    if (!Validation.error) {
      Game.findByIdAndUpdate(req.params.id, { Delete: 1 }).then((data) => {
        TotalPoint.deleteMany({ GameId: req.params.id }).then(res.status(200).send(data))
      }).catch((err) => {
        logger.error(`${err.status || 500} - 'error' - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        res.status(401).send(err)
      })
    }
    else {
      logger.error(`${error.status || 500} - 'error' - ${error.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
      res.status(400).send(Validation.error)
    }
  }
  catch (e) {
    logger.error(`${e.status || 500} - 'error' - ${e.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    res.status(404).json({ message: e.message });
  }
}

exports.oneGame = (req, res) => {
  try {
    let Validation = Schema.validate(req.params)
    if (!Validation.error) {
      Game.findById(req.params.id).then((data) => {
        res.status(200).send(data);
      }).catch((err) => {
        res.status(404).json(err);
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


exports.gamePointWithGroupName = async (req, res) => {

  try {
    let Validation = Schema.validate(req.body)
    if (!Validation.error) {
      const users = await Users.findById(req.User._id).exec();
      TotalPoint.aggregate([
        {
          $match: {
            $and: [
              { "GroupId": new mongoose.Types.ObjectId(users.GroupId) },
              { "EventId": new mongoose.Types.ObjectId(req.body.EventId) },
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
              "GameId": "$GameId"
            }, TotalPoint: { $sum: "$TotalPoint" },
          }
        },
        {
          $lookup: {

            from: "games", localField: "_id.GameId", foreignField: "_id", as: "gamelist"
          }
        },
        {
          $project: {
            "_id": 1,
            "gamelist.GameName": 1,
            "gamelist.createdAt": 1,
            "TotalPoint": 1,
            "createdAt": 1
          }
        },
      ]).then((result) => {
        res.status(200).send(result)
      }).catch((err) => {
        logger.error(`${err.status || 500} - 'error' - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        res.status(404).send(err);
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

exports.currentGamePointWithGroupName = async (req, res) => {
  let list = []
  try {
    const users = await Users.findById(req.User._id).exec();
    TotalPoint.aggregate([
      {
        $match: {

          $and: [
            { "GroupId": new mongoose.Types.ObjectId(users.GroupId) },
            { "EventId": new mongoose.Types.ObjectId(req.body.EventId) },
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
            "GameId": "$GameId"
          }, TotalPoint: { $sum: "$TotalPoint" },
        }
      },
      {
        $lookup: {

          from: "games", localField: "_id.GameId", foreignField: "_id", as: "gamelist"
        }
      },
      {
        $project: {
          "_id": 1,
          "gamelist.GameName": 1,
          "gamelist.Status": 1,
          "gamelist.createdAt": 1,
          "TotalPoint": 1,
          "createdAt": 1
        }
      },
    ]).then((result) => {
      result.forEach(element => {
        if (element.gamelist[0].Status == 1) {
          list.push(element);
        }
      })
      res.status(200).send(list);
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



async function statusUpdate(req, res, data) {
  try {
    const cd = new Date();
    const str = cd.toLocaleDateString('en-CA', { timeZone: 'Asia/Kolkata' });
    const game = await Game.findById(req.params.id).exec();
    if (game.StartDate.toISOString().split('T', 1)[0] === str) {
      Game.findByIdAndUpdate(game._id, { $set: { Status: 1 } }).catch((err) => {
        res.status(400).send(err)
      })
    }
  }
  catch (error) {
    logger.error(`${error.status || 500} - 'error' - ${error.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    res.send(error);
  }
}

exports.gameUpdation = async(req, res) => {
  try {
    const cd = new Date();
    const str = cd.toLocaleDateString('en-CA', { timeZone: 'Asia/Kolkata' });
    const currentDate = new Date(str).getTime();
    let Validation = Schema.validate(req.body)
    if (!Validation.error) {
        Game.findById(req.params.id).then(async(game) => {
          const gameEvent=await Event.findOne({   $and: [
            { _id:game?.EventId.valueOf() }
          ]})
          if(!gameEvent){
            return res.status(400).send({errorCode:404,errMsg:"Event not found"})
          }
          const eventStartDate=gameEvent?.StartDate.toISOString().split("T")[0];
          const eventEndDate=gameEvent?.EndDate.toISOString().split("T")[0];
          if(req.body?.StartDate<eventStartDate){
           return res.status(400).send({errorCode:1001,errMsg:"Game start date must be greater than selected Event start date"})
          }
          else if(req.body?.StartDate>eventEndDate){
           return res.status(400).send({errorCode:1001,errMsg:"Game start date must be lesser than selected Event end date"})
          }
          else if(req.body?.EndDate<eventStartDate){
            return res.status(400).send({errorCode:1001,errMsg:"Game end date must be greater than selected Event start date"})
          }
          else if(req.body?.EndDate>eventEndDate){
           return res.status(400).send({errorCode:1001,errMsg:"Game end date must be lesser than selected Event end date"})
          }
        const sd = game?.StartDate?.getTime();
        if ( sd == undefined ||sd > currentDate) {
          Game.findByIdAndUpdate(req.params.id, { $set: req.body }).then(async (data) => {
            await statusUpdate(req, res, data);
            res.status(200).send({ msg: 'game updated', data })
          }).catch((err) => {
            res.status(400).send({ msg: 'error in game updation', err });
          })
        }
        else {
          res.status(401).send("Game Started Further Updation Not Possible")
        }
      })
    }
    else {
      res.status(401).send(Validation.error)
    }
  }
  catch (e) {
    logger.error(`${e.status || 500} - 'error' - ${e.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    res.send(e)
  }
}


async function statusOfGameCreated(req, res, data) {
  try {
    const cd = new Date();
    const str = cd.toLocaleDateString('en-CA', { timeZone: 'Asia/Kolkata' });
    let sd = await data.StartDate.toISOString().split('T', 1)[0];
    if (sd === str) {
      Game.findByIdAndUpdate(data._id, { $set: { Status: 1 } }).catch((err) => {
        res.status(400).send(err)
      });
    }
  }
  catch (error) {
    logger.error(`${error.status || 500} - 'error' - ${error.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    res.send(error)
  }
}


async function updateTotalPoints(req, res, data) {
  try {
    const groups = await Group.find({ Delete: 0, GroupType: 0 }).exec();
    groups.forEach(async (element) => {

      const newpoint = new TotalPoint({

        EventId: req.body.EventId,
        GameId: data._id,
        TotalPoint: "0",
        GroupId: element._id,

        UniqueKeyGm: data._id,
        UniqueKeyGp: element._id,
        UniqueKeyEv: req.body.EventId

      })
      await newpoint.save().then(async (totalpoint) => {
        const newPointForBackup = new TotalPointBackup({
          TotalPointId: totalpoint._id,
          EventId: req.body.EventId,
          GameId: data._id,
          TotalPoint: "0",
          GroupId: element._id,

          UniqueKeyGm: data._id,
          UniqueKeyGp: element._id,
          UniqueKeyEv: req.body.EventId

        })
        await newPointForBackup.save();
      });
    })
  }
  catch (error) {
    logger.error(`${error.status || 500} - 'error' - ${error.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    res.send(error)
  }
}

exports.postGame = (async (req, res, next) => {

  try {
    let Validation = Schema.validate(req.body)
    if (!Validation.error) {
      const gameEvent=await Event.findOne({   $and: [
        { _id:req.body?.EventId },
      ]})
      if(!gameEvent){
        return res.status(400).send({errorCode:404,errMsg:"Event not found"})
      }
      const eventStartDate=gameEvent?.StartDate.toISOString().split("T")[0];
      const eventEndDate=gameEvent?.EndDate.toISOString().split("T")[0];
      if(req.body?.StartDate<eventStartDate){
       return res.status(400).send({errorCode:1001,errMsg:"Game start date must be greater than selected Event start date"})
      }
      else if(req.body?.StartDate>eventEndDate){
       return res.status(400).send({errorCode:1001,errMsg:"Game start date must be lesser than selected Event end date"})
      }
      else if(req.body?.EndDate<eventStartDate){
        return res.status(400).send({errorCode:1001,errMsg:"Game end date must be greater than selected Event start date"})
      }
      else if(req.body?.EndDate>eventEndDate){
       return res.status(400).send({errorCode:1001,errMsg:"Game end date must be lesser than selected Event end date"})
      }

      const newgame = new Game({

        GameName: req.body.GameName,
        GameDesc: req.body.GameDesc,
        UserId: req.body.UserId,
        StartDate: req.body.StartDate,
        EndDate: req.body.EndDate,
        EventId: req.body.EventId

      })
      const eventQuarter = await Event.findById(req.body.EventId, { QuarterId: true }).exec()
      // console.log(eventQuarter);
      if (eventQuarter) {
        newgame.QuarterId=eventQuarter.QuarterId;
      }

      newgame.RulesPdf = Image_Path + req.files[0].filename;

      await newgame.save().then(async (data) => {
        await updateTotalPoints(req, res, data)
        await statusOfGameCreated(req, res, data);
        res.status(200).send({ msg: 'new game created', data })
      }).catch((err) => {
        logger.error(`${err.status || 500} - 'error' - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        res.status(400).send({ msg: 'error in game creation', err });
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
    res.status(400).send(e)
  }

})

exports.allGamesWinners = async (req, res) => {
  try {

    let Data = [];

    let highestScore;
    const findData = async (data) => {
      data.forEach(element => {
        Data.push(element.TotalPoint)

      });

      highestScore = Math.max(...Data);
      return data.filter(item => item.TotalPoint == highestScore);

    }
    const list = [];
    const gameWinner = async (allGames) => {
      for (let game of allGames) {
        await TotalPoint.aggregate([
          {
            $match: {
              $and: [
                { "GameId": new mongoose.Types.ObjectId(game._id) },
                { "PublishToInnovature": true },
                { "PublishByCommittee": true },
                { "NotVerify": false },
                { "PostpondPublish": false },
                { "RemoveFromPublish": 0 },
                { "Delete": 0 },
              ]
            }
          },

          {
            $sort: { "createdAt": -1 }
          },
          {
            $group: {
              _id: {
                "EventId": "$EventId",
                "GroupId": "$GroupId",
                "GameId": "$GameId"
              }, TotalPoint: { $sum: "$TotalPoint" },
            }
          },
          { $sort: { "TotalPoint": -1 } },
          {
            $lookup: {
              from: "groups", localField: "_id.GroupId", foreignField: "_id", as: "grouplist"
            }
          },
          {
            $lookup: {
              from: "events", localField: "_id.EventId", foreignField: "_id", as: "Eventlist"
            }

          },

          {
            $lookup: {

              from: "games", localField: "_id.GameId", foreignField: "_id", as: "gamelist"
            }
          },
          {
            $project: {
              "_id": 1,
              "UniqueKeyEv": 1,
              "grouplist.GroupName": 1,
              "grouplist.createdAt": 1,
              "TotalPoint": 1,
              "createdAt": 1,
              "gamelist.GameName": 1,
              "gamelist.createdAt": 1,
              "Eventlist.EventName": 1
            }
          },
        ]).then(async (response) => {
          if (response.length > 0) {
            const winner = await findData(response)
            if (winner.length > 0) {
              list.push({ "gameDetails": game.GameName, "gameWinners": winner })
            }
          }
        })
      }
    }
    const games = await Game.find({ Delete: 0 }).sort({ createdAt: -1 }).exec();
    await gameWinner(games);
    res.send(list)
  }
  catch (error) {
    logger.error(`${error.status || 500} - 'error' - ${error.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    res.status(400).send(error)
  }
}


exports.gameSearch = (async (req, res) => {
  try {

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.send(errors.errors[0].msg);
    }
    const { GameName, StartDate, EndDate, status } = req.query

    let searchQuery = {}
    searchQuery.Delete = 0;

    if (GameName)
      searchQuery.GameName = new RegExp(GameName, 'i')

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
    const games = await Game.find(searchQuery).sort({ createdAt: -1 }).populate("EventId", { EventName: 1 }).catch((error) => {
      logger.error(`${error.status || 500} - 'error' - ${error.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
      res.status(400).send(error)
    });
    res.status(200).json(games);

  }
  catch (e) {
    logger.error(`${e.status || 500} - 'error' - ${e.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    res.status(400).json({ message: e })
  }
})