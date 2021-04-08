const { customResponse, errorResponse } = require('../../helpers/responses');

const Category=require('../../models/category');

const createCategory=async(req,res)=>{
    const name=req.body.name.toUpperCase().trim();
    try{
        const category=new Category({
            name,
            user: req.user._id
        });
        await category.save();
        customResponse(res,"Category created succesfully",201);
    }
    catch(error){
        console.log(error);
        errorResponse(res,"Contact database administrator",error,500);
    }
}

module.exports=createCategory;