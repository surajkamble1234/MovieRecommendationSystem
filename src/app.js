let express=require("express");
let bodyParser=require("body-parser");
let cookieParser=require("cookie-parser");
let router=require("../src/routes/route.js");
let conn=require("../db.js");
let session=require("express-session");
let path=require("path");
let app=express();
    app.use(express.static("public"));
    // app.set("view engines","ejs");
    // app.set("views", path.join(__dirname, "..", "views"));
    app.set("view engine", "ejs");  // ✅ Correct setting
app.set("views", path.join(__dirname, "..", "views"));  // ✅ Ensure views folder exists

    

    app.use(bodyParser.json());
    app.use(express.urlencoded({extended:true}));
    app.use(session({
        secret:'11111111fdf',
        resave:false,
        saveUninitialized:false
    }));
    app.use("/",router);
    
module.exports=app;
