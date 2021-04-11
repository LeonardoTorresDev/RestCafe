const {check} = require('express-validator');
const {Router} = require('express');

const createProduct=require('../controllers/products/createProduct');
const getProduct=require('../controllers/products/getProduct');
const getProducts=require('../controllers/products/getProducts');
const updateProduct=require('../controllers/products/updateProduct');
const deleteProduct=require('../controllers/products/deleteProducts');

const {
    fieldValidation,
    authToken,
    authRole
} = require('../middlewares');

const { idCategoryExists, idProductExists } = require('../helpers/databaseValidators');

const router=Router();
const sortAllowedValues=["_id","name","stock","unitPrice"];
const orderAllowedValues=["asc","desc"];

router.get('/:id',[
    check('id','id is not a valid mongoID').isMongoId(),
    check('id').custom(idProductExists),
    fieldValidation
],getProduct);

router.get("/",[
    check('from','from has to be a number').optional().isNumeric(),
    check('limit','limit has to be a number').optional().isNumeric(),
    check('sort',"has to be in "+sortAllowedValues.join(', ')).optional().isIn(sortAllowedValues),
    check('order',"has to be in "+orderAllowedValues.join(', ')).optional().isIn(orderAllowedValues),
    fieldValidation
],getProducts);

router.post("/:category",[
    authToken,
    check('category','required a valid mongoID').isMongoId(),
    check('category').custom(idCategoryExists),
    check('name','name is required').not().isEmpty().toUpperCase().trim(),
    check('unitPrice','unitPrice has to be a number').optional().isNumeric(),
    check('stock','stock has to be a number').optional().isNumeric(),
    check('description').optional().not().isEmpty().trim(),
    fieldValidation
],createProduct);

router.put("/:id",[
    authToken,
    check('id','required a valid mongoID').isMongoId(),
    check('id').custom(idProductExists),
    check('category').optional().custom(idCategoryExists),
    check('name','name is required').optional().not().isEmpty().toUpperCase().trim(),
    check('unitPrice','unitPrice has to be a number').optional().isNumeric(),
    check('stock','stock has to be a number').optional().isNumeric(),
    check('description').optional().not().isEmpty().trim(),
    check('state','State has to be a boolean value').optional().isBoolean(),
    fieldValidation
],updateProduct);

router.delete("/:id",[
    authToken,
    authRole('ADMIN_ROLE'),
    check('id','required a valid mongoID').isMongoId(),
    check('id').custom(idProductExists),
    fieldValidation
],deleteProduct)

module.exports=router;