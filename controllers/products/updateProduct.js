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
        const updatedProduct=await Product.findByIdAndUpdate(id,data);

        if(data.category){
            //delete product from original category products array
            await Category.findByIdAndUpdate(
                updatedProduct.category,
                {$pull: {products: updatedProduct._id}}
            );
            //add product to destination category products array
            await Category.findByIdAndUpdate(
               data.category,
               {$addToSet: {products: updatedProduct._id}}
            );
        }

        customResponse(res,"Product updated successfully",200);
    }
    catch(error){
        await session.abortTransaction();
        errorResponse(res,"Contact database administrator",error,500);
    }
    finally{
        await session.endSession();
    }
}

module.exports=updateProduct;