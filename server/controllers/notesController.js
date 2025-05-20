// controllers/notesController.js

const getAllNotes = (req, res) => {
    res.json({ message: "All notes fetched successfully!" });
};

const createNote = (req, res) => {
    res.json({ message: "Note created successfully!" });
};

module.exports = {
    getAllNotes,
    createNote,
};