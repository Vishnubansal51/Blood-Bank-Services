const express = require("express");
const { registerController } = require("../controllers/authController");

const router = express.Router();

//1. routes
router.post("/register", registerController);

// last
module.exports = router;
