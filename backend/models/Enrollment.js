const mongoose = require("mongoose");
const enrollments = [
    { student: "john.doe@example.com", course: "CS101", status: "enrolled" },
    { student: "jane.smith@example.com", course: "CS101", status: "enrolled" },
    { student: "alice.johnson@example.com", course: "CS102", status: "enrolled" },
    { student: "bob.brown@example.com", course: "CS102", status: "enrolled" },
    { student: "emma.wilson@example.com", course: "CS103", status: "enrolled" },
  ];
  

const enrollmentSchema = mongoose.Schema(
  {
    student: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    course: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
    status: { type: String, enum: ['enrolled', 'dropped'], default: 'enrolled' },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Enrollment", enrollmentSchema);
