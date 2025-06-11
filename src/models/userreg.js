let conn=require("../../db.js");

exports.addregisterdata=((...register)=>{

    return new Promise((resolve,reject)=>{
        conn.query("insert into register values('0',?,?,?,?,?,?)",[...register],(err,result)=>{
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
     conn.query("select * from register where username=? and password=?",[...uservalidate],(err,result)=>{
      if(err)
      {
        reject(err);

      }else{
        resolve(result);
        
      }
     });
  });
});