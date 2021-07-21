const {check} = require('express-validator');
const {Router} = require('express');

const getUsers = require('../controllers/users/getUsers');
const createUser = require('../controllers/users/createUser');
const verifyUser = require('../controllers/users/verifyUser');
const updateUser = require('../controllers/users/updateUser');
const deleteUser = require('../controllers/users/deleteUser');

const {
    fieldValidation,
    authRole,
    authToken
} = require('../middlewares');

const {uniqueEmail,validRole,idExists} = require('../helpers/databaseValidators');

const router = Router();

const sortAllowedValues=["_id","name","email","role"];
const orderAllowedValues=["asc","desc"];

router.get('/',[
    authToken,
    check('from','from has to be a number').optional().isNumeric(),
    check('limit','limit has to be a number').optional().isNumeric(),
    check('sort',"has to be in "+sortAllowedValues.join(', ')).optional().isIn(sortAllowedValues),
    check('order',"has to be in "+orderAllowedValues.join(', ')).optional().isIn(orderAllowedValues),
    fieldValidation
],getUsers);

router.post('/',[
    check('name','Invalid name').not().isEmpty().trim().escape(),
    check('email','Invalid email').isEmail().escape(),
    check('password',
    'Password has to contain one digit, one lower, one upper and has to be eight characters long')
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/),
    check('role').custom(validRole),
    check('email').custom(uniqueEmail),
    fieldValidation
],createUser);

router.put('/verify',verifyUser);

router.put('/:id',[
    authToken,
    authRole("ADMIN_ROLE"),
    check('id',"It's not a valid MongoID").isMongoId(),
    check('id').custom(idExists),
    check('name','Invalid name').optional().not().isEmpty().trim().escape(),
    check('email','Invalid email').optional().isEmail().normalizeEmail(),
    check('password',
    'Password has to contain one digit, one lower case, one upper case and has to be eight characters long')
    .optional().matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/),
    check('role').optional().custom(validRole),
    check('state','State has to be a boolean value').optional().isBoolean(),
    fieldValidation
],updateUser);

router.delete('/:id',[
    authToken,
    authRole("ADMIN_ROLE"),
    check('id',"It's not a valid MongoID").isMongoId(),
    check('id').custom(idExists),
    fieldValidation
],deleteUser);

module.exports=router;