const jwt=require('jsonwebtoken');

const {customErrorResponse}=require('../helpers/responses');
const User=require('../models/user');

const authToken=async(req,res,next)=>{
    const token=req.cookies.RestCookie;
    if(!token){ return customErrorResponse(res,"User is not logged in",400);}
    try{      
        const {uid}=jwt.verify(token,process.env.SECRET_KEY);
        const user=await User.findById(uid).exec();
        
        if(!user){ return customErrorResponse(res,"Invalid token: User doesn't exists",400);}
        if(!user.state){ return customErrorResponse(res,"Invalid token: User is currently unactive",401);}
     
        req.user=user;    
        next();
    }
    catch(error){
        console.log(error);
        customErrorResponse(res,"Invalid token",401);
    }
}

module.exports={
    authToken
};