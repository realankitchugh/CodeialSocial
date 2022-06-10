//const { application } = require('express');
const express=require('express');
const router=express.Router();
const profileController=require('../controllers/users_controller');
router.get('/profile', profileController.profile);

router.use('/posts', require('./posts'));

module.exports=router;