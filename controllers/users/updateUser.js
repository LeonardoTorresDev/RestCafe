const {customResponse, errorResponse}=require('../../helpers/responses');
const {encryptPassword}=require('../../helpers/helpers');

const User=require('../../models/user');
const Category=require('../../models/category');
const Product=require('../../models/product');

const updateUser=async (req,res)=>{

    const {id}=req.params;
    const {_id,password,verified,google,...user}=req.body;

    try{
        if(password){ 
            user.password=encryptPassword(password);
        }
        const updatedUser=await User.findByIdAndUpdate(id,user,{new: true}).exec();
        //updatedUser: user state has to be true to reincorporate their products
        //user.state: evita que se reincorporen productos si el usuario no cambia su estado a true
        if(updatedUser.state && user.state){
            await Category.updateMany({user: updatedUser._id}, {state: true}).exec();
            await Product.updateMany({user: updatedUser._id}, {state: true}).exec();
        }
        customResponse(res,"User updated successfully",200);
    }
    catch(error){
        console.log(error)
        return errorResponse(res,"User update failed",error,500);
    }
}

module.exports=updateUser;