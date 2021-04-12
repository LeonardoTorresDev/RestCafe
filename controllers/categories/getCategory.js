const { customCategoryResponse } = require('../../helpers/responses');
const Category=require('../../models/category');

const getCategory=async(req,res)=>{
    const {id}=req.params;
    const category=await Category.findById(id)
                                    .populate('user','name');
    res.send(category);
}

module.exports=getCategory;