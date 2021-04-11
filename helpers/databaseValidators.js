const Role=require('../models/role');
const User=require('../models/user');
const Category=require('../models/category');
const Product = require('../models/product');

const validRole=async(role)=>{
    const roleExists=await Role.findOne({role});
    if(!roleExists){
        throw new Error(`${role} is not registered on database`);
    }
}

const uniqueEmail=async(email)=>{
    const emailExists=await User.findOne({email});
    if(emailExists){
        throw new Error(`${email} already exists on database`);
    }
}

const idExists=async(id)=>{
    const checkId=await User.findById(id);
    if(!checkId){
        throw new Error(`${id} doesn't exist on database`);
    }
}

const idCategoryExists=async(id)=>{
    const checkId=await Category.findById(id);
    if(!checkId){
        throw new Error(`${id} doesn't exist on database`);
    }
}

const idProductExists=async(id)=>{
    const checkId=await Product.findById(id);
    if(!checkId){
        throw new Error(`${id} doesn't exist on database`);
    }
}

const uniqueCategoryName=async(name)=>{
    name=name.toUpperCase().trim()
    const categoryNameExists=await Category.findOne({name});
    if(categoryNameExists){
        throw new Error(`Category ${name} already exists on database`);
    }
}

module.exports={
    validRole,
    uniqueEmail,
    idExists,
    idCategoryExists,
    idProductExists,
    uniqueCategoryName
}