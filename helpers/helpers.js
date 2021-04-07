const {OAuth2Client}=require('google-auth-library');
const bcryptjs=require('bcryptjs');
const jwt=require('jsonwebtoken');

const client = new OAuth2Client( process.env.GOOGLE_CLIENT_ID );

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
}

const sendCookie=(res,token)=>{
    return res.cookie("RestCookie",token,{
        maxAge: Number(process.env.EXPIRATION_DATE)
    });
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

    return {name,email,img}

}

module.exports={
    encryptPassword,
    generateJWT,
    sendCookie,
    googleVerify
};