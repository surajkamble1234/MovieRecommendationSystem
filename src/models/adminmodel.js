let conn=require("../../db.js");

exports.addregisterdata=((...register)=>{

    return new Promise((resolve,reject)=>{
        conn.query("insert into userregister values('0',?,?,?,?,?,?,?)",[...register],(err,result)=>{
             if(err){
                reject(err);
             }else{
                resolve(result);
             }
        });
    });
});

exports.validuserdata=((...uservalidate)=>{
  return new Promise((resolve,reject)=>{
     conn.query("select * from userregister where username=? and password=?",[...uservalidate],(err,result)=>{
      if(err)
      {
        reject(err);

      }else{
        resolve(result);
        
      }
     });
  });
});

exports.admindelete=((...userdel)=>{
   return new Promise((resolve,reject)=>{
      conn.query("delete from userregister where uid=?",[...userdel],(err,result)=>{
       if(err){
        reject(err);
       }else{
        resolve(result);
       }
      });
   });
});

exports.updateuser=((...userupdate)=>{
   return new Promise((resolve,result)=>{
     conn.query("select * from userregister where uid=?",[...userupdate],(err,result)=>{
         if(err){
            reject(err);
         }else{
            resolve(result);
         }
     });
   });
});

exports.finalupdateuser=((...finaluser)=>{
 return new Promise((resolve,reject)=>{
conn.query("update userregister set username=?,password=?,confirmpassword=?,contact=?,city=? where uid=?",[...finaluser],(err,result)=>{
       if(err)
       {
         reject(err);
   
       }else{
         resolve(result);
           
       }
 });
 });
});

exports.validadmindata=((...validadmin)=>{
  return new Promise((resolve,reject)=>{
    conn.query("select * from userregister where username=? and password=?",[...validadmin],(err,result)=>{
       if(err)
       {
        reject(err);
       }else{
        resolve(result);
       }
    });
  });
});

exports.viewalluser=(()=>{
  return new Promise((resolve,reject)=>{
    conn.query("select * from userregister ",(err,result)=>{
        if(err)
        {
         reject(err);
        }else{
         resolve(result);
        
        }
    });
  });
});

exports.allmovies=(()=>{
   return new Promise((resolve,reject)=>{
    conn.query("select count(*) from movies ",(err,result)=>{
        if(err)
        {
         reject(err);
        }else{
         resolve(result);
        
        }
    });
  });
})



exports.savemoviee=((...savemovi)=>{
  return new Promise((resolve,reject)=>{
    conn.query("insert into movies (title, description, release_date, genre, director, language, country,budget, revenue, runtime, poster_url, trailer_url, movie_url) values(?,?,?,?,?,?,?,?,?,?,?,?,?)",[...savemovi],(err,result)=>{
         if(err)
         {
          reject(err);
         }else{
          resolve(result);
         }
    });
  });
});

