const mongoose = require("mongoose");

const schedules = [
  {
    course: "CS101",
    days: ["Monday", "Wednesday"],
    time: "10:00 AM - 12:00 PM",
    location: "Room 101",
    duration: {
      startDate: new Date("2024-01-01"), // Example start date
      endDate: new Date("2024-05-15"),   // Example end date
    },
  },
  {
    course: "CS102",
    days: ["Tuesday", "Thursday"],
    time: "2:00 PM - 4:00 PM",
    location: "Room 102",
    duration: {
      startDate: new Date("2024-01-02"), // Example start date
      endDate: new Date("2024-05-16"),   // Example end date
    },
  },
  {
    course: "CS103",
    days: ["Friday"],
    time: "9:00 AM - 12:00 PM",
    location: "Room 103",
    duration: {
      startDate: new Date("2024-01-05"), // Example start date
      endDate: new Date("2024-05-19"),   // Example end date
    },
  },
];

const scheduleSchema = mongoose.Schema(
  {
    course: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
    days: { type: [String], required: true }, // Array of days e.g., ["Monday", "Wednesday"]
    time: { type: String, required: true }, // Time range e.g., "10:00 AM - 12:00 PM"
    location: { type: String, required: true }, // Room or location description
    duration: {
      startDate: { type: Date, required: true }, // Start date of the schedule
      endDate: { type: Date, required: true }, // End date of the schedule
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Schedule", scheduleSchema);
