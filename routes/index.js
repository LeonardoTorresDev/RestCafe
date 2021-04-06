const express=require('express');
const router=express.Router();

const users=require('./user');
const auth=require('./auth')

router.use('/users',users);
router.use('/auth',auth);

module.exports=router;