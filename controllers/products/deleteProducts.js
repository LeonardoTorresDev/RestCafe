const { customResponse } = require('../../helpers/responses');
const Product=require('../../models/product');

const deleteProduct=async(req,res)=>{
    const {id}=req.params;
    await Product.findByIdAndUpdate(id,{state: false},{new: true}).exec();
    customResponse(res,"Product deleted successfully",200);
}

module.exports=deleteProduct;