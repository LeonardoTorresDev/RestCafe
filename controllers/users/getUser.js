const getUser=(req,res)=>{
    res.json({
        ok: true,
        msg: "Currently logged user",
        user: req.user
    })
}

module.exports=getUser;