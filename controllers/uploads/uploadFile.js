
const uploadFile=(req,res)=>{
    console.log(req.files.file)
    res.json({
        msg: "Hola mundo"
    });
}

module.exports=uploadFile;