const {OAuth2Client}=require('google-auth-library');

const bcryptjs=require('bcryptjs');
const jwt=require('jsonwebtoken');
const User=require('../models/user');

const client = new OAuth2Client( process.env.GOOGLE_CLIENT_ID );

const parseSort=(sort,order)=>{
    if(order=='desc'){
        sort="-"+sort;
    }
    return sort;
}

const encryptPassword=password=>{
    const salt=bcryptjs.genSaltSync();
    return bcryptjs.hashSync(password,salt);
}

const generateJWT=(uid, key=process.env.SECRET_KEY, expirationDate=process.env.EXPIRATION_DATE)=>{
    return new Promise((resolve,reject)=>{
        const payload={uid};
        jwt.sign( payload, key,{
            expiresIn: expirationDate
        },(err,token) =>{
            if(err){            
                reject("Couldn't generate token");
            }
            else{
                resolve(token);
            }
        });
    });
}

const checkJWT = async(token) =>{

    if(!token){ return null; }
    if(!token.startsWith("Bearer ",0)){ return null; }
    token = token.substring(7,token.length);
    

    try{

        const {uid} = jwt.verify(token, process.env.SECRET_KEY);
        const  user = await User.findOne({
            _id: uid,
            state: true,
            verified: true
        }).exec();

        if(!user){ return null; }
        return user;
    }
    catch(error){
        console.log(error);
        return null;
    }

}

const googleVerify=async(idToken)=>{

    const ticket = await client.verifyIdToken({
        idToken,
        audience: process.env.GOOGLE_CLIENT_ID
    });
    const {
        name,
        email,
        picture: img
    }=ticket.getPayload();

    return {name,email,img};
}

module.exports={
    parseSort,
    encryptPassword,
    generateJWT,
    checkJWT,
    googleVerify
};