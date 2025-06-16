const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const app = express();

// ✅ Middleware
app.use(cors({
  origin: ["http://localhost:3000", "http://127.0.0.1:3000"],
  credentials: true,
}));
app.use(express.json());

// ✅ Import routes
const authRoutes = require("./routes/authRoutes");
const contactRoutes = require("./routes/contactRoutes");
const selfCareRoutes = require("./routes/selfCareRoute"); // Includes diary, mood, meditation, skincare, etc.

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

// ✅ Start server after DB connects
const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
  await connectDB();
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
//