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