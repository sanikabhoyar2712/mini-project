const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require('path');
const authRoutes = require('./routes/authRoutes');
const contactRoutes = require('./routes/contactRoutes');
const todoRoutes = require('./routes/todoRoutes');
const selfCareRoutes = require('./routes/selfCareRoute');
const gratitudeRoutes = require('./routes/gratitudeRoutes');

<<<<<<< HEAD
=======
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

console.log("Environment variables loaded:", {
    MONGO_URI: process.env.MONGO_URI ? "Present" : "Missing",
    NODE_ENV: process.env.NODE_ENV
});

>>>>>>> 36eac5a6743c0c7f9e78246d2dbcd5a9ca07e6a1
const app = express();

// ✅ CORS configuration
app.use(cors({
    origin: ['http://localhost:3000', 'http://127.0.0.1:3000', 'http://localhost:3001', 'http://localhost:3002'],
    credentials: true
}));

// Middleware
app.use(express.json());

<<<<<<< HEAD
// ✅ Import routes
const authRoutes = require("./routes/authRoutes");
const contactRoutes = require("./routes/contactRoutes");
const selfCareRoutes = require("./routes/selfCareRoute"); // Includes diary, mood, meditation, skincare, etc.
=======
// ✅ Routes
app.use('/api/auth', authRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/todos', todoRoutes);
app.use('/api/selfcare', selfCareRoutes);
<<<<<<< HEAD
app.use('/api/gratitude', gratitudeRoutes);
=======
>>>>>>> 36eac5a6743c0c7f9e78246d2dbcd5a9ca07e6a1
>>>>>>> 3103e5a3cc848003f5aa02692fd9f5fe2c920c90

// ✅ API route endpoints
app.use("/api/auth", authRoutes);         // Register / Login
app.use("/api/contact", contactRoutes);   // Contact form
app.use("/api/selfcare", selfCareRoutes); // Self-care features

// ✅ Welcome route
app.get("/", (req, res) => {
    res.send("🎉 Welcome to StudySphere Backend API!");
});

// ✅ Error handling middleware
app.use((err, req, res, next) => {
    console.error("❌ Internal Server Error:", err.stack);
    res.status(500).json({ error: "Something went wrong on the server!" });
});

// ✅ Connect to MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("✅ MongoDB connected successfully");
    } catch (error) {
        console.error("❌ MongoDB connection failed:", error.message);
        process.exit(1);
    }
};

<<<<<<< HEAD
// ✅ Start server after DB connects
const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
  await connectDB();
  console.log(`🚀 Server running at http://localhost:${PORT}`);
=======
// ✅ Start Server
const PORT = process.env.PORT || 3002;
const server = app.listen(PORT, async () => {
    await connectDB();
    console.log(`🚀 Server running at http://localhost:${PORT}`);
}).on('error', (err) => {
    console.error("Failed to start server:", err);
    if (err.code === 'EADDRINUSE') {
        console.log(`Port ${PORT} is already in use.`);
    }
});

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('SIGTERM signal received: closing HTTP server');
    server.close(() => {
        console.log('HTTP server closed');
        mongoose.connection.close(false, () => {
            console.log('MongoDB connection closed');
            process.exit(0);
        });
    });
>>>>>>> 36eac5a6743c0c7f9e78246d2dbcd5a9ca07e6a1
});
//