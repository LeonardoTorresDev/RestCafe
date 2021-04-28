const jwt=require('jsonwebtoken');

const {customErrorResponse}=require('../helpers/responses');
const User=require('../models/user');

const authToken=async(req,res,next)=>{

    const authHeader=req.header('Authorization');
    if(!authHeader){ return customErrorResponse(res,"User is not logged in",400);}
    if(!authHeader.startsWith("Bearer ",0)){ return customErrorResponse(res,"Bad authorization",400); }

    const token = authHeader.substring(7,authHeader.length);

    try{      
        const {uid}=jwt.verify(token,process.env.SECRET_KEY);
        const user=await User.findById(uid).exec();
        
        if(!user){ return customErrorResponse(res,"Invalid token: User doesn't exists",400);}
        if(!user.verified){ return customErrorResponse(res,"User email it's not confirmed",401);}
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