const {customErrorResponse, errorResponse}=require('../../helpers/responses');
const {googleVerify,generateJWT,sendCookie}=require('../../helpers/helpers');

const User=require('../../models/user');

const googleLogin=async(req,res)=>{

    const {idToken}=req.body

    try{
        const {name,email,img}=await googleVerify(idToken);      
        let user=await User.findOne({email}).exec();

        //validate if user email is already registered
        if(user.email&&!user.google){
            return customErrorResponse(res,"User already registered",400);
        }

        if(!user){
            user=new User({
                name,
                email,
                img,
                google: true,
                verified: true,
                password: process.env.DEFAULT_GOOGLE_PASSWORD
            });
            await user.save();
        }

        if(!user.state){
            return customErrorResponse(res,"User currently blocked, contact administrator",401);
        }
        const token=await generateJWT(user._id);
        sendCookie(res,token);
        return res.send(user);
    }
    catch(error){
        console.log(error);
        return errorResponse(res,"Invalid google token",error,400);
    }
}

module.exports=googleLogin;