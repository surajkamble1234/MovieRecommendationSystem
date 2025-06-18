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
      req.session.user_id=ress[0].uid;
      req.session.usernamee=ress[0].username;
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

// exports.validadmin=((req,res)=>{
//     let{username,password,adminkey}=req.body;
//     let validadminn=adminmodel.validadmindata(username,password);
//     validadminn.then((validad)=>{
//       if(validad.length>0)
//       {    let role=validad[0].role;
//          if((adminkey===process.env.adminkey)&&role==='admin')
//          {
//             //here taking all userdata
//             let viewuse=adminmodel.viewalluser();
//                 viewuse.then((data)=>{
//                   res.render("admindashboard.ejs",{viewuserdata:data});
//                 }).catch((err)=>{
//                   res.render("error.ejs");
//                 })
               
            
//          }else{
//             res.render("adminlogin.ejs",{msg:"invalid username and password"});
//          }
//       }else{
//          res.render("adminlogin.ejs",{msg:"invalid username and password"});
//       }
//     }).catch((err)=>{
//          res.render("error.ejs");
//     });
// });
exports.validadmin = (req, res) => {
    let { username, password, adminkey } = req.body;
    let validadminn = adminmodel.validadmindata(username, password);

    validadminn.then((validad) => {
        if (validad.length > 0) {
            let role = validad[0].role;

            if ((adminkey === process.env.adminkey) && role === 'admin') {
                let viewuse = adminmodel.viewalluser();
                let totalMovies = adminmodel.allmovies();

                Promise.all([viewuse, totalMovies])
                    .then(([userData, movieData]) => {
                        res.render("admindashboard.ejs", {
                            viewuserdata: userData,
                            totalMovies: movieData[0]['count(*)'] // Extract count from result
                        });
                    })
                    .catch((err) => {
                        res.render("error.ejs");
                    });

            } else {
                res.render("adminlogin.ejs", { msg: "Invalid username or password" });
            }
        } else {
            res.render("adminlogin.ejs", { msg: "Invalid username or password" });
        }
    }).catch((err) => {
        res.render("error.ejs");
    });
};


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
// movie section
exports.addmovie=((req,res)=>{
   res.render("movie.ejs",{msg:""});
});
//usermovie 
exports.usermovies = (req, res) => {
  let allMovies = adminmodel.getAllMovies(); // ✅ Fetch movie details
  
  allMovies.then((movies) => {
    res.json(movies); // ✅ Send JSON response
  }).catch((err) => {
    res.status(500).json({ error: "Error fetching movies" });
  });
};

exports.savemovie=((req,res)=>{
   let{title,description,release_date,genre,director,language,country,budget,revenue,runtime,poster_url,trailer_url,movie_url}=req.body;

   let savemovi=adminmodel.savemoviee(title,description,release_date,genre,director,language,country,budget,revenue,runtime,poster_url,trailer_url,movie_url);
       savemovi.then((savemove)=>{
        res.render("movie.ejs",{msg:"movie details saved"});
       
       }).catch((err)=>{
        res.render("movie.ejs",{msg:"movie details not saved"});
        
       });
});


exports.viewmovie=((req,res)=>{
  let viewmovie=adminmodel.viewmovie();
  viewmovie.then((viewmo)=>{
    res.render("viewmovie.ejs",{viewm:viewmo});
  }).catch((err)=>{
    res.render("viewmovie.ejs",{viewm:viewmo});
  });
});

exports.moviesearch=((req,res)=>{
  let searchname=req.query.sm;
  let searchobj=adminmodel.searchmovie(searchname);
      searchobj.then((seaobj)=>{
       res.send(seaobj);
      }).catch((err)=>{
        console.log(err)
      });
});

//ratinguser
exports.ratinguser=((req,res)=>{
  let viewmovierate=adminmodel.ratingmovie();
  let uid=req.session.user_id;
  let username=req.session.usernamee;
      viewmovierate.then((viewrate)=>{
          res.render("rateform.ejs",{ratemove:viewrate,uid,username,msg:""});

      }).catch((err)=>{
          res.render("rateform.ejs",{ratemove:viewrate,uid,username,msg:""});
      });
  
});

exports.saverating=((req,res)=>{
  let {uid,mid,rating,review}=req.body;
  let saverate=adminmodel.saverating(uid,mid,rating,review);
      saverate.then((savere)=>{
        let viewmovierate=adminmodel.ratingmovie();
        let uid=req.session.user_id;
        let username=req.session.usernamee;
      viewmovierate.then((viewrate)=>{
          res.render("rateform.ejs",{ratemove:viewrate,uid,username,msg:"rating submit"});

      }).catch((err)=>{
          res.render("rateform.ejs",{ratemove:viewrate,uid,username,msg:"rating not submit"});
      });
      }).catch((err)=>{
         res.render("rateform.ejs",{ratemove:viewrate,uid,username,msg:"rating not submit"});
     
      });

});

exports.reviewmovie=((req,res)=>{
  let reviewmove=adminmodel.viewreview();
      reviewmove.then((ratemove)=>{
      res.render("review.ejs",{viewrate:ratemove});
      }).catch((err)=>{
      res.render("review.ejs",{viewrate:ratemove});
      });
});

//watchlist
exports.watchlist=((req,res)=>{
  let watchobj=adminmodel.viewmovie();
      let useri=req.session.user_id;
      let user=req.session.usernamee;
      
      watchobj.then((watch)=>{
        res.render("watchlist.ejs",{wamove:watch,id:useri,name:user,msg:""});
      }).catch((err)=>{
          console.log(err)
         res.render("watchlist.ejs",{wamove:watch,id:useri,name:user,msg:""});
      });

});

exports.savewatchlistt=((req,res)=>{
  let {uid,mid}=req.body;
   let savewatch=adminmodel.savewatch(uid,mid);
       savewatch.then((sawa)=>{
        
      let watchobj=adminmodel.viewmovie();
      watchobj.then((watch)=>{
      let useri=req.session.user_id;
      let user=req.session.usernamee;
        res.render("watchlist.ejs",{wamove:watch,id:useri,name:user,msg:"watchlist submit"});
      }).catch((err)=>{
  
         res.render("watchlist.ejs",{wamove:watch,id:useri,name:user,msg:"not save"});

      }).catch((err)=>{
      
         res.render("watchlist.ejs",{wamove:watch,id:useri,name:user,msg:"not save"});
      });
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

exports.home2=((req,res)=>{
  res.render("homeanimation.ejs");
})
