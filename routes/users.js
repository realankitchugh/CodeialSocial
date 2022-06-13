//const { application } = require('express');
const express=require('express');
const router=express.Router();
const profileController=require('../controllers/users_controller');
router.get('/', profileController.profile);
router.use('/posts', require('./posts'));
router.use('/profile', require('./profile'));
module.exports=router;