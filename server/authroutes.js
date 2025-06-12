const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Register route
router.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const newUser = new User({ name, email, password });
        await newUser.save();
        res.status(201).json({ message: "User registered successfully!" });
    } catch (err) {
        res.status(500).json({ error: "Failed to register user" });
    }
});

module.exports = router;
