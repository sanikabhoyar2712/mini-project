const Diary = require("../models/Diary");

exports.addDiaryEntry = async (req, res) => {
  try {
    const { userId, content } = req.body;
    const newEntry = new Diary({ userId, content });
    await newEntry.save();
    res.status(201).json(newEntry);
  } catch (err) {
    res.status(500).json({ error: "Failed to add diary entry" });
  }
};

exports.getDiaryEntries = async (req, res) => {
  try {
    const { userId } = req.params;
    const entries = await Diary.find({ userId }).sort({ date: -1 });
    res.status(200).json(entries);
  } catch (err) {
    res.status(500).json({ error: "Failed to get diary entries" });
  }
};
