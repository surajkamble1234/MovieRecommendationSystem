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

exports.deleteuser=((req,res)=>{
  let userid=req.query.userid;
  let deluser=adminmodel.userdelete(userid);
      deluser.then((deluse)=>{
         res.render("home.ejs");
      }).catch((err)=>{
           res.render("home.ejs");
        
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
      {
         if(adminkey===process.env.adminkey)
         {
            res.render("admindashboard.ejs",{viewuserdata:[]});
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

//smart search
const axios = require("axios");
require("dotenv").config();

exports.smartsearch = async (req, res) => {
    try {
        const movieId = req.query.id || "550"; // Default movie ID
        const apiKey = process.env.TMDB_API_KEY;

        if (!apiKey) {
            throw new Error("API key missing! Check your .env file.");
        }

        const url = `https://api.themoviedb.org/3/movie/${movieId}/recommendations?api_key=${apiKey}&language=en-US&page=1`;

        const response = await axios.get(url);
        const movies = response.data.results || [];

        res.render("smartsearch", { movies, errorMsg: movies.length === 0 ? "No recommendations found." : "" });
    } catch (error) {
        console.error("Error fetching movie recommendations:", error.message);
        res.render("smartsearch", { movies: [], errorMsg: "Failed to fetch movie recommendations. Try again later!" });
    }
};

exports.searchMovies = async (req, res) => {
    try {
        const query = req.query.q; // Get search query from user input
        const apiKey = process.env.TMDB_API_KEY;

        if (!query) {
            return res.render("smartsearch", { movies: [], errorMsg: "Please enter a movie name or genre." });
        }

        const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(query)}&language=en-US&page=1`;

        const response = await axios.get(url);
        const movies = response.data.results || [];

        res.render("smartsearch", { movies, errorMsg: movies.length === 0 ? "No movies found. Try another search!" : "" });
    } catch (error) {
        console.error("Error fetching movies:", error.message);
        res.render("smartsearch", { movies: [], errorMsg: "Failed to fetch movie recommendations. Please try again later." });
    }
};
