const {customResponseUser}=require('../../helpers/responses');
const {encryptPassword}=require('../../helpers/helpers');

const User=require('../../models/user');

const createUsers= async (req,res)=>{
    
    const {name,email,password,role}=req.body;
    const user=new User({
        name, email, role
    });

    user.password=encryptPassword(password);
    const userDB= await user.save().catch(e=>console.log(e)); 

    if(!userDB){ return customErrorResponse(res,"User creation failed");}

    customResponseUser(res,"User created successfully",userDB);
}

module.exports=createUsers;