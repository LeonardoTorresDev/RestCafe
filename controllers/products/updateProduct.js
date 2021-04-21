const mongoose=require('mongoose');

const Category=require('../../models/category');
const Product=require('../../models/product');

const {errorResponse,customResponse}=require('../../helpers/responses');

const updateProduct=async(req,res)=>{
    const session=await mongoose.startSession();
    session.startTransaction();
    try{

        const {...data}=req.body;
        const {id}=req.params;
        data.user=req.user._id;
        const updatedProduct=await Product.findByIdAndUpdate(id,data).exec();

        if(data.category){
            //delete product from original category products array
            await Category.findByIdAndUpdate(
                updatedProduct.category,
                {$pull: {products: updatedProduct._id}}
            ).exec();
            //add product to destination category products array
            await Category.findByIdAndUpdate(
               data.category,
               {$addToSet: {products: updatedProduct._id}}
            ).exec();
        }

        customResponse(res,"Product updated successfully",200);
    }
    catch(error){
        await session.abortTransaction();
        errorResponse(res,"Contact database administrator",error,500);
    }
    finally{
        session.endSession();
    }
}

module.exports=updateProduct;