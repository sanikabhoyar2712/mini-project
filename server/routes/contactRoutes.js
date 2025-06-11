const express = require("express");
const router = express.Router();
const { submitContactForm } = require("../controllers/contactController");

// ✅ Correct route path that matches frontend: /api/contact
router.post("/contact", submitContactForm);

module.exports = router;
