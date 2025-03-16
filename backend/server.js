import express from "express";
import cors from "cors";
import mongoose from "mongoose";

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB Connection (Ensure it's running)
mongoose.connect("mongodb://localhost:27017/collegeraahi", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Webinar Registration Schema
const RegistrationSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  webinarTitle: String,
});

const Registration = mongoose.model("Registration", RegistrationSchema);

// Registration API Route
app.post("/api/register", async (req, res) => {
  try {
    const { name, email, phone, webinarTitle } = req.body;

    // Basic validation
    if (!name || !email || !phone) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Save to database
    const newRegistration = new Registration({ name, email, phone, webinarTitle });
    await newRegistration.save();

    res.status(201).json({ message: "Registration successful!" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Server error, try again later" });
  }
});

// Start Server
app.listen(5000, () => console.log("Server running on port 5000"));
