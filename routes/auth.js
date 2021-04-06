const {Router}=require('express');
const {check}=require('express-validator');

const login=require('../controllers/auth/login');
const logout=require('../controllers/auth/logout');

const {authToken}=require('../middlewares/authToken');
const {fieldValidation}=require('../middlewares/fieldValidation');

const router=Router();

router.post('/login',[
    check('email', 'Email is obligatory').isEmail(),
    check('password','Password is obligatory').not().isEmpty(),
    fieldValidation
],
login);

router.post('/logout',authToken,logout);

module.exports=router;