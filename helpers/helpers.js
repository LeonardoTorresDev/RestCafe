const bcryptjs=require('bcryptjs');

const isEmail = email =>{
    if(/\S+@\S+/.test(email)){
        return email;
    }
    else{
        return false;
    }
} 

const encryptPassword=password=>{
    const salt=bcryptjs.genSaltSync();
    const encryptedPassword=bcryptjs.hashSync(password,salt);
    return encryptedPassword;
}

module.exports={
    isEmail,
    encryptPassword
}