const customResponseUser=(res,msg,user)=>{
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
    customResponseUser,
    customErrorResponse
}