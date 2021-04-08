const { parseSort } = require('../../helpers/helpers');
const User = require('../../models/user');

const getUsers = async (req,res)=>{

    const {
        limit=5,
        from=0,
        sort="_id",
        order='asc'
    }=req.query;
    
    const query={state: true};
    const [total,users]=await Promise.all([
        User.countDocuments(query),
        User.find(query)
        .skip(Number(from))
        .limit(Number(limit))
        .sort(parseSort(sort,order)) 
    ]);

    res.status(200).json({
        ok: true,
        total,
        sent: users.length,
        users
    });
}

module.exports=getUsers;