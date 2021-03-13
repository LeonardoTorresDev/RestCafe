const {check}=require('express-validator');
const {Router}=require('express');

const getUsers=require('../controllers/users/getUsers');
const createUsers = require('../controllers/users/createUsers');
const updateUsers = require('../controllers/users/updateUsers');
const deleteUsers=require('../controllers/users/deleteUsers');

const {fieldValidation}=require('../middlewares/fieldValidation');
const {uniqueEmail,validRole,idExists}=require('../helpers/databaseValidators');

const router=Router();

router.get('/',getUsers);

router.post('/',[
    check('name','Unvalid name').not().isEmpty(),
    check('email','Unvalid email').isEmail(),
    check('password','Password has to be at least six characters long').isLength({min: 6}),
    check('role').custom(validRole),
    check('email').custom(uniqueEmail),
    fieldValidation
],createUsers);

router.put('/:id',[
    check('id',"It's not a valid MongoID").isMongoId(),
    check('id').custom(idExists),
    check('role').custom(validRole),
    check('state','State has to be a boolean value').isBoolean(),
    check('email').custom(uniqueEmail),
    fieldValidation
],updateUsers);

router.delete('/:id',[
    check('id',"It's not a valid MongoID").isMongoId(),
    check('id').custom(idExists),
    fieldValidation
],deleteUsers);

module.exports=router;