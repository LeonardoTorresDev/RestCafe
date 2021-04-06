const {check} = require('express-validator');
const {Router} = require('express');

const getUsers = require('../controllers/users/getUsers');
const createUser = require('../controllers/users/createUser');
const updateUser = require('../controllers/users/updateUser');
const deleteUser = require('../controllers/users/deleteUser');

const {
    fieldValidation,
    authRole,
    authToken
} = require('../middlewares')

const {uniqueEmail,validRole,idExists} = require('../helpers/databaseValidators');
const {checkPassword} = require('../helpers/customValidators');

const router = Router();

router.get('/',authToken,getUsers);

router.post('/',[
    check('name','Unvalid name').not().isEmpty(),
    check('email','Unvalid email').isEmail(),
    check('password','Password has to be at least six characters long').isLength({min: 6}),
    check('role').custom(validRole),
    check('email').custom(uniqueEmail),
    fieldValidation
],createUser);

router.put('/:id',[
    authToken,
    authRole("ADMIN_ROLE"),
    check('id',"It's not a valid MongoID").isMongoId(),
    check('id').custom(idExists),
    check('name','Unvalid name').optional().not().isEmpty(),
    check('email','Unvalid email').optional().isEmail(),
    check('password').optional().custom(checkPassword),
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