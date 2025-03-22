const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const authMiddleware = require('../middleware/authMiddleware');
const {getHashedString,getToken,verifyToken}=require("../utils/crypto");
const {registerUser,loginUser,getProfile}=require("../controllers/v1/auth");
const router = express.Router();

router.post('/register',registerUser)

router.post("/login",loginUser )
    
router.get('/profile', authMiddleware, getProfile);

async function getHashString(str) {
return new Promise((resolve,reject)=>{
    bcrypt.genSalt(15, function(err, salt) {
           bcrypt.hash(str, salt, function(err, hash) {
                console.log({hash});
                
               resolve(hash) ;
            });
        });  
})
   
}
module.exports = router;

