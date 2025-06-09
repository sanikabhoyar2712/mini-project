const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require('path');
const authRoutes = require('./routes/authRoutes');
const todoRoutes = require('./routes/todoRoutes');

// Load environment variables
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

// Debug: Check if environment variables are loaded
console.log("Environment variables loaded:", {
    MONGO_URI: process.env.MONGO_URI ? "Present" : "Missing",
    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env.PORT
});

const app = express();

// CORS configuration
app.use(cors({
    origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
    credentials: true
}));

// Middleware
app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
});

// Add routes
app.use('/api/auth', authRoutes);
app.use('/api/todos', todoRoutes);

// Test route
app.get("/", (req, res) => {
    console.log("Test route accessed");
    res.send("🚀 Server is running!");
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error("Server error:", {
        message: err.message,
        stack: err.stack,
        name: err.name
    });
    res.status(500).json({ 
        message: 'Internal server error',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

// Connect to MongoDB with options
const connectDB = async () => {
    try {
        if (!process.env.MONGO_URI) {
            throw new Error('MONGO_URI is not defined in environment variables');
        }

        console.log("Attempting to connect to MongoDB...");
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("✅ MongoDB connected successfully");
    } catch (err) {
        console.error("❌ MongoDB connection error:", {
            message: err.message,
            stack: err.stack,
            name: err.name
        });
        process.exit(1); // Exit if we can't connect to database
    }
};

// Start server AFTER DB connection
const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        await connectDB();
        const server = app.listen(PORT, () => {
            console.log(`🚀 Server running on http://localhost:${PORT}`);
        });

        // Handle process termination
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

        // Handle uncaught exceptions
        process.on('uncaughtException', (err) => {
            console.error('Uncaught Exception:', {
                message: err.message,
                stack: err.stack,
                name: err.name
            });
            process.exit(1);
        });

        // Handle unhandled promise rejections
        process.on('unhandledRejection', (reason, promise) => {
            console.error('Unhandled Rejection at:', promise, 'reason:', reason);
            process.exit(1);
        });

        // Handle server listen errors like EADDRINUSE
        server.on('error', (err) => {
            console.error("Failed to start server:", {
                message: err.message,
                stack: err.stack,
                name: err.name
            });
            if (err.code === 'EADDRINUSE') {
                console.log(`Port ${PORT} is already in use. Please try a different port or close the application using port ${PORT}`);
            }
            process.exit(1);
        });

    } catch (err) {
        console.error("Failed to start server:", err);
        process.exit(1);
    }
};

startServer();
