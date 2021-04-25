const {Router}=require('express');
//const {check} = require('express-validator');

const uploadFile=require('../controllers/uploads/uploadFile');

const {
    authToken,
    fileValidation
}=require('../middlewares')

const router=Router();


router.post('/',[
    authToken,
    fileValidation
],uploadFile);

module.exports=router;