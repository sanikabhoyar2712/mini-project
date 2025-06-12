const Contact = require("../models/contactModel");

const submitContactForm = async (req, res) => {
    try {
        const { name, email, message } = req.body;

        if (!name || !email || !message) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const newMessage = new Contact({ name, email, message });
        await newMessage.save();

        res.status(201).json({ message: "Message submitted successfully!" });
    } catch (error) {
        console.error("Error submitting contact form:", error);
        res.status(500).json({ error: "Server error" });
    }
};

module.exports = { submitContactForm };
