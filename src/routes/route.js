let express=require("express");
let router=express.Router();
let adminctrl=require("../controller/adminctrl.js");
router.get("/",adminctrl.adminctrl);
//user login
router.get("/user",adminctrl.userlogin);
router.get("/usersignup",adminctrl.usersignup);

router.post("/useradd",adminctrl.userregister);
router.post("/validuser",adminctrl.validuserdata);


router.get("/updateuser",adminctrl.updateuser);
router.post("/finaluserupdate",adminctrl.finalupdateuser);
//admin login
router.get("/adminlogin",adminctrl.adminlogin);
router.post("/validadminn",adminctrl.validadmin);
router.get("/useradminview",adminctrl.viewuseradmin);
<<<<<<< HEAD
router.get("/delbyuser",adminctrl.deleteadmin);

router.get("/updateadmin",adminctrl.updateadmin);
router.post("/finaladminupdate",adminctrl.finalupdateadmin);

router.get("/moviee",adminctrl.addmovie);
router.post("/savemovie",adminctrl.savemovie);
=======

//search movie
//Movie Recommendations Route
router.get("/smart", adminctrl.smartsearch);
router.get("/search", adminctrl.searchMovies);
>>>>>>> fa950376a1e49669a18dcce8e9253ed737f1e0a9

module.exports=router;