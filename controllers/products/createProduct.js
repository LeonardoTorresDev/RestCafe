const mongoose=require('mongoose');

const Category=require('../../models/category');
const Product=require('../../models/product');

const {errorResponse}=require('../../helpers/responses');

const createProduct=async(req,res)=>{
    const session=await mongoose.startSession();
    session.startTransaction();
    try{
        const {name,unitPrice,stock,description}=req.body;
        const {category}=req.params
        const product=new Product({
            name,
            unitPrice,
            stock,
            description,
            category,
            user: req.user._id
        });
        const productDB=await product.save();
        await Category.findByIdAndUpdate(category,{'$addToSet':{'products': productDB._id}});
        res.send(productDB);
    }
    catch(error){
        await session.abortTransaction();
        errorResponse(res,"Contact database administrator",error,500);
    }
    finally{
        await session.endSession();
    }
}

module.exports=createProduct;