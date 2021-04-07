const {customUserResponse}=require('../../helpers/responses');

const User=require('../../models/user');

const deleteUser=async(req,res)=>{
    const {id}=req.params;
    const deletedUser=await User.findByIdAndUpdate(id,{state: false});
    customUserResponse(res,"User deleted successfully",deletedUser);
};

module.exports=deleteUser;
