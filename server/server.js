const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

// Load environment variables from .env file
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
    res.send("🚀 Server is running!");
});

// Check Mongo URI from .env
console.log("Mongo URI from .env:", process.env.MONGO_URI);

// Connect to MongoDB
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("✅ MongoDB connected");
        app.listen(5000, () => {
            console.log("🚀 Server running on http://localhost:5000");
        });
    })
    .catch((err) => {
        console.error("❌ MongoDB connection error:", err);
    });