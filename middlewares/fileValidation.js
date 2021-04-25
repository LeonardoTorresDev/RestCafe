const {customErrorResponse}=require('../helpers/responses');

const validExtensions=['jpg','png','jpeg','gif'];

const fileValidation=(req,res,next)=>{
    const {file}=req.files;
    const fileName=file.name.split('.');
    const extension=fileName[fileName.length-1];
    if(!validExtensions.includes(extension)){
        return customErrorResponse(
            res,
            `Invalid file ${extension} extension. Allowed extensions: ${validExtensions.join(', ')}`
            ,401
        );
    }
    req.fileExtension=extension;
    next();
}

module.exports={fileValidation};