const {generateJWT,sendCookie}=require('./helpers')

const errorResponse=(res,msg,error,code)=>{
    return res.status(code).json({
        ok: false,
        msg,
        error
    })
}

const customResponse=(res,msg)=>{
    return res.json({
        ok: true,
        msg
    })
}

const loginUserResponse=async(res,user)=>{
    const token=await generateJWT(user.id);
    sendCookie(res,token);
    return res.json({
        ok: true,
        msg: `User logged in succesfully`,
        user,
        token
    });
}

const customUserResponse=(res,msg,user)=>{
    return res.json({
        ok: true,
        msg,
        user
    });
};

const customErrorResponse=(res,msg,code)=>{
    return res.status(code).json({
        ok: false,
        msg
    })
}

module.exports={
    errorResponse,
    customResponse,
    customUserResponse,
    customErrorResponse,
    loginUserResponse
}