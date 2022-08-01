const express=require('express');
const router=express.Router();
const commentsController=require('../controllers/comments_controller');
const passport=require('passport');
router.get('/destroy', passport.checkAuth, commentsController.dest);
router.get('/destroy/:id', passport.checkAuthentication, commentsController.destroy);
router.post('/create', passport.checkAuthentication,commentsController.create);
module.exports=router;