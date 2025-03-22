const bcrypt = require('bcryptjs');
const jwt=require("jsonwebtoken")

 async function getHashedString(str) {
        return new Promise((resolve,reject)=>{
            bcrypt.genSalt(15, function(err, salt) {
                   bcrypt.hash(str, salt, function(err, hash) {
                        console.log({hash});
                        
                       resolve(hash) ;
                    });
                });  
        })
}
async function verifyHash(str,hash) {
   
    return await bcrypt.compare(str, hash);
}

 async function getToken(data) {
    return  jwt.sign(data, process.env.JWT_SECRET, { expiresIn: "7d" });
    
}
 async function verifyToken(params) {
    //
    
}
module.exports={getHashedString,getToken,verifyToken,verifyHash}
