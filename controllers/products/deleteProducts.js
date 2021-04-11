const Product=require('../../models/product');

const deleteProduct=async(req,res)=>{
    const {id}=req.params;
    const deletedProduct=await Product.findByIdAndUpdate(id,{state: false},{new: true});
    res.send(deletedProduct);
}

module.exports=deleteProduct;