const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// Existing login route
router.post("/auth", authController.authenticate);

module.exports = router;
