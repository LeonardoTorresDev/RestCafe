const {Router}=require('express');
const {check}=require('express-validator');

const login=require('../controllers/auth/login');
const loginGoogle=require('../controllers/auth/loginGoogle');
const renovateToken=require('../controllers/auth/renovateToken');

const {fieldValidation, authToken}=require('../middlewares');

const router=Router();

router.post('/login',[
    check('email', 'Email is obligatory').isEmail(),
    check('password','Password is obligatory').not().isEmpty(),
    fieldValidation
],
login);

router.post('/google',[
    check('idToken','idToken is required').not().isEmpty(),
    fieldValidation
],loginGoogle);

router.get('/', [
    authToken
], renovateToken);

module.exports=router;