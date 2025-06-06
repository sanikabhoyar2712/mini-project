const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require('path');

// Try to load .env from parent directory if not found in current
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

// Debug: Check if environment variables are loaded
console.log("Environment variables loaded:", {
    MONGO_URI: process.env.MONGO_URI ? "Present" : "Missing",
    NODE_ENV: process.env.NODE_ENV
});

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
    res.send("🚀 Server is running!");
});

// Connect to MongoDB with options
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log("✅ MongoDB connected successfully");
    app.listen(5000, () => {
        console.log("🚀 Server running on http://localhost:5000");
    });
})
.catch((err) => {
    console.log("❌ MongoDB connection error:", err);
});