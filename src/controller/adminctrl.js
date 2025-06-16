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
  }); 
});



exports.updateuser=((req,res)=>{
  let userid=req.query.userid;
   let userupda=adminmodel.updateuser(userid);
   userupda.then((userupdatedata)=>{
   res.render("updateuser.ejs",{userupda:userupdatedata});

   }).catch((err)=>{
   res.render("updateuser.ejs",{userupda:userupdatedata});
  
   });
});

exports.finalupdateuser=((req,res)=>{
let {username,password,confirmpassword,contact,city,uid}=req.body;
let finalup=adminmodel.finalupdateuser(username,password,confirmpassword,contact,city,uid);
    finalup.then((userup)=>{
        res.render("userlogin.ejs",{msg:"data update successfully...."});
    }).catch((err)=>{
     res.render("userlogin.ejs",{msg:"data not update successfully...."});
    });
});

//admin login
exports.adminlogin=((req,res)=>{
   res.render("adminlogin.ejs",{msg:""});
});

exports.validadmin=((req,res)=>{
    let{username,password,adminkey}=req.body;
    let validadminn=adminmodel.validadmindata(username,password);
    validadminn.then((validad)=>{
      if(validad.length>0)
      {    let role=validad[0].role;
         if((adminkey===process.env.adminkey)&&role==='admin')
         {
            //here taking all userdata
            let viewuse=adminmodel.viewalluser();
                viewuse.then((data)=>{
                  res.render("admindashboard.ejs",{viewuserdata:data});
                }).catch((err)=>{
                  res.render("error.ejs");
                })
            
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

exports.viewuseradmin = ((req, res) => {
  adminmodel.viewalluser()
    .then((data) => {
      res.render("admindashboard.ejs", { viewuserdata: data });
    })
    .catch((err) => {
      res.render("error.ejs");
    });
});

exports.deleteadmin=((req,res)=>{
  let userid=req.query.userid;
  let deluser=adminmodel.admindelete(userid);
      deluser.then((deluse)=>{
         let viewuse=adminmodel.viewalluser();
                viewuse.then((data)=>{
                  res.render("admindashboard.ejs",{viewuserdata:data});
                }).catch((err)=>{
                  res.render("error.ejs");
                })
      }).catch((err)=>{
            res.render("admindashboard.ejs",{viewuserdata:data});
        
      });
});


exports.updateadmin=((req,res)=>{
  let userid=req.query.userid;
   let userupda=adminmodel.updateuser(userid);
   userupda.then((userupdatedata)=>{
   res.render("updateadmin.ejs",{userupda:userupdatedata});

   }).catch((err)=>{
   res.render("updateadmin.ejs",{userupda:userupdatedata});
  
   });
});

exports.finalupdateadmin=((req,res)=>{
let {username,password,confirmpassword,contact,city,uid}=req.body;
let finalup=adminmodel.finalupdateuser(username,password,confirmpassword,contact,city,uid);
    finalup.then((userup)=>{
        let viewuse=adminmodel.viewalluser();
                viewuse.then((data)=>{
                  res.render("admindashboard.ejs",{viewuserdata:data});
                }).catch((err)=>{
                  res.render("error.ejs");
                })
    }).catch((err)=>{
      res.render("admindashboard.ejs",{viewuserdata:data});
    });
});

exports.addmovie=((req,res)=>{
   res.render("movie.ejs",{msg:""});
});

exports.savemovie=((req,res)=>{
   let{title,description,release_date,genre,director,language,country,budget,revenue,runtime,poster_url,trailer_url,movie_url}=req.body;

   let savemovi=adminmodel.savemoviee(title,description,release_date,genre,director,language,country,budget,revenue,runtime,poster_url,trailer_url,movie_url);
       savemovi.then((savemove)=>{
        res.render("movie.ejs",{msg:"movie details saved"});
       }).catch((err)=>{
        res.render("movie.ejs",{msg:"movie details not saved"});
        
       });


});


