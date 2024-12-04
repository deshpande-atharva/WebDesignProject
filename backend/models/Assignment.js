const mongoose = require("mongoose");

const assignments = [
    {
      assignmentName: "Assignment 1: Sorting Algorithms",
      description: "Implement sorting algorithms like QuickSort and MergeSort.",
      course: "CS101",
      dueDate: "2024-12-10",
    },
    {
      assignmentName: "Assignment 2: Binary Trees",
      description: "Implement operations on binary trees.",
      course: "CS102",
      dueDate: "2024-12-15",
    },
    {
      assignmentName: "Assignment 1: Build a Personal Website",
      description: "Create a personal website using HTML and CSS.",
      course: "CS103",
      dueDate: "2024-12-20",
    },
  ];
  

const assignmentSchema = mongoose.Schema(
  {
    assignmentName: { type: String, required: true },
    description: { type: String, required: true },
    course: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
    dueDate: { type: Date, required: true },
    grades: [
      {
        student: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        grade: { type: Number, default: null }, // Allow null if grade is not assigned
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Assignment", assignmentSchema);
