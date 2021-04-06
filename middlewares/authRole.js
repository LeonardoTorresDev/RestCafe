const {customErrorResponse}=require('../helpers/responses');

const authRole=(...roles)=>{   
    return (req,res,next)=>{
        if(!req.user){
            return customErrorResponse(res,"No token sent",500);
        }
        if(!roles.includes(req.user.role)){
            return customErrorResponse(
                res,
                `Required an user with one of these roles ${roles}`,
                401
        );}
        next();
    }
}

module.exports={
    authRole
};