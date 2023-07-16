//1.
const express  = require('express');
const authMidlleware = require("../middlewares/authMidlleware");
const { createInventoryController, getInventoryController } = require('../controllers/inventoryController');
const router = express.Router();


// Routes
//add inventory || post
router.post('/create-inventory',authMidlleware,    createInventoryController)

// Get all blood records
router.get('/get-inventory',authMidlleware, getInventoryController  )









//last.
module.exports = router;