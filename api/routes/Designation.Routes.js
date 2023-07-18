const express=require('express');
const { addDesig, FindAllDesignation } = require('../controller/Designation.Controller');

const { verifyUser } = require('../middleware/Auth.MiddleWare');
const { roleGuard } = require('../middleware/RoleGuard.MiddleWare');
let router=express.Router();

 



router.post("/add",verifyUser,roleGuard,addDesig);
router.get("/get",verifyUser,roleGuard,FindAllDesignation);


module.exports = router;
