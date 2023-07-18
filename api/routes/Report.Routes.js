const express = require('express');

const { addDesig, FindAllDesignation } = require('../controller/Designation.Controller');
const { createReport, findReport, reedReport } = require('../controller/Report.Controller');
const {reportValidator} = require('../validator/Report.Validator')

const { verifyUser } = require('../middleware/Auth.MiddleWare');
const { roleGuard } = require('../middleware/RoleGuard.MiddleWare');
let router = express.Router();





router.post("/add", verifyUser, roleGuard, addDesig);
router.get("/get", verifyUser, roleGuard, FindAllDesignation);
router.post("/report", verifyUser,reportValidator("Create"), createReport);
router.get("/report/:page", verifyUser,findReport);
router.post("/report/:id", verifyUser,reedReport);

module.exports = router;
