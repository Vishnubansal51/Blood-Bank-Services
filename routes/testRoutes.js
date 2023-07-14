const express= require('express');
const { testController } = require('../controllers/testController');

// 1. router object : here we are calling all function of router from express
const router =express.Router();

// 2.routes
router.get('/',testController) ;



//3. export
module.exports = router;