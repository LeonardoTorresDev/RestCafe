const { customUserResponse } = require('../../helpers/responses');

const getUser=(req,res)=>{
    customUserResponse(res,"Currently logged user",req.user);
}

module.exports=getUser;