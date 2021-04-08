const {Router}=require('express');
const {check}=require('express-validator');

const {authToken}=require('../middlewares/authToken');
const {fieldValidation}=require('../middlewares/fieldValidation');

const router=Router();

router.get('/',(req,res)=>{
    res.json({
        "msg": "HOLA CATEGORIA"
    })
})

module.exports=router;