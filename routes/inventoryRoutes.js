//1.
const express  = require('express');
const authMidlleware = require("../middlewares/authMidlleware");
const { createInventoryController, getInventoryController, getDonarsController, getHospitalsController, getOrgnaisationController,  } = require('../controllers/inventoryController');
const router = express.Router();


// Routes
//add inventory || post
router.post('/create-inventory',authMidlleware,    createInventoryController)

// Get all blood records
router.get('/get-inventory',authMidlleware, getInventoryController  )

// get donar records

router.get('/get-donars',authMidlleware, getDonarsController )

// get hospital records
router.get('/get-hospitals',authMidlleware, getHospitalsController )

// get orgainisation records
router.get('/get-organisation',authMidlleware, getOrgnaisationController )






//last.
module.exports = router;