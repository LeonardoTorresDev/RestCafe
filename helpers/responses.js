const errorResponse=(res,msg,error,code)=>{
    return res.status(code).json({
        ok: false,
        msg,
        error
    });
}

const customResponse=(res,msg,code=200)=>{
    return res.status(code).json({
        ok: true,
        msg
    });
}

const customErrorResponse=(res,msg,code)=>{
    return res.status(code).json({
        ok: false,
        msg
    });
}

module.exports={
    errorResponse,
    customResponse,
    customErrorResponse
};