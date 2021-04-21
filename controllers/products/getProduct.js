const Product=require('../../models/product');

const getProduct=async(req,res)=>{
    const {id}=req.params
    const product=await Product.findById(id)
                                    .populate('user','name')
                                    .populate('category','name')
                                    .exec();
    res.send(product);
}

module.exports=getProduct;