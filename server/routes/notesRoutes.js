const express = require("express");
const router = express.Router();

// POST /api/contact
router.post("/", (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ message: "All fields are required." });
    }

    // Here you can handle sending email, saving to DB, etc.
    console.log("Contact message received:", { name, email, message });

    res.status(200).json({ message: "✅ Message received successfully!" });
});

module.exports = router;