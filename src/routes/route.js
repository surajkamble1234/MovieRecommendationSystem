let express=require("express");
let router=express.Router();
let adminctrl=require("../controller/adminctrl.js");
router.get("/",adminctrl.adminctrl);
//user login
router.get("/user",adminctrl.userlogin);
router.get("/usersignup",adminctrl.usersignup);

router.post("/useradd",adminctrl.userregister);
router.post("/validuser",adminctrl.validuserdata);

router.get("/delbyuser",adminctrl.deleteuser);
router.get("/updateuser",adminctrl.updateuser);
router.post("/finaluserupdate",adminctrl.finalupdateuser);
//admin login
router.get("/adminlogin",adminctrl.adminlogin);
router.post("/validadminn",adminctrl.validadmin);
router.get("/useradminview",adminctrl.viewuseradmin);

//search movie
//Movie Recommendations Route
router.get("/smart", adminctrl.smartsearch);
router.get("/search", adminctrl.searchMovies);

module.exports=router;