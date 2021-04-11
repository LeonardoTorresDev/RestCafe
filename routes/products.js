const {check} = require('express-validator');
const {Router} = require('express');

const createProduct=require('../controllers/products/createProduct');
const getProducts=require('../controllers/products/getProducts');

const {
    fieldValidation,
    authToken
} = require('../middlewares');

const { idCategoryExists } = require('../helpers/databaseValidators');

const router=Router();
const sortAllowedValues=["_id","name","stock","unitPrice"];
const orderAllowedValues=["asc","desc"];

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

module.exports=router;