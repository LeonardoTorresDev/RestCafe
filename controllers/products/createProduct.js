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
        //use $addToSet to add to products array on category by using just a query
        await Category.findByIdAndUpdate(category,{$addToSet:{products: productDB._id}}).exec();
        res.send(productDB);
    }
    catch(error){
        await session.abortTransaction();
        errorResponse(res,"Contact database administrator",error,500);
    }
    finally{
        session.endSession();
    }
}

module.exports=createProduct;