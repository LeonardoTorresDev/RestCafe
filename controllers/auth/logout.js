const {customResponse}=require('../../helpers/responses');

const logout=(req,res)=>{
    const user=req.user;
    res.cookie("RestCookie","",{
        maxAge: 1
    });
    customResponse(res,`User ${user.name} logged out succesfully`);
}

module.exports=logout;