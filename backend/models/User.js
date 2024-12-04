const mongoose = require("mongoose");
const users = [
  {
    name: "John Doe",
    email: "john.doe@example.com",
    password: "hashedpassword123",
    role: "student",
  },
  {
    name: "Jane Smith",
    email: "jane.smith@example.com",
    password: "hashedpassword456",
    role: "student",
  },
  {
    name: "Alice Johnson",
    email: "alice.johnson@example.com",
    password: "hashedpassword789",
    role: "student",
  },
  {
    name: "Bob Brown",
    email: "bob.brown@example.com",
    password: "hashedpassword101",
    role: "student",
  },
  {
    name: "Emma Wilson",
    email: "emma.wilson@example.com",
    password: "hashedpassword112",
    role: "student",
  },
  {
    name: "Prof. Richard Lee",
    email: "richard.lee@example.com",
    password: "hashedpassword123",
    role: "teacher",
  },
  {
    name: "Prof. Mary Taylor",
    email: "mary.taylor@example.com",
    password: "hashedpassword456",
    role: "teacher",
  },
  {
    name: "Michael Scott",
    email: "michael.scott@example.com",
    password: "hashedpassword789",
    role: "ta",
  },
  {
    name: "Dwight Schrute",
    email: "dwight.schrute@example.com",
    password: "hashedpassword101",
    role: "ta",
  },
];


const userSchema = mongoose.Schema(

  
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { 
      type: String, 
      enum: ['student', 'teacher', 'ta'], 
      required: true 
    },
    courses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
    teaching_courses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
    assigned_courses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }], // For TAs
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
