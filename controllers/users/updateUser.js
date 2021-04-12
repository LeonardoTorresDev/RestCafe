const {customResponse, errorResponse}=require('../../helpers/responses');
const {encryptPassword}=require('../../helpers/helpers');

const User=require('../../models/user');

const updateUser=async (req,res)=>{

    const {id}=req.params;
    const {_id,password,google,...user}=req.body;

    try{
        if(password){ 
            user.password=encryptPassword(password);
        }
        await User.findByIdAndUpdate(id,user,{new: true});
        customResponse(res,"User updated successfully",200);
    }
    catch(error){
        return errorResponse(res,"User update failed",error,500);
    }
}

module.exports=updateUser;