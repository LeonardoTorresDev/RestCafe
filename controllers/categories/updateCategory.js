const {errorResponse}=require('../../helpers/responses');
const Category=require('../../models/category');

const updateCategory=async(req,res)=>{
    const {user, ...data } = req.body;
    data.user = req.user._id;
    if(data.name){
        data.name = data.name.toUpperCase().trim();
    }
    try{
        const {id}=req.params;
        const updatedCategory=await Category.findByIdAndUpdate(id,data,{new: true});
        res.send(updatedCategory);
    }
    catch(error){
        console.log(error);
        errorResponse(res,"Contact database administrator",error,500);
    }
}

module.exports=updateCategory;