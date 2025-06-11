const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require('path');
const authRoutes = require('./routes/authRoutes');
const contactRoutes = require('./routes/contactRoutes');  // Import the contact routes

require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

console.log("Environment variables loaded:", {
    MONGO_URI: process.env.MONGO_URI ? "Present" : "Missing",
    NODE_ENV: process.env.NODE_ENV
});

const app = express();

// ✅ ✅ CORS configuration — Updated origin
app.use(cors({
    origin: ['http://localhost:3000', 'http://127.0.0.1:3000', 'http://localhost:3001'],
    credentials: true
}));

// Middleware
app.use(express.json());

// Add routes
app.use('/api/auth', authRoutes);
app.use('/api', contactRoutes);  // Use contact routes

// Test route
app.get("/", (req, res) => {
    console.log("Test route accessed");
    res.send("🚀 Server is running!");
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error("Server error:", err);
    res.status(500).send("Something broke!");
});

// MongoDB Connection
const connectDB = async () => {
    try {
        console.log("Attempting to connect to MongoDB...");
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("✅ MongoDB connected successfully");
    } catch (err) {
        console.error("❌ MongoDB connection error:", err);
        console.log("Server will continue to run without database connection");
    }
};

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
}).on('error', (err) => {
    console.error("Failed to start server:", err);
    if (err.code === 'EADDRINUSE') {
        console.log("Port 5000 is already in use.");
    }
});

connectDB();

process.on('SIGTERM', () => {
    console.log('SIGTERM signal received: closing HTTP server');
    server.close(() => {
        console.log('HTTP server closed');
        mongoose.connection.close(false, () => {
            console.log('MongoDB connection closed');
            process.exit(0);
        });
    });
});
