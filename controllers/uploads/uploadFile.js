const { v4: uuidv4 } = require('uuid');

const uploadFile=(req,res)=>{
    console.log(req.files.file)
    const fileName=uuidv4()+'.'+req.fileExtension
    res.json({
        msg: fileName
    });
}

module.exports=uploadFile;