const express = require("express");
const router = express.Router();

const {
  getSelfCareData,
  saveSelfCareData,
  addDiaryEntry,
  getDiaryEntries,
} = require("../controllers/selfCareController");

// ✅ GET: Fetch all self-care data by user ID
router.get("/:userId", getSelfCareData);

// ✅ POST: Save or update self-care data
router.post("/", saveSelfCareData);

// ✅ POST: Add a new diary entry
router.post("/diary", addDiaryEntry);

// ✅ GET: Fetch all diary entries for a user
router.get("/diary/:userId", getDiaryEntries);

module.exports = router;
