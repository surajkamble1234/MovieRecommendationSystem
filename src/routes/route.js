let express=require("express");
let router=express.Router();
let adminctrl=require("../controller/adminctrl.js");
router.get("/",adminctrl.adminctrl);
router.get("/user",adminctrl.userlogin);
module.exports=router;