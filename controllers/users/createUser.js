const {customResponseUser,customErrorResponse}=require('../../helpers/responses');
const {encryptPassword}=require('../../helpers/helpers');

const User=require('../../models/user');

const createUser= async (req,res)=>{
    
    const {name,email,password,role}=req.body;
    const user=new User({
        name, email, role
    });

    user.password=encryptPassword(password);
    const userDB= await user.save().catch(e=>console.log(e)); 

    if(!userDB){ return customErrorResponse(res,"User creation failed");}

    const token=await generateJWT(user.id);
    sendCookie(res,token);

    customResponseUser(res,"User created successfully",userDB);
}

module.exports=createUser;