const mongoose = require("mongoose");

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


const gradeSchema = mongoose.Schema(
  {
    student: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    course: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
    assignmentGrades: [
      {
        assignment: { type: mongoose.Schema.Types.ObjectId, ref: "Assignment" },
        grade: { type: Number, required: true },
      },
    ],
    finalGrade: { type: Number, default: null }, // Final grade for the course
  },
  { timestamps: true }
);

module.exports = mongoose.model("Grade", gradeSchema);
