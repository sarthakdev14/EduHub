import express from "express";
import Webinar from "../models/Webinar.js"; // Webinar Model

const router = express.Router();

// 📌 Register a user for a webinar
router.post("/register", async (req, res) => {
  try {
    const { name, email, webinarId } = req.body;

    // Check if all fields are provided
    if (!name || !email || !webinarId) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Find the webinar
    const webinar = await Webinar.findById(webinarId);
    if (!webinar) {
      return res.status(404).json({ error: "Webinar not found" });
    }

    // Save the registration
    webinar.registrations.push({ name, email });
    await webinar.save();

    res.status(201).json({ message: "Registered successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
});

export default router;
