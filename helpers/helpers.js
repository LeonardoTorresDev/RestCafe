const bcryptjs=require('bcryptjs');
const jwt=require('jsonwebtoken');

const encryptPassword=password=>{
    const salt=bcryptjs.genSaltSync();
    const encryptedPassword=bcryptjs.hashSync(password,salt);
    return encryptedPassword;
}

const generateJWT=uid=>{
    return new Promise((resolve,reject)=>{
        const payload={uid};
        jwt.sign( payload, process.env.SECRET_KEY,{
            expiresIn: process.env.EXPIRATION_DATE
        },(err,token) =>{
            if(err){
                reject("Couldn't generate token");
            }
            else{
                resolve(token);
            }
        });
    });
};

const sendCookie=(res,token)=>{
    return res.cookie("jwtCookie",token,{
        maxAge: Number(process.env.EXPIRATION_DATE),
        sameSite: 'None'
    });
};

module.exports={
    encryptPassword,
    generateJWT,
    sendCookie
};