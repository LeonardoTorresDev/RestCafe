const {ObjectId}=require('mongoose').Types;
const Product=require('../../models/product');

const searchProducts=async(query,res)=>{

    const isMongoId=ObjectId.isValid(query);

    if(isMongoId){
        const product=await Product.findById(query)
                            .populate('category','name');
        return res.json({
            result: (product)?(product):[]
        });
    }

    const regex=new RegExp(query,'i');
    const products=await Product.find({
        name: regex, state: true
    }).populate('category','name');

    res.json({results: products});
}

module.exports=searchProducts;