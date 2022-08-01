const express=require('express');
const router=express.Router();
const userController=require('../controllers/users_controller');
const passport=require('passport');
router.get('/', userController.userHome);
router.get('/profile/:id', passport.checkAuthentication, userController.userProfile);

router.post('/update/:id', passport.checkAuthentication, userController.update);
router.get('/sign-up', userController.signup);
router.get('/sign-in', userController.signin);
router.post('/create', userController.create); 
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect: '/users/sign-in'}
), userController.createSession);
router.get('/sign-out', userController.destroySession);
module.exports=router;
