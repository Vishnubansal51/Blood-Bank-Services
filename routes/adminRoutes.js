const express = require("express");
const authMidlleware = require("../middlewares/authMidlleware");
const { get_donar_list_controller, get_hospital_list_controller, get_org_list_controller, delete_donar_controller, delete_hospital_controller } = require("../controllers/adminController");
const adminMiddleware = require("../middlewares/adminMiddleware");

const router = express.Router();

// get doanr list
router.get("/donar-list", authMidlleware, adminMiddleware, get_donar_list_controller);
// get hospital list
router.get("/hospital-list", authMidlleware, adminMiddleware, get_hospital_list_controller);
//get  organisation list
router.get("/org-list", authMidlleware, adminMiddleware, get_org_list_controller);

// dlt for deleting donar
router.delete("/delete-donar/:id", authMidlleware, adminMiddleware, delete_donar_controller);

// dlt for deleting hospital
router.delete("/delete-hospital/:id", authMidlleware, adminMiddleware, delete_hospital_controller);


module.exports = router;
