const express=require('express');
const router=express.Router();

const users=require('./users');
const auth=require('./auth');
const categories=require('./categories');
const products=require('./products');

router.use('/users',users);
router.use('/auth',auth);
router.use('/categories',categories);
router.use('/products',products);

module.exports=router;