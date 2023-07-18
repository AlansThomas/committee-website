const express = require('express');
const app = express();
const path = require("path");
const bdyp = require('body-parser')
app.use(bdyp.json())
const multer = require('multer')
const Event = require("../models/Event.Model");
const bodyParser = require('body-parser');
const router = express.Router();
module.exports = router;
app.use(bodyParser.urlencoded({ extended: false }))
const dotenv = require('dotenv');
dotenv.config();
//////////////////////
const devUrl = process.env.devUrl
const Image_Path = process.env.Image_Path
const e = require('express');
const { roleGuard } = require('../middleware/RoleGuard.MiddleWare');
const { verifyUser } = require('../middleware/Auth.MiddleWare');
const UploadEvent = require('../middleware/Multer.MiddleWare');
app.use(express.static(__dirname + '/api/images'));
const { allEvents, event, eventUpdation, postEvent, eventSearch, getEvents, eventDelete, getCurrentEvents, pastEvents, getEventsWithGroup, getCurrentEventsWithGroup, eventById, addQuaters, getQuater, ediQuaters,getCurrentQuarter,getCurrentYearsQuarters,createQuarter,getQuarterEvents,yearlyReset } = require("../controller/Event.Controller");

const { eventValidator } = require('../validator/Event.Validator')
const { quaterValidator } = require('../validator/QuarterValidator')







router.post("/postevent", verifyUser, roleGuard, UploadEvent.UploadEvent,eventValidator('addEvent'), postEvent);
router.get("/allevent", verifyUser, roleGuard, allEvents);
router.get("/eventSearch", verifyUser, roleGuard, eventValidator('search'), eventSearch);
router.get("/event", verifyUser, roleGuard, event);
router.put("/updateevent/:id", verifyUser, roleGuard, eventUpdation)
router.get('/events', verifyUser, roleGuard, getEvents)
router.get('/currentevents', verifyUser, roleGuard, getCurrentEvents)
router.delete('/eventDelete/:id', verifyUser, roleGuard, eventDelete)
router.post("/eventswithgroupame", verifyUser, roleGuard, getEventsWithGroup)
router.post("/currenteventswithgroupame", verifyUser, roleGuard, getCurrentEventsWithGroup)
router.get("/eventbyId/:id", verifyUser, roleGuard, eventById)

//quater api's
router.post("/addQuater", verifyUser, roleGuard, quaterValidator('quater'), addQuaters)
router.post("/createQuarter", verifyUser, roleGuard, createQuarter)
router.put("/editQuater", verifyUser, roleGuard, quaterValidator('editQuater'), ediQuaters)
router.get("/getQuater", verifyUser, roleGuard, getQuater)
router.post("/getCurrentYearsQuarters", verifyUser, roleGuard, getCurrentYearsQuarters)
router.post("/getQuarterEvents", verifyUser, roleGuard, getQuarterEvents)
router.put("/yearlyReset", verifyUser, roleGuard,yearlyReset)









module.exports = router;
