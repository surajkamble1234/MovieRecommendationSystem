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

exports.userdelete=((...userdel)=>{
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
          console.log(result)
         resolve(result);
        
        }
    });
  });
});