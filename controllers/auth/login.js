const bcryptjs=require('bcryptjs');

const {customErrorResponse}=require('../../helpers/responses');
const {loginUserResponse}=require('../../helpers/helpers');
const User=require('../../models/user');

const login=async(req,res)=>{
    const {email,password}=req.body;
    try {
        const user=await User.findOne({email});

        if(!user){return customErrorResponse(res,"User not founded",400);}

        if(!user.state){ return customErrorResponse(res,"User is currently not active",400);}

        const validPassword=bcryptjs.compareSync(password,user.password);
        if(!validPassword){ return customErrorResponse(res,"Invalid password",400);}

        loginUserResponse(res,user);

    } catch (error) {
        console.log(error)
        customErrorResponse(res,"Contact database administrator",500);
    }
    
}

module.exports=login;