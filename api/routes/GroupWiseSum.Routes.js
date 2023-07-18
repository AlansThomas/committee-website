const express=require('express');
const { addSumTable, findSumTable, topThreeGroups } = require('../controller/ScorePublish.Controller');
const { verifyUser } = require('../middleware/Auth.MiddleWare.js');
const { roleGuard } = require('../middleware/RoleGuard.MiddleWare.js');
let router=express.Router();

 



router.post("/Add",verifyUser,roleGuard,addSumTable);
router.get("/GetPublish",verifyUser,roleGuard,findSumTable);
router.get("/GetTopThreeGroups",verifyUser,roleGuard,topThreeGroups);

module.exports = router;
