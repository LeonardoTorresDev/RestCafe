const {ObjectId}=require('mongoose').Types;
const Category=require('../../models/category');

const searchCategories=async(query,res)=>{

    const isMongoId=ObjectId.isValid(query);

    if(isMongoId){
        const category=await Category.findById(query);
        return res.json({
            result: (category)?(category):[]
        });
    }

    const regex=new RegExp(query,'i');
    const categories=await Category.find({name: regex,state: true});
    res.json({results: categories});
}

module.exports=searchCategories;