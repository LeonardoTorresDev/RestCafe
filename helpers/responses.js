const {generateJWT,sendCookie}=require('./helpers')

const errorResponse=(res,msg,error,code)=>{
    return res.status(code).json({
        ok: false,
        msg,
        error
    })
}

const customResponse=(res,msg,code=200)=>{
    return res.status(code).json({
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

const customUserResponse=(res,msg,user,code=200)=>{
    return res.status(code).json({
        ok: true,
        msg,
        user
    });
};

const customCategoryResponse=(res,msg,category,code=200)=>{
    return res.status(code).json({
        ok: true,
        msg,
        category
    });
}

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
    customCategoryResponse,
    customErrorResponse,
    loginUserResponse
}