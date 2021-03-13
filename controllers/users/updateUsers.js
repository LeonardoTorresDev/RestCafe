const {customResponseUser,customErrorResponse}=require('../../helpers/responses');
const {isEmail,encryptPassword}=require('../../helpers/helpers');

const User=require('../../models/user');

const updateUsers=async (req,res)=>{

    const {id}=req.params;
    const {_id,password,google,email,...user}=req.body;
 
    if(password){ user.password=encryptPassword(password);}
  
    if(email){
        user.email=isEmail(email);
        if(!user.email){ return customErrorResponse(res,"Unvalid email",400);}
    }

    const updatedUser=await User.findByIdAndUpdate(id,user,{new: true})
    .catch(e=>console.log(e));

    if(!updatedUser){
        return customErrorResponse(res,"User update failed");  
    }

    customResponseUser(res,"User updated successfully",updatedUser);
}

module.exports=updateUsers;