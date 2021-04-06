const bcryptjs=require('bcryptjs');

const {customResponseUser, customErrorResponse}=require('../../helpers/responses');
const {generateJWT,sendCookie}=require('../../helpers/helpers');
const User=require('../../models/user');

const login=async(req,res)=>{
    const {email,password}=req.body;
    try {
        const user=await User.findOne({email});

        if(!user){return customErrorResponse(res,"User not founded",400);}

        if(!user.state){ return customErrorResponse(res,"User is currently not active",400);}

        const validPassword=bcryptjs.compareSync(password,user.password);
        if(!validPassword){ return customErrorResponse(res,"Unvalid password",400);}

        const token=await generateJWT(user.id);
        sendCookie(res,token);

        customResponseUser(res,"User logged in",user);

    } catch (error) {
        console.log(error)
        customErrorResponse(res,"Contact database administrator",500);
    }
    
}

module.exports=login;