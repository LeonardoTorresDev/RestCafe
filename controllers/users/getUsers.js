const {customResponseUser}=require('../../helpers/responses');

const User=require('../../models/user');

const getUsers=async (req,res)=>{

    const {limit=5,from=0}=req.query;
    const query={state: true};

    const [total,users]=await Promise.all([
        User.countDocuments(query),
        User.find(query)
        .skip(Number(from))
        .limit(Number(limit))
    ]);

    const msg=`${total} documents on database`;
    customResponseUser(res,msg,users);
}

module.exports=getUsers;