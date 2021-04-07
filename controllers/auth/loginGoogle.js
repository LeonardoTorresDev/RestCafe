const {customResponseUser, customErrorResponse}=require('../../helpers/responses');
const {generateJWT,sendCookie,googleVerify}=require('../../helpers/helpers');

const User=require('../../models/user');

const googleLogin=async(req,res)=>{

    const {idToken}=req.body

    try{
        const {name,email,img}=await googleVerify(idToken);      
        let user=await User.findOne({email})

        if(!user){

            const newUser=new User({
                name,
                email,
                img,
                google: true,
                password: 'google_password'
            })
            await newUser.save();

            return loginUserResponse(res,newUser);
        }

        if(!user.state){
            return customErrorResponse(res,"User currently blocked, contact administrator",401);
        }

        loginUserResponse(res,user);
    }
    catch(error){
        customErrorResponse(res,"Invalid google token",400)
    }
}

const loginUserResponse=async(res,user)=>{
    const token=await generateJWT(user.id);
    sendCookie(res,token);
    return customResponseUser(res,"User logged in succesfully",user);
}

module.exports=googleLogin;