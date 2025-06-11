let adminmodel=require("../models/userreg.js");

exports.adminctrl=((req,res)=>{
  res.render("home.ejs");
});
//user login
exports.userlogin=((req,res)=>{
    res.render("userlogin.ejs",{msg:""});
});

exports.userregister=((req,res)=>{
   let {username,password,confirmpassword,email,contact,city,role}=req.body;
   let result=adminmodel.addregisterdata(username,password,confirmpassword,email,contact,city.role);
   result.then((r)=>{
    res.render("userlogin.ejs",{msg:"data store successfully...."});
   }).catch((err)=>{
    res.render("userlogin.ejs",{msg:"data not store successfully..."});
   });
});

exports.validuserdata=((req,res)=>{
  let {username,password}=req.body;
  let promobj=adminmodel.validuserdata(username,password);
  promobj.then((ress)=>{
   if(ress.length>0){
      req.session.uid = ress[0].rid;
      res.render("userprofile.ejs");
   }else{
      res.render("userlogin.ejs",{msg:" invalid username and password "})
   }
  }).catch((err)=>{
      res.render("error.ejs");
     console.log(err)
  }); 
});

exports.usersignup=((req,res)=>{
   res.render("usersignup.ejs");
});

//admin login
exports.adminlogin=((req,res)=>{
   res.render("adminlogin.ejs");
});

exports.adminvalid=((req,res)=>{
   res.render("adminsignup.ejs");
});

