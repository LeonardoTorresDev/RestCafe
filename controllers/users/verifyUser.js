const jwt=require('jsonwebtoken');
const User=require('../../models/user');

const {customResponse, customErrorResponse, errorResponse}=require('../../helpers/responses');

const verifyUser=async(req,res)=>{
    const {token}=req.body;
    if(!token){return customErrorResponse(res,"Token not found",400)}
    try{      
        const {uid}=jwt.verify(token,process.env.VERIFY_KEY);
        await User.findByIdAndUpdate(uid,{verified: true}).exec();
        customResponse(res,"User verified!",200);
    }
    catch(error){
        errorResponse(res,"Contact database administrator",error,500);
    }
}

module.exports=verifyUser;