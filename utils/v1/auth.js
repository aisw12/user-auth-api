const {getHashedString,getToken,verifyToken,verifyHash}=require("../crypto");
const User = require('../../models/User');


async function registerUserUtil(userData) {

    try {
       
        const { username, password, role } =userData;
        const hashedPassword=await getHashedString(password);

    const user = new User({ username, password:hashedPassword, role });
    await user.save();
   
      return  {statusCode:200,message:"Registration Successful"}
    } catch (error) {
        console.log(error);
        return {statusCode:500,message:"Something went wrong",error}
        
    }
}

async function loginUserUtil(username,password) {
    try {
        const user = await User.findOne({ username});
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        const isMatch = await verifyHash(password,user.password)
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        const token = await getToken({ id: user._id, username: user.username })
      return  {statusCode:200, message: "Login successful", token }
    } catch (error) {
        console.log(error);
        return {statusCode:500,message:"Something went wrong",error}
        
        
    }
}

async function getUserProfileUtil(userId) {
    try {
        const user = await User.findById(userId).select('-password');
        return  {statusCode:200,user}
    } catch (error) {
       
        console.log(error);
        return {statusCode:500,message:"Something went wrong",error}
        
        
    }
}
module.exports={registerUserUtil,loginUserUtil,getUserProfileUtil}