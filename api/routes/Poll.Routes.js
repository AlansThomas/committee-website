const express = require('express');
const app = express();
const router = express.Router();
const { verifyUser } = require('../middleware/Auth.MiddleWare.js');
const { roleGuard } = require('../middleware/RoleGuard.MiddleWare.js');
module.exports = router;
const bdyp = require('body-parser');
const bodyParser = require('body-parser');
app.use(bdyp.json());
app.use(bodyParser.urlencoded({ extended: false }));
const dotenv = require('dotenv');
dotenv.config();
const pollController=require('../controller/Poll.Controller')
//////////////////////
const {pollValidator} = require('../validator/Poll.Validator')



router.post("/createPoll", verifyUser, roleGuard, pollValidator('createPoll'), pollController.createPoll);
router.get("/listAllPolls", verifyUser, roleGuard, pollController.listAllPolls);
router.post("/votePoll", verifyUser, roleGuard, pollValidator('votePoll'), pollController.votePoll);
router.get("/getPollById/:id", verifyUser, roleGuard, pollValidator('getPoll'), pollController.getPollById);
router.get("/getActivePolls", verifyUser, roleGuard, pollController.getActivePolls);
router.put("/updatePoll/:id", verifyUser, roleGuard, pollValidator('updatePoll'), pollController.updatePoll);
router.delete("/deletePoll/:id", verifyUser, roleGuard, pollValidator('getPoll'),  pollController.deletePoll)


module.exports = router;