const {Router}=require('express');
const {check}=require('express-validator');

const getCategories=require('../controllers/categories/getCategories');
const createCategory=require('../controllers/categories/createCategory');

const {
    authToken,
    fieldValidation
}=require('../middlewares');

const {uniqueCategoryName}=require('../helpers/databaseValidators');

const router=Router();

const sortAllowedValues=["_id","name"];
const orderAllowedValues=["asc","desc"];

router.get('/',[
    check('from','from has to be a number').optional().isNumeric(),
    check('limit','limit has to be a number').optional().isNumeric(),
    check('sort',"has to be in "+sortAllowedValues.join(', ')).optional().isIn(sortAllowedValues),
    check('order',"has to be in "+orderAllowedValues.join(', ')).optional().isIn(orderAllowedValues),
    fieldValidation
],getCategories);

router.post('/',[
    authToken,
    check('name','name has to be a string').not().isEmpty(),
    check('name').custom(uniqueCategoryName),
    fieldValidation
],createCategory);

module.exports=router;