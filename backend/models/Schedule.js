const mongoose = require("mongoose");

// Static Schedules Data
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

// Schedules Schema
const scheduleSchema = mongoose.Schema(
  {
    course: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
    days: { type: [String], required: true }, // Days e.g., ["Monday", "Wednesday"]
    time: { type: String, required: true }, // Time range e.g., "10:00 AM - 12:00 PM"
    location: { type: String, required: true }, // Location e.g., "Room 101"
  },
  { timestamps: true }
);

module.exports = {
  Schedule: mongoose.model("Schedule", scheduleSchema),
  schedules,
};
