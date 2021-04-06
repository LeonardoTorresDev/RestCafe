const {customResponseUser,customErrorResponse}=require('../../helpers/responses');
const {encryptPassword}=require('../../helpers/helpers');

const User=require('../../models/user');

const updateUser=async (req,res)=>{

    const {id}=req.params;
    const {_id,password,google,...user}=req.body;

    if(password){ 
        user.password=encryptPassword(password);
    }
  
    const updatedUser=await User.findByIdAndUpdate(id,user,{new: true})
    .catch(e=>console.log(e));

    if(!updatedUser){
        return customErrorResponse(res,"User update failed",500);  
    }

    customResponseUser(res,"User updated successfully",updatedUser);
}

module.exports=updateUser;