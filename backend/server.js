const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const connectDB = require("./config/db");  // Import connectDB
const assignmentRoutes = require("./routes/assignmentRoutes");
const submissionRoutes = require('./routes/submissionRoutes');
const fs = require('fs');
const path = require('path');

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

// Connect to MongoDB
connectDB();

// Express app setup
const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads')); // Serve uploaded files

// API routes
app.use('/api/assignments', assignmentRoutes); // Register assignment routes
app.use('/api/submissions', submissionRoutes);

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

// async function insertData() {
//   try {
//     // Clear the users collection to avoid duplicate entries
//     await User.deleteMany({});
//     console.log('Users collection cleared.');

//     // Clear the courses collection to avoid duplicate entries
//     await Course.deleteMany({});
//     console.log('Courses collection cleared.');

//     // Insert Users
//     const userDocuments = await User.insertMany(users);
//     console.log('Users inserted!');

//     // Create a map for user emails to ObjectId for easy lookup
//     const usersMap = userDocuments.reduce((map, user) => {
//       map[user.email] = user._id;
//       return map;
//     }, {});

//     // Update courses to use ObjectId for teacher and TAs
//     const updatedCourses = courses.map(course => ({
//       ...course,
//       teacher: usersMap[course.teacher],  // Map email to ObjectId
//       ta: course.ta.map(taEmail => usersMap[taEmail]),  // Map emails to ObjectIds
//     }));

//     // Insert Courses
//     const courseDocuments = await Course.insertMany(updatedCourses);
//     console.log('Courses inserted!');


    
//     // Insert Schedules (linking courses)
//     const updatedSchedules = schedules.map(schedule => ({
//       ...schedule,
//       course: courseDocuments.find(course => course.courseCode === schedule.course)._id, // Map course code to ObjectId
//     }));
//     const scheduleDocuments = await Schedule.insertMany(updatedSchedules);
//     console.log();
//     console.log('Schedules inserted!');

//     // Insert Enrollments (linking students and courses)
//     const updatedEnrollments = enrollments.map(enrollment => ({
//       ...enrollment,
//       student: usersMap[enrollment.student],  // Map student email to ObjectId
//       course: courseDocuments.find(course => course.courseCode === enrollment.course)._id, // Map course code to ObjectId
//     }));
//     const enrollmentDocuments = await Enrollment.insertMany(updatedEnrollments);
//     console.log('Enrollments inserted!');

//     // Disconnect from MongoDB
//     mongoose.disconnect();
//     console.log('Data inserted successfully!');
//   } catch (error) {
//     console.error('Error inserting data:', error);
//   }
// }



// Call insertData function to populate the database
// insertData();

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


