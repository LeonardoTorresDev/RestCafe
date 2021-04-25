const express=require('express');
const router=express.Router();

const users=require('./users');
const auth=require('./auth');
const categories=require('./categories');
const products=require('./products');
const search=require('./search');
const uploads=require('./uploads');

router.use('/users',users);
router.use('/auth',auth);
router.use('/categories',categories);
router.use('/products',products);
router.use('/search',search);
router.use('/uploads',uploads)

module.exports=router;