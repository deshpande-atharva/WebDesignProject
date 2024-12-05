const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const connectDB = require("./config/db");  // Import connectDB
const courseRoutes = require("./routes/courseRoutes"); // Import course routes


// Importing Models
const User = require("./models/User");
const Course = require("./models/Course");
const Assignment = require("./models/Assignment");
const Grade = require("./models/Grade");
const Schedule = require("./models/Schedule");
const Enrollment = require("./models/Enrollment");

dotenv.config();

// Express app setup
const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", courseRoutes);  // Register course API routes

// Connect to the database
const startServer = async () => {
  try {
    await connectDB(); // Ensure database is connected
    console.log('Database connected successfully!');
    insertData(); // Insert data after successful connection

    const PORT = process.env.PORT || 5001;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error('Error in MongoDB connection:', err);
    process.exit(1); // Exit process if connection fails
  }
};

// Data arrays for Users, Courses, Assignments, etc.
const users = [
  { name: 'John Doe', email: 'john.doe@example.com', password: 'hashedpassword123', role: 'student' },
  { name: 'Jane Smith', email: 'jane.smith@example.com', password: 'hashedpassword456', role: 'student' },
  { name: 'Alice Johnson', email: 'alice.johnson@example.com', password: 'hashedpassword789', role: 'student' },
  { name: 'Bob Brown', email: 'bob.brown@example.com', password: 'hashedpassword101', role: 'student' },
  { name: 'Emma Wilson', email: 'emma.wilson@example.com', password: 'hashedpassword112', role: 'student' },
  { name: 'Prof. Richard Lee', email: 'richard.lee@example.com', password: 'hashedpassword123', role: 'teacher' },
  { name: 'Prof. Mary Taylor', email: 'mary.taylor@example.com', password: 'hashedpassword456', role: 'teacher' },
  { name: 'Michael Scott', email: 'michael.scott@example.com', password: 'hashedpassword789', role: 'ta' },
  { name: 'Dwight Schrute', email: 'dwight.schrute@example.com', password: 'hashedpassword101', role: 'ta' }
];

const courses = [
  { name: 'Introduction to Computer Science', courseCode: 'CS101', description: 'A beginner-level course on the basics of computer science.', teacher: 'richard.lee@example.com', ta: ['michael.scott@example.com', 'dwight.schrute@example.com'], content: 'Course content will cover algorithms, data structures, etc.' },
  { name: 'Data Structures', courseCode: 'CS102', description: 'Intermediate course on data structures and algorithms.', teacher: 'mary.taylor@example.com', ta: ['michael.scott@example.com', 'dwight.schrute@example.com'], content: 'Content covers linked lists, trees, and hash maps.' },
  { name: 'Web Development', courseCode: 'CS103', description: 'Learn to build web applications using HTML, CSS, and JavaScript.', teacher: 'richard.lee@example.com', ta: ['dwight.schrute@example.com'], content: 'Web technologies, JavaScript frameworks, HTML5, CSS3.' }
];

const assignments = [
  { assignmentName: 'Assignment 1: Sorting Algorithms', description: 'Implement sorting algorithms like QuickSort and MergeSort.', course: 'CS101', dueDate: '2024-12-10' },
  { assignmentName: 'Assignment 2: Binary Trees', description: 'Implement operations on binary trees.', course: 'CS102', dueDate: '2024-12-15' },
  { assignmentName: 'Assignment 1: Build a Personal Website', description: 'Create a personal website using HTML and CSS.', course: 'CS103', dueDate: '2024-12-20' }
];

const grades = [
  { student: 'john.doe@example.com', course: 'CS101', assignmentGrades: [{ assignment: 'Assignment 1: Sorting Algorithms', grade: 85 }], finalGrade: 90 },
  { student: 'jane.smith@example.com', course: 'CS101', assignmentGrades: [{ assignment: 'Assignment 1: Sorting Algorithms', grade: 78 }], finalGrade: 80 },
  { student: 'alice.johnson@example.com', course: 'CS102', assignmentGrades: [{ assignment: 'Assignment 2: Binary Trees', grade: 92 }], finalGrade: 88 },
  { student: 'bob.brown@example.com', course: 'CS102', assignmentGrades: [{ assignment: 'Assignment 2: Binary Trees', grade: 75 }], finalGrade: 78 },
  { student: 'emma.wilson@example.com', course: 'CS103', assignmentGrades: [{ assignment: 'Assignment 1: Build a Personal Website', grade: 95 }], finalGrade: 93 }
];

const enrollments = [
  { student: 'john.doe@example.com', course: 'CS101', status: 'enrolled' },
  { student: 'jane.smith@example.com', course: 'CS101', status: 'enrolled' },
  { student: 'alice.johnson@example.com', course: 'CS102', status: 'enrolled' },
  { student: 'bob.brown@example.com', course: 'CS102', status: 'enrolled' },
  { student: 'emma.wilson@example.com', course: 'CS103', status: 'enrolled' }
];

const schedules = [
  { course: 'CS101', days: ['Monday', 'Wednesday'], time: '10:00 AM - 12:00 PM', location: 'Room 101' },
  { course: 'CS102', days: ['Tuesday', 'Thursday'], time: '2:00 PM - 4:00 PM', location: 'Room 102' },
  { course: 'CS103', days: ['Friday'], time: '9:00 AM - 12:00 PM', location: 'Room 103' }
];

// Insert data into MongoDB collections
async function insertData() {
  try {
    // Check if the collections are already populated
    const courseCount = await Course.countDocuments();
    if (courseCount > 0) {
      console.log('Data already exists. Skipping data insertion.');
      return; // Skip inserting data if collections are not empty
    }

    // Insert Users
    const userDocuments = await User.insertMany(users);
    console.log('Users inserted!');

    const usersMap = userDocuments.reduce((map, user) => {
      map[user.email] = user._id;
      return map;
    }, {});

    // Update courses to use ObjectId for teacher and TAs
    const updatedCourses = courses.map(course => ({
      ...course,
      teacher: usersMap[course.teacher],  
      ta: course.ta.map(taEmail => usersMap[taEmail]),  
    }));

    // Insert Courses
    const courseDocuments = await Course.insertMany(updatedCourses);
    console.log('Courses inserted!');

    // Insert Assignments
    const updatedAssignments = assignments.map(assignment => ({
      ...assignment,
      course: courseDocuments.find(course => course.courseCode === assignment.course)._id,
    }));
    await Assignment.insertMany(updatedAssignments);
    console.log('Assignments inserted!');

    // Insert Grades
    const assignmentsMap = updatedAssignments.reduce((map, assignment) => {
      map[assignment.assignmentName] = assignment._id;
      return map;
    }, {});

    const updatedGrades = grades.map(grade => ({
      ...grade,
      student: usersMap[grade.student],  
      course: courseDocuments.find(course => course.courseCode === grade.course)._id, 
      assignmentGrades: grade.assignmentGrades.map(assignmentGrade => ({
        ...assignmentGrade,
        assignment: assignmentsMap[assignmentGrade.assignment],
      })),
    }));
    await Grade.insertMany(updatedGrades);
    console.log('Grades inserted!');

    // Insert Schedules
    const updatedSchedules = schedules.map(schedule => ({
      ...schedule,
      course: courseDocuments.find(course => course.courseCode === schedule.course)._id, 
    }));
    await Schedule.insertMany(updatedSchedules);
    console.log('Schedules inserted!');

    // Insert Enrollments
    const updatedEnrollments = enrollments.map(enrollment => ({
      ...enrollment,
      student: usersMap[enrollment.student],  
      course: courseDocuments.find(course => course.courseCode === enrollment.course)._id, 
    }));
    await Enrollment.insertMany(updatedEnrollments);
    console.log('Enrollments inserted!');

  } catch (error) {
    console.error('Error inserting data:', error);
  }
}

// Start the server


startServer();