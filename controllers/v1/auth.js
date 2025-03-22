const {registerUserUtil,loginUserUtil,getUserProfileUtil}=require("../../utils/v1/auth")

async function registerUser(req,res) {
    try {

        const {statusCode,...response}=await registerUserUtil(req.body);
        res.status(statusCode).json(response);

    } catch (error) {
        console.log(error);
        return {statusCode:500,message:"Something went wrong",error}
    }
}

async function loginUser(req,res) {
    try {
        const{username,password}=req.body;
        const {statusCode,...response}=await loginUserUtil(username,password);
        res.status(statusCode).json(response);

    } catch (error) {
        console.log(error);
        return {statusCode:500,message:"Something went wrong",error}
    }
}

async function getProfile(req,res) {
    try {
        const{username,password}=req.body;
        const {statusCode,...response}=await getUserProfileUtil(req.user.id);
        res.status(statusCode).json(response);

    } catch (error) {
        console.log(error);
        return {statusCode:500,message:"Something went wrong",error}
    }
}

module.exports={registerUser,loginUser,getProfile}