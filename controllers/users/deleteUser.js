const mongoose=require('mongoose');

const {errorResponse,customResponse}=require('../../helpers/responses');

const User=require('../../models/user');
const Category=require('../../models/category');
const Product = require('../../models/product');

const deleteUser=async(req,res)=>{

    const session=await mongoose.startSession();
    session.startTransaction();

    try{

        const {id}=req.params;
        const deletedUser=await User.findByIdAndUpdate(id,{state: false},{new: true}).exec();

        await Category.updateMany({user: deletedUser._id},{state: false}).exec(); 
        await Product.updateMany({user: deletedUser._id},{state: false}).exec();

        await session.commitTransaction();
        customResponse(res, "User deleted succesfully",200);
        
    }
    catch(error){
        await session.abortTransaction();
        errorResponse(res,"Contact database administrator",error,500);
    }
    finally{
        session.endSession();
    }
};

module.exports=deleteUser;
