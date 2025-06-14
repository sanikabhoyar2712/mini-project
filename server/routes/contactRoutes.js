const express = require("express");
const router = express.Router();
const { submitContactForm } = require("../controllers/contactController");

// ✅ FIXED: match the route prefix from server.js
router.post("/", submitContactForm);

module.exports = router;
