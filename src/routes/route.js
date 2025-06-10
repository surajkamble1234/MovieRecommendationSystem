let express=require("express");
let router=express.Router();
let adminctrl=require("../controller/adminctrl.js");
router.get("/",adminctrl.adminctrl);
//user login
router.get("/user",adminctrl.userlogin);
router.get("/usersignup",adminctrl.usersignup);

router.post("/useradd",adminctrl.userregister);
//admin login
router.get("/adminlogin",adminctrl.adminlogin);
router.get("/adminsignup",adminctrl.adminsignup);

module.exports=router;