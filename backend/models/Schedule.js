const mongoose = require("mongoose");

const schedules = [
  {
    course: "CS101",
    days: ["Monday", "Wednesday"],
    time: "10:00 AM - 12:00 PM",
    location: "Room 101",
  },
  {
    course: "CS102",
    days: ["Tuesday", "Thursday"],
    time: "2:00 PM - 4:00 PM",
    location: "Room 102",
  },
  {
    course: "CS103",
    days: ["Friday"],
    time: "9:00 AM - 12:00 PM",
    location: "Room 103",
  },
];


const scheduleSchema = mongoose.Schema(
  {
    course: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
    days: { type: [String], required: true }, // Array of days e.g., ["Monday", "Wednesday"]
    time: { type: String, required: true }, // Time range e.g., "10:00 AM - 12:00 PM"
    location: { type: String, required: true }, // Room or location description
  },
  { timestamps: true }
);

module.exports = mongoose.model("Schedule", scheduleSchema);
