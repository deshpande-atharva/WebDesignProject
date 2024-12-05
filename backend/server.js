
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const connectDB = require("./config/db");  // Import connectDB
const assignmentRoutes = require("./routes/assignmentRoutes");
const submissionRoutes = require('./routes/submissionRoutes');
const fs = require('fs');
const path = require('path');
const courseRoutes = require("./routes/courseRoutes"); 

// Ensure uploads/submissions directory exists
const submissionDir = path.join(__dirname, 'uploads/submissions');
if (!fs.existsSync(submissionDir)) {
  fs.mkdirSync(submissionDir, { recursive: true });
}

// Importing Models
const User = require("./models/User");
const Course = require("./models/Course");
const Assignment = require("./models/Assignment");
const Grade = require("./models/Grade");
const Schedule = require("./models/Schedule");
const Enrollment = require("./models/Enrollment");

// Initialize dotenv for environment variables
dotenv.config();

// Express app setup
const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads')); // Serve uploaded files

// Connect to the database
const startServer = async () => {
  try {
    await connectDB(); // Ensure database is connected
    console.log('Database connected successfully!');
    insertData(); // Insert data after successful connection

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error('Error in MongoDB connection:', err);
    process.exit(1); // Exit process if connection fails
  }
};

// API routes
app.use('/api/assignments', assignmentRoutes); // Register assignment routes
app.use('/api/submissions', submissionRoutes);
app.use("/api", courseRoutes);

// Data arrays for Users, Courses, Assignments, etc.
const users = [
  {
    name: 'John Doe',
    email: 'john.doe@example.com',
    password: 'hashedpassword123',
    role: 'student',
  },
  {
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    password: 'hashedpassword456',
    role: 'student',
  },
  {
    name: 'Alice Johnson',
    email: 'alice.johnson@example.com',
    password: 'hashedpassword789',
    role: 'student',
  },
  {
    name: 'Bob Brown',
    email: 'bob.brown@example.com',
    password: 'hashedpassword101',
    role: 'student',
  },
  {
    name: 'Emma Wilson',
    email: 'emma.wilson@example.com',
    password: 'hashedpassword112',
    role: 'student',
  },
  {
    name: 'Prof. Richard Lee',
    email: 'richard.lee@example.com',
    password: 'hashedpassword123',
    role: 'teacher',
  },
  {
    name: 'Prof. Mary Taylor',
    email: 'mary.taylor@example.com',
    password: 'hashedpassword456',
    role: 'teacher',
  },
  {
    name: 'Michael Scott',
    email: 'michael.scott@example.com',
    password: 'hashedpassword789',
    role: 'ta',
  },
  {
    name: 'Dwight Schrute',
    email: 'dwight.schrute@example.com',
    password: 'hashedpassword101',
    role: 'ta',
  },
];

const courses = [
  {
    name: 'Introduction to Computer Science',
    courseCode: 'CS101',
    description: 'A beginner-level course on the basics of computer science.',
    teacher: 'richard.lee@example.com',  // Email of teacher
    ta: ['michael.scott@example.com', 'dwight.schrute@example.com'],  // Emails of TAs
    content: 'Course content will cover algorithms, data structures, etc.',
  },
  {
    name: 'Data Structures',
    courseCode: 'CS102',
    description: 'Intermediate course on data structures and algorithms.',
    teacher: 'mary.taylor@example.com',  // Email of teacher
    ta: ['michael.scott@example.com', 'dwight.schrute@example.com'],
    content: 'Content covers linked lists, trees, and hash maps.',
  },
  {
    name: 'Web Development',
    courseCode: 'CS103',
    description: 'Learn to build web applications using HTML, CSS, and JavaScript.',
    teacher: 'richard.lee@example.com',
    ta: ['dwight.schrute@example.com'],
    content: 'Web technologies, JavaScript frameworks, HTML5, CSS3.',
  },
];

const enrollments = [
  { student: 'john.doe@example.com', course: 'CS101', status: 'enrolled' },
  { student: 'jane.smith@example.com', course: 'CS101', status: 'enrolled' },
  { student: 'alice.johnson@example.com', course: 'CS102', status: 'enrolled' },
  { student: 'bob.brown@example.com', course: 'CS102', status: 'enrolled' },
  { student: 'emma.wilson@example.com', course: 'CS103', status: 'enrolled' },
];

const schedules = [
  {
    course: 'CS101',
    days: ['Monday', 'Wednesday'],
    time: '10:00 AM - 12:00 PM',
    location: 'Room 101',
  },
  {
    course: 'CS102',
    days: ['Tuesday', 'Thursday'],
    time: '2:00 PM - 4:00 PM',
    location: 'Room 102',
  },
  {
    course: 'CS103',
    days: ['Friday'],
    time: '9:00 AM - 12:00 PM',
    location: 'Room 103',
  },
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


