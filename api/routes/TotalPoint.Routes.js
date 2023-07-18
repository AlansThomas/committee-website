const express=require('express');
const { verify } = require('jsonwebtoken');

const { findByGIdAndEvntId, updateAll, publish, findByGIdAndEvntIdAndSumEventWise1, findByGIdAndEvntIdAndSumEventWise2, findByGIdAndEvntIdAndSumGroupWise1, findByGIdAndEvntIdAndSumGrouptWise2, findByGIdAndEvntIdAndSumEventWise1Winner, getpublishtoCommitty,  findByGIdAndEvntIdAndSumEventWise1Winners, notverifiedPoint, verifiedPoint, GetTotalPointPublishToInovature, findByGIdAndEvntIdAndSumGroupWiseforpublish, eventWisePerformanceOfOwnGroup, reportedPoints, deletePointsByAdminBeforePublishing, quarterWisePoints,quaterlyReset } = require('../controller/TotalPoint.Controller');
// const {GetInfo, GetInfoTotalpointeqGroup, findByGIdAndEvntId, updateAll, publish, findByGIdAndEvntIdAndSum,quaterlyReset,findByGIdAndEvntIdAndSumEventWise1, findByGIdAndEvntIdAndSumEventWise2, findByGIdAndEvntIdAndSumGroupWise1, findByGIdAndEvntIdAndSumGrouptWise2, publishtoCommitty, findByGIdAndEvntIdAndSumEventWise1Winner, getpublishtoCommitty,  findByGIdAndEvntIdAndSumEventWise1Winners, notverifiedPoint, verifiedPoint, TotalPointPublishToInovature, GetTotalPointPublishToInovature, findByGIdAndEvntIdAndSumGroupWiseforpublish, eventWisePerformanceOfOwnGroup, reportedPoints, deletePointsByAdminBeforePublishing, eventWisePerformanceOfAllGroups } = require('../controller/TotalPoint.Controller');
const { verifyUser } = require('../middleware/Auth.MiddleWare');
const { roleGuard } = require('../middleware/RoleGuard.MiddleWare');
let router=express.Router();

const {pointValidator} = require('../validator/TotalPoint.Validator')


router.post("/Get/EventId/GroupId",verifyUser,roleGuard,findByGIdAndEvntId);
router.post("/Get/EventId/GroupIdAndSumEvent1",verifyUser,roleGuard,findByGIdAndEvntIdAndSumEventWise1);
router.post("/Get/EventId/GroupIdAndSumEvent1Winner",verifyUser,roleGuard,findByGIdAndEvntIdAndSumEventWise1Winner);
router.post("/Get/EventId/GroupIdAndSumEvent1Winners/:id",verifyUser,roleGuard,findByGIdAndEvntIdAndSumEventWise1Winners);
router.post("/Get/EventId/GroupIdAndSumEvent2",verifyUser,roleGuard,findByGIdAndEvntIdAndSumEventWise2);
router.post("/Get/EventId/GroupIdAndSumGroup1",verifyUser,roleGuard,findByGIdAndEvntIdAndSumGroupWise1);
router.get("/Get/EventId/GroupIdAndSumGroup1forpublish",verifyUser,roleGuard,findByGIdAndEvntIdAndSumGroupWiseforpublish);
router.post("/Get/EventId/GroupIdAndSumGroup2",verifyUser,roleGuard,findByGIdAndEvntIdAndSumGrouptWise2);

router.post("/Get/Update",verifyUser,roleGuard, updateAll);
router.post("/publish",verifyUser,roleGuard, publish);
router.post("/GetpublishToCommittee",verifyUser,roleGuard, getpublishtoCommitty);
router.post("/verifiedPoint/:id",verifyUser,roleGuard, verifiedPoint);
router.post("/notverifiedPoint/:id",verifyUser,roleGuard, notverifiedPoint);
router.get("/GroupWiseTotalPointGet",GetTotalPointPublishToInovature);  
router.get("/eventWiseGroupTotalPoint", verifyUser,roleGuard,eventWisePerformanceOfOwnGroup);
router.get("/reportedPoints", verifyUser, roleGuard, reportedPoints)
router.delete("/deleteVerifiedPoints/:id", verifyUser, roleGuard, pointValidator('getId'), deletePointsByAdminBeforePublishing)
router.get("/quarterWiseTotalpoints/:quarterId", verifyUser, roleGuard, quarterWisePoints)
router.put("/quaterResetManually", verifyUser, roleGuard, quaterlyReset);


module.exports = router;