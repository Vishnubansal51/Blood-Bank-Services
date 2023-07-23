//1.
const express  = require('express');
const authMidlleware = require("../middlewares/authMidlleware");
const { bloodGroupDetailsController } = require('../controllers/analyticsController');

const router = express.Router();

// Routes
// get blood data
router.get('/bloodGroupData',authMidlleware,    bloodGroupDetailsController)











//last.
module.exports = router;