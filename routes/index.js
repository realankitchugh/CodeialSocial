const express=require('express');
const router= express.Router();
const homeController=require('../controllers/home_controller');
router.get('/waduup', homeController.home);
console.log("yea routes");
module.exports = router;