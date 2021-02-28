const {Router}=require('express');

const getUsers=require('../controllers/users/getUsers');
const createUsers = require('../controllers/users/createUsers');
const updateUsers = require('../controllers/users/updateUsers');

const router=Router();

router.get('/',getUsers);

router.post('/',createUsers);

router.put('/:id',updateUsers);

router.delete('/');

router.patch('/');

module.exports=router;