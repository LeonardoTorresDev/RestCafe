const {
    loginUserResponse,
    customResponse,
    errorResponse
}=require('../../helpers/responses');

const {encryptPassword}=require('../../helpers/helpers');
const {emailVerify}=require('../../helpers/emailVerify');

const User=require('../../models/user');

const createUser= async (req,res)=>{
    
    const {name,email,password,role}=req.body;
    const user=new User({
        name, email, role
    });

    try{
        user.password=encryptPassword(password);
        const userDB= await user.save();
        //crear token y enviar correo
        //responder correo enviado, verifique su cuenta!
        await emailVerify(userDB);
        return customResponse(res,"Check your email to verify your account!",201);
    }
    catch(error){
        console.log(error)
        return errorResponse(res,"User creation failed: contact administrator",error,500);
    }
}

module.exports=createUser;