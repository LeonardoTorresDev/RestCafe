const {Router}=require('express');
const {check}=require('express-validator');

const getCategory=require('../controllers/categories/getCategory');
const getCategories=require('../controllers/categories/getCategories');
const createCategory=require('../controllers/categories/createCategory');
const updateCategory=require('../controllers/categories/updateCategory');
const deleteCategory=require('../controllers/categories/deleteCategory');

const {
    authToken,
    fieldValidation,
    authRole
}=require('../middlewares');

const {uniqueCategoryName,idCategoryExists}=require('../helpers/databaseValidators');

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

router.get('/:id',[
    check('id','id is not a valid mongoID').isMongoId(),
    check('id').custom(idCategoryExists),
    fieldValidation
],getCategory);

router.post('/',[
    authToken,
    check('name','name has to be a string').not().isEmpty(),
    check('name').custom(uniqueCategoryName),
    fieldValidation
],createCategory);

router.put('/:id',[
    authToken,
    check('id','id is not a valid mongoID').isMongoId(),
    check('id').custom(idCategoryExists),
    check('name').optional().custom(uniqueCategoryName),
    check('name','Invalid name').optional().not().isEmpty().toUpperCase().trim().escape(),
    check('state','State has to be a boolean value').optional().isBoolean(),
    fieldValidation
],updateCategory);

router.delete('/:id',[
    authToken,
    authRole('ADMIN_ROLE'),
    check('id','id is not a valid mongoID').isMongoId(),
    check('id').custom(idCategoryExists),
    fieldValidation
],deleteCategory);

module.exports=router;