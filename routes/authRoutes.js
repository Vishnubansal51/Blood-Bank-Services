const express = require("express");
const { registerController, loginController } = require("../controllers/authController");

const router = express.Router();

//1. routes
//1. register || post
router.post("/register", registerController);

// 2. login || post
router.post("/login", loginController );



// last
module.exports = router;
