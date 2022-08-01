const express=require('express');
const router=express.Router();
const postController=require('../controllers/post_controller');
const passport=require('passport');
router.get('/destroy/:id', passport.checkAuthentication, postController.destroy)
router.post('/create', passport.checkAuthentication, postController.create);
module.exports=router;