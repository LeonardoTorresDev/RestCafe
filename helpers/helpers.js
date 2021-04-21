const {OAuth2Client}=require('google-auth-library');
const bcryptjs=require('bcryptjs');
const jwt=require('jsonwebtoken');

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
    parseSort,
    encryptPassword,
    generateJWT,
    sendCookie,
    googleVerify
};