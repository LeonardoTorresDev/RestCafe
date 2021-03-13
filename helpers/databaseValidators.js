const Role=require('../models/role');
const User=require('../models/user');

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
    const checkId=await User.findById(id)
    if(!checkId){
        throw new Error(`${id} doesn't exist on database`);
    }
}

module.exports={
    validRole,
    uniqueEmail,
    idExists
}