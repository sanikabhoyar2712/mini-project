const SelfCare = require("../models/selfCareModel");

// ✅ GET full self-care data for a user
exports.getSelfCareData = async (req, res) => {
  try {
    const data = await SelfCare.findOne({ userId: req.params.userId });
    res.json(data || {});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ SAVE or UPDATE self-care data
exports.saveSelfCareData = async (req, res) => {
  try {
    const { userId, updatedData } = req.body;
    let selfCare = await SelfCare.findOne({ userId });

    if (!selfCare) {
      selfCare = new SelfCare({ userId, ...updatedData });
    } else {
      Object.assign(selfCare, updatedData);
    }

    await selfCare.save();
    res.json({ message: "Data saved successfully", selfCare });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ ADD a new diary entry
exports.addDiaryEntry = async (req, res) => {
  try {
    const { userId, date, content } = req.body;
    const entryDate = date || new Date(); // 🧠 Default date if not sent

    // 🧠 Debug log to check incoming data
    console.log("📥 Incoming Diary Entry:", { userId, date: entryDate, content });

    let selfCare = await SelfCare.findOne({ userId });

    if (!selfCare) {
      selfCare = new SelfCare({ userId, diary: [{ date: entryDate, content }] });
    } else {
      selfCare.diary.push({ date: entryDate, content });
    }

    await selfCare.save();
    res.status(201).json({ message: "Diary entry added", diary: selfCare.diary });
  } catch (err) {
    console.error("❌ Error saving diary:", err); // 🧠 Debug error log
    res.status(500).json({ error: err.message });
  }
};

// ✅ GET all diary entries for a user
exports.getDiaryEntries = async (req, res) => {
  try {
    const selfCare = await SelfCare.findOne({ userId: req.params.userId });

    if (!selfCare || !selfCare.diary) {
      return res.status(404).json({ message: "No diary entries found" });
    }

    res.json(selfCare.diary);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
