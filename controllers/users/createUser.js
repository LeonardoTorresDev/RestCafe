const {loginUserResponse,customUserResponse,errorResponse}=require('../../helpers/responses');
const {
    encryptPassword,
    generateJWT,
    sendCookie
}=require('../../helpers/helpers');

const User=require('../../models/user');

const createUser= async (req,res)=>{
    
    const {name,email,password,role}=req.body;
    const user=new User({
        name, email, role
    });

    try{
        user.password=encryptPassword(password);
        const userDB= await user.save();

        if(req.query.login){
            return loginUserResponse(res,user)
        }
        
        customUserResponse(res,"User created successfully",userDB);
    }
    catch(error){
        console.log(error)
        return errorResponse(res,"User creation failed: contact administrator",error,500);
    }
}

module.exports=createUser;