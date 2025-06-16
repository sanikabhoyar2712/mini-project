const express = require('express');
const router = express.Router();
const { saveMood, getMoods } = require('../controllers/moodController');

// ✅ Save mood
router.post('/save', saveMood);

// ✅ Get moods
router.get('/all', getMoods);

module.exports = router;
