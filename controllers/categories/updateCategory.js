const {errorResponse,customResponse}=require('../../helpers/responses');
const Category=require('../../models/category');

const updateCategory=async(req,res)=>{
    const {user, ...data } = req.body;
    data.user = req.user._id;
    try{       
        const {id}=req.params;
        await Category.findByIdAndUpdate(id,data,{new: true}).exec();
        customResponse(res,"Category updated successfully",200);
    }
    catch(error){
        console.log(error);
        errorResponse(res,"Contact database administrator",error,500);
    }
}

module.exports=updateCategory;