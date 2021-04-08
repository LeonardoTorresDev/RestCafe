const express=require('express');
const router=express.Router();

const users=require('./users');
const auth=require('./auth')
const categories=require('./categories')

router.use('/',users);
router.use('/auth',auth);
router.use('/categories',categories);

module.exports=router;