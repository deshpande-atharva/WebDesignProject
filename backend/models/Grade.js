const mongoose = require("mongoose");

// Static Grades Data
const grades = [
  {
    student: "john.doe@example.com",
    course: "CS101",
    assignmentGrades: [
      { assignment: "Assignment 1: Sorting Algorithms", grade: 85 },
    ],
    finalGrade: 90,
  },
  {
    student: "jane.smith@example.com",
    course: "CS101",
    assignmentGrades: [
      { assignment: "Assignment 1: Sorting Algorithms", grade: 78 },
    ],
    finalGrade: 80,
  },
  {
    student: "alice.johnson@example.com",
    course: "CS102",
    assignmentGrades: [
      { assignment: "Assignment 2: Binary Trees", grade: 92 },
    ],
    finalGrade: 88,
  },
  {
    student: "bob.brown@example.com",
    course: "CS102",
    assignmentGrades: [
      { assignment: "Assignment 2: Binary Trees", grade: 75 },
    ],
    finalGrade: 78,
  },
  {
    student: "emma.wilson@example.com",
    course: "CS103",
    assignmentGrades: [
      { assignment: "Assignment 1: Build a Personal Website", grade: 95 },
    ],
    finalGrade: 93,
  },
];

// Grades Schema


const gradeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Changed from 'student' to 'userId'
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  assignmentGrades: [
    {
      assignment: { type: mongoose.Schema.Types.ObjectId, ref: 'Assignment', required: true }, // Ensure 'assignment' is required
      grade: { type: Number, required: true }, // Ensure 'grade' is required
    },
  ],
  finalGrade: { type: Number }, // Optional
}, { timestamps: true }); // Add timestamps for tracking creation and updates


module.exports = mongoose.model('Grade', gradeSchema);

