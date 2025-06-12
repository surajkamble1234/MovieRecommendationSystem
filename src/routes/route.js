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

//admin login
router.get("/adminlogin",adminctrl.adminlogin);

<<<<<<< HEAD

=======
router.post("/validadminn",adminctrl.validadmin);
>>>>>>> 2c99c621a32da3d9ce2f6f89d440e0a36284c32e
module.exports=router;