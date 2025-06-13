let express=require("express");
let router=express.Router();
let adminctrl=require("../controller/adminctrl.js");
router.get("/",adminctrl.adminctrl);
//user login
router.get("/user",adminctrl.userlogin);
router.get("/usersignup",adminctrl.usersignup);

router.post("/useradd",adminctrl.userregister);
router.post("/validuser",adminctrl.validuserdata);

//user dashboard
router.post("/viewprofile",adminctrl.viewuserprofile);
//admin login
router.get("/adminlogin",adminctrl.adminlogin);
router.get("/validadminlogin",adminctrl.validadmin);

module.exports=router;