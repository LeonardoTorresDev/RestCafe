const cloudinary=require('cloudinary').v2;
const path=require('path');

cloudinary.config( process.env.CLOUDINARY_URL );

const User=require('../../models/user');
const Product=require('../../models/product');

const {customErrorResponse}=require('../../helpers/responses');

const uploadController=async(req,res)=>{
    
    const {id,collection}=req.params;
    let model;

    switch(collection){
        case 'users':
            model=await User.findById(id).exec();
            break;
        case 'products':
            model=await Product.findById(id).exec();
            break;
        default:
            return customErrorResponse(res,"Invalid collection",400);
    }

    if(!model){return customErrorResponse(res,`No ${collection.slice(0,-1)} with id ${id}`,400);}

    if(req.method==='PUT'){

        if(model.img){
            const splittedUrl=model.img.split('/');
            const [name]=splittedUrl[splittedUrl.length-1].split('.');//get public_id and  cut the extension
            cloudinary.uploader.destroy(`RestCafe/${collection}/${name}`);
        }
    
        const { tempFilePath } = req.files.file //use tempdir to avoid using node fs
        const { secure_url } = await cloudinary.uploader.upload( tempFilePath,{folder:`RestCafe/${collection}`});
        model.img = secure_url;
        await model.save();
        return res.send( model );

    }
    else if(req.method==='GET'){

        if(model.img){
            return res.redirect(model.img);
        }
        const pathNoImgAsset = path.join( __dirname, '../../assets/no-image.jpg');
        res.sendFile(pathNoImgAsset);
        
    }
}

module.exports=uploadController;