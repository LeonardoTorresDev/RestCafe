const {Router}=require('express');
const {check}=require('express-validator');

const login=require('../controllers/auth/login');
const loginGoogle=require('../controllers/auth/loginGoogle');

const {fieldValidation}=require('../middlewares/fieldValidation');

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

module.exports=router;