const updateUsers=(req,res)=>{
    const {name="por defecto"}=req.query;
    res.json({
        msg: "PUT",
        name
    });
};

module.exports=updateUsers;