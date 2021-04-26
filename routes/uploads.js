const {Router}=require('express');
const {check} = require('express-validator');

const uploadController=require('../controllers/uploads/uploadController');

const {
    authToken,
    fileExtensionValidator,
    uploadFileValidator,
    fieldValidation
}=require('../middlewares')

const router=Router();
const collectionAllowedValues=["users","products"];

router.put('/:collection/:id',[
    authToken,
    uploadFileValidator,
    fileExtensionValidator,
    check('collection',"has to be in "+collectionAllowedValues.join(', ')).isIn(collectionAllowedValues),
    check('id','has to be a valid mongoID').isMongoId(),
    fieldValidation
],uploadController);

router.get('/:collection/:id',[
    check('collection',"has to be in "+collectionAllowedValues.join(', ')).isIn(collectionAllowedValues),
    check('id','has to be a valid mongoID').isMongoId(),
    fieldValidation
],uploadController);

module.exports=router;