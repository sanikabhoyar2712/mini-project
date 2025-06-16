const Mood = require('../models/mood');

// ✅ Save Mood
exports.saveMood = async (req, res) => {
  try {
    const { mood, date } = req.body;
    const newMood = new Mood({ mood, date });
    await newMood.save();
    res.status(201).json({ message: 'Mood saved successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error saving mood', error: error.message });
  }
};

// ✅ Get All Moods
exports.getMoods = async (req, res) => {
  try {
    const moods = await Mood.find().sort({ date: -1 });
    res.status(200).json(moods);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching moods', error: error.message });
  }
};
