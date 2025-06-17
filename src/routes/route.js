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

router.get("/delbyuser",adminctrl.deleteadmin);

router.get("/updateadmin",adminctrl.updateadmin);
router.post("/finaladminupdate",adminctrl.finalupdateadmin);

router.get("/moviee",adminctrl.addmovie);
router.post("/savemovie",adminctrl.savemovie);

router.get("/home2",adminctrl.home2);
router.get("/smart",adminctrl.smartsearch);
router.get("/search", adminctrl.searchMovies);

//ratinguser
router.get("/ratinguser",adminctrl.ratinguser);
router.post("/saverating",adminctrl.saverating);
router.get("/viewmovie",adminctrl.viewmovie);
router.get("/moviesearch",adminctrl.moviesearch);

//search movie
//Movie Recommendations Route
router.get("/smart", adminctrl.smartsearch);
router.get("/search", adminctrl.searchMovies);



module.exports=router;