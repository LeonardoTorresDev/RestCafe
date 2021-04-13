const {ObjectId}=require('mongoose').Types;
const User=require('../../models/user');

const searchUsers=async(query,res)=>{

    const isMongoId=ObjectId.isValid(query);

    if(isMongoId){
        const user=await User.findById(query);
        //if we don't find user with this id, then send empty array
        return res.json({
            result: (user)?(user):[]
        });
    }
    //i make regexp case not sensitive
    const regex = new RegExp(query,'i');  
    const users = await User.find({
        $or : [{name: regex}, {email: regex}],
        $and : [{state:true, verified: true}]
    });

    res.json({results: users});
}

module.exports=searchUsers;