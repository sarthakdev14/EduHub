import mongoose from "mongoose";

const WebinarSchema = new mongoose.Schema({
  title: String,
  date: String,
  time: String,
  mentor: String,
  seats: Number,
  price: String,
  topics: [String],
  registrations: [
    {
      name: String,
      email: String,
      registeredAt: { type: Date, default: Date.now }
    }
  ]
});

const Webinar = mongoose.model("Webinar", WebinarSchema);
export default Webinar;
