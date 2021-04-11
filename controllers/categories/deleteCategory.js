const mongoose=require('mongoose');

const {errorResponse}=require('../../helpers/responses');

const Category=require('../../models/category');
const Product=require('../../models/product');

const deleteCategory=async(req,res)=>{

    const session=await mongoose.startSession();
    session.startTransaction();

    try{

        const {id}=req.params;
        const deletedCategory=await Category.findByIdAndUpdate(id,{state: false},{new: true});
        await Product.updateMany({_id: {$in: deletedCategory.products}},{state: false});
        await session.commitTransaction();
        
        res.send({
            deletedCategory
        });
        
    }
    catch(error){
        await session.abortTransaction();
        errorResponse(res,"Contact database administrator",error,500);
    }
    finally{
        await session.endSession();
    }
};

module.exports=deleteCategory;