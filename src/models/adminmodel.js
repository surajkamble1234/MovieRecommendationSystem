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