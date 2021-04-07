const bcryptjs=require('bcryptjs');

const {customErrorResponse,errorResponse,loginUserResponse}=require('../../helpers/responses');
const User=require('../../models/user');

const login=async(req,res)=>{
    const {email,password}=req.body;
    try {
        const user=await User.findOne({email});

        if(!user){return customErrorResponse(res,"User not founded",400);}

        if(!user.state){ return customErrorResponse(res,"User is currently not active",400);}

        const validPassword=bcryptjs.compareSync(password,user.password);
        if(!validPassword){ return customErrorResponse(res,"Invalid password",400);}

        await loginUserResponse(res,user);

    } catch (error) {
        console.log(error)
        errorResponse(res,"Contact database administrator",error,500);
    }
}

module.exports=login;