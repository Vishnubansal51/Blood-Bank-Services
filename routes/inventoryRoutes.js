//1.
const express = require("express");
const authMidlleware = require("../middlewares/authMidlleware");
const {
  createInventoryController,
  getInventoryController,
  getDonarsController,
  getHospitalsController,
  getOrgnaisationController,
  getOrgnaisationHospitalController,
  getInventoryHospitalController,
  getRecentInventoryController,
} = require("../controllers/inventoryController");
const router = express.Router();

// Routes
//add inventory || post
router.post("/create-inventory", authMidlleware, createInventoryController);

// Get all blood records
router.get("/get-inventory", authMidlleware, getInventoryController);

//get recent blood records
router.get(
  "/get-recent-inventory",
  authMidlleware,
  getRecentInventoryController
);

// Get hospital blood records
router.post(
  "/get-inventory-hsp",
  authMidlleware,
  getInventoryHospitalController
);

// get donar records

router.get("/get-donars", authMidlleware, getDonarsController);

// get hospital records
router.get("/get-hospitals", authMidlleware, getHospitalsController);

// get orgainisation records for donar
router.get("/get-organisation", authMidlleware, getOrgnaisationController);

// get orgainisation records for hospital
router.get(
  "/get-organisation-hsp",
  authMidlleware,
  getOrgnaisationHospitalController
);

//last.
module.exports = router;
