const mongoose = require("mongoose");
const courses = [
  {
    name: "Introduction to Computer Science",
    courseCode: "CS101",
    description: "A beginner-level course on the basics of computer science.",
    teacher: "Prof. Richard Lee",
    ta: ["Michael Scott", "Dwight Schrute"],
    content: "Course content will cover algorithms, data structures, etc.",
  },
  {
    name: "Data Structures",
    courseCode: "CS102",
    description: "Intermediate course on data structures and algorithms.",
    teacher: "Prof. Mary Taylor",
    ta: ["Michael Scott", "Dwight Schrute"],
    content: "Content covers linked lists, trees, and hash maps.",
  },
  {
    name: "Web Development",
    courseCode: "CS103",
    description: "Learn to build web applications using HTML, CSS, and JavaScript.",
    teacher: "Prof. Richard Lee",
    ta: ["Dwight Schrute"],
    content: "Web technologies, JavaScript frameworks, HTML5, CSS3.",
  },
];


const courseSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    courseCode: { type: String, required: true, unique: true },
    description: { type: String },
    teacher: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    ta: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    assignments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Assignment" }],
    content: { type: String },
    schedule: { type: mongoose.Schema.Types.ObjectId, ref: "Schedule" }, // Reference to schedule
  },
  { timestamps: true }
);

module.exports = mongoose.model("Course", courseSchema);
