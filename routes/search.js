const {Router}=require('express');
const {check} = require('express-validator');

const search=require('../controllers/search/search');
const {fieldValidation}=require('../middlewares');

const router=Router();
const collectionAllowedValues=["users","categories","products"];

router.get('/',[
    check('collection',"has to be in "+collectionAllowedValues.join(', ')).isIn(collectionAllowedValues),
    check('query','query is required').not().isEmpty().trim().escape(),
    fieldValidation
],search);

module.exports=router;
