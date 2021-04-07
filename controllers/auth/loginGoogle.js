const {customErrorResponse,loginUserResponse}=require('../../helpers/responses');
const {googleVerify}=require('../../helpers/helpers');

const User=require('../../models/user');

const googleLogin=async(req,res)=>{

    const {idToken}=req.body

    try{
        const {name,email,img}=await googleVerify(idToken);      
        let user=await User.findOne({email})

        if(!user){
            user=new User({
                name,
                email,
                img,
                google: true,
                password: 'google_password'
            })
            await user.save();
        }

        if(!user.state){
            return customErrorResponse(res,"User currently blocked, contact administrator",401);
        }

        await loginUserResponse(res,user);
    }
    catch(error){
        console.log(error)
        return customErrorResponse(res,"Invalid google token",400)
    }
}

module.exports=googleLogin;