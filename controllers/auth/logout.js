const {customResponseUser}=require('../../helpers/responses');

const logout=(req,res)=>{
    const user=req.user;
    res.cookie("jwtCookie","",{
        maxAge: 1,
        sameSite: 'None'
    });
    customResponseUser(res,"User logged out succesfully",user);
}

module.exports=logout;