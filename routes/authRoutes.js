const express = require("express");
const { registerController, loginController, currentUserController } = require("../controllers/authController");
const authMidlleware = require("../middlewares/authMidlleware");

const router = express.Router();

//1. routes
//1. register || post
router.post("/register", registerController);

// 2. login || post
router.post("/login", loginController );

//3. get current user || get
router.get('/current-user', authMidlleware,currentUserController);

// last
module.exports = router;
