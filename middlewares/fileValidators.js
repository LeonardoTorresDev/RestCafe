const {customErrorResponse}=require('../helpers/responses');

const validExtensions=['jpg','png','jpeg','gif'];

const uploadFileValidator=(req,res,next )=>{
    if (!req.files||Object.keys(req.files).length===0||!req.files.file) {
        return customErrorResponse(res,"No files on request",400);
    }
    next();
}

const fileExtensionValidator=(req,res,next)=>{
    const {file}=req.files;
    const fileName=file.name.split('.');
    const extension=fileName[fileName.length-1];
    if(!validExtensions.includes(extension)){
        return customErrorResponse(
            res,`Invalid ${extension} extension. Allowed extensions: ${validExtensions.join(', ')}`,400
        );
    }
    next();
}

module.exports={
    uploadFileValidator,
    fileExtensionValidator
};