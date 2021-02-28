const createUsers=(req,res)=>{
    let body=req.body;
    res.json({
        msg: "POST",
        body
    });
};

module.exports=createUsers;