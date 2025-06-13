let adminmodel=require("../models/adminmodel.js");
let dotenv=require("dotenv").config();

exports.adminctrl=((req,res)=>{
  res.render("home.ejs");
});
//user login
exports.userlogin=((req,res)=>{
    res.render("userlogin.ejs",{msg:""});
});
exports.usersignup=((req,res)=>{
   res.render("usersignup.ejs",{msg:""});
});

exports.userregister=((req,res)=>{
   let {username,password,confirmpassword,email,contact,city,role}=req.body;
   let result=adminmodel.addregisterdata(username,password,confirmpassword,email,contact,city,role);
   result.then((r)=>{
    res.render("userlogin.ejs",{msg:"data store successfully...."});
   }).catch((err)=>{
    res.render("usersignup.ejs",{msg:"data not store successfully..."});

   });
});

exports.validuserdata=((req,res)=>{
  let {username,password}=req.body;
  let promobj=adminmodel.validuserdata(username,password);
  promobj.then((ress)=>{
   req.session.userid = ress[0].uid;
   if(ress.length>0){
      let role=ress[0].role;
      if(role==='user')
      {
         // let name=ress[0].username;
       res.render("userdashboard.ejs",{viewprof:ress});
      }else{
         res.render("userlogin.ejs",{msg:" invalid username and password "})
      }
      
   }else{
      res.render("userlogin.ejs",{msg:" invalid username and password "})
   }
  }).catch((err)=>{
      res.render("error.ejs");
     console.log(err)
  }); 
});

// exports.viewuserprofile=((req,res)=>{
//   let loginuser=req.session.userid;
//   res.render("userdashboard.ejs",{view:loginuser});
//   console.log(loginuser)
// });


//admin login
exports.adminlogin=((req,res)=>{
   res.render("adminlogin.ejs",{msg:""});
});

exports.validadmin=((req,res)=>{
    let{username,password,superadmin}=req.body;
    let validadminn=adminmodel.validadmindata(username,password);
    validadminn.then((validad)=>{
      if(validad.length>0)
      {
         if(superadmin===process.env.adminkey)
         {
            res.render("admindashboard.ejs");
         }else{
            res.render("adminlogin.ejs",{msg:"invalid username and password"});
         }
      }else{
         res.render("adminlogin.ejs",{msg:"invalid username and password"});
      }
    }).catch((err)=>{
         res.render("error.ejs");
    });
});




