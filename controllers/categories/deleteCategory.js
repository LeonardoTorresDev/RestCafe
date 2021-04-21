const mongoose=require('mongoose');

const {errorResponse,customResponse}=require('../../helpers/responses');

const Category=require('../../models/category');
const Product=require('../../models/product');

const deleteCategory=async(req,res)=>{

    const session=await mongoose.startSession();
    session.startTransaction();

    try{
        const {id}=req.params;
        const deletedCategory=await Category.findByIdAndUpdate(id,{state: false},{new: true}).exec();
        //we use $in to look into a mongoDB array
        await Product.updateMany({_id: {$in: deletedCategory.products}},{state: false}).exec();
        await session.commitTransaction();       
        customResponse(res,"Category deleted successfully",200);    
    }
    catch(error){
        await session.abortTransaction();
        errorResponse(res,"Contact database administrator",error,500);
    }
    finally{
        session.endSession();
    }
};

module.exports=deleteCategory;