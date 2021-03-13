const express=require('express');
const router=express.Router();

const users=require('../routes/user');

router.use('/users',users);

module.exports=router;