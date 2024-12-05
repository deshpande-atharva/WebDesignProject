const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const connectDB = require("./config/db");  // Import connectDB

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

const assignments = [
  {
    assignmentName: 'Assignment 1: Sorting Algorithms',
    description: 'Implement sorting algorithms like QuickSort and MergeSort.',
    course: 'CS101', // Course code to link
    dueDate: '2024-12-10',
  },
  {
    assignmentName: 'Assignment 2: Binary Trees',
    description: 'Implement operations on binary trees.',
    course: 'CS102',
    dueDate: '2024-12-15',
  },
  {
    assignmentName: 'Assignment 1: Build a Personal Website',
    description: 'Create a personal website using HTML and CSS.',
    course: 'CS103',
    dueDate: '2024-12-20',
  },
];

const grades = [
  {
    student: 'john.doe@example.com',
    course: 'CS101',
    assignmentGrades: [
      { assignment: 'Assignment 1: Sorting Algorithms', grade: 85 },
    ],
    finalGrade: 90,
  },
  {
    student: 'jane.smith@example.com',
    course: 'CS101',
    assignmentGrades: [
      { assignment: 'Assignment 1: Sorting Algorithms', grade: 78 },
    ],
    finalGrade: 80,
  },
  {
    student: 'alice.johnson@example.com',
    course: 'CS102',
    assignmentGrades: [
      { assignment: 'Assignment 2: Binary Trees', grade: 92 },
    ],
    finalGrade: 88,
  },
  {
    student: 'bob.brown@example.com',
    course: 'CS102',
    assignmentGrades: [
      { assignment: 'Assignment 2: Binary Trees', grade: 75 },
    ],
    finalGrade: 78,
  },
  {
    student: 'emma.wilson@example.com',
    course: 'CS103',
    assignmentGrades: [
      { assignment: 'Assignment 1: Build a Personal Website', grade: 95 },
    ],
    finalGrade: 93,
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

async function insertData() {
  try {
    // Clear the users collection to avoid duplicate entries
    await User.deleteMany({});
    console.log('Users collection cleared.');

    // Clear the courses collection to avoid duplicate entries
    await Course.deleteMany({});
    console.log('Courses collection cleared.');

    // Insert Users
    const userDocuments = await User.insertMany(users);
    console.log('Users inserted!');

    // Create a map for user emails to ObjectId for easy lookup
    const usersMap = userDocuments.reduce((map, user) => {
      map[user.email] = user._id;
      return map;
    }, {});

    // Update courses to use ObjectId for teacher and TAs
    const updatedCourses = courses.map(course => ({
      ...course,
      teacher: usersMap[course.teacher],  // Map email to ObjectId
      ta: course.ta.map(taEmail => usersMap[taEmail]),  // Map emails to ObjectIds
    }));

    // Insert Courses
    const courseDocuments = await Course.insertMany(updatedCourses);
    console.log('Courses inserted!');

    // Insert Assignments (linking course by ObjectId)
    const updatedAssignments = assignments.map(assignment => ({
      ...assignment,
      course: courseDocuments.find(course => course.courseCode === assignment.course)._id, // Map course code to ObjectId
    }));
    const assignmentDocuments = await Assignment.insertMany(updatedAssignments);
    console.log('Assignments inserted!');

    // Create a map of assignments by name to their ObjectId for easy lookup
    const assignmentsMap = assignmentDocuments.reduce((map, assignment) => {
      map[assignment.assignmentName] = assignment._id;
      return map;
    }, {});

    // Insert Grades (linking students and courses)
    const updatedGrades = grades.map(grade => ({
      ...grade,
      student: usersMap[grade.student],  // Map student email to ObjectId
      course: courseDocuments.find(course => course.courseCode === grade.course)._id, // Map course code to ObjectId
      assignmentGrades: grade.assignmentGrades.map(assignmentGrade => ({
        ...assignmentGrade,
        assignment: assignmentsMap[assignmentGrade.assignment],  // Map assignment name to ObjectId
      })),
    }));
    const gradeDocuments = await Grade.insertMany(updatedGrades);
    console.log('Grades inserted!');


    
    // Insert Schedules (linking courses)
    const updatedSchedules = schedules.map(schedule => ({
      ...schedule,
      course: courseDocuments.find(course => course.courseCode === schedule.course)._id, // Map course code to ObjectId
    }));
    const scheduleDocuments = await Schedule.insertMany(updatedSchedules);
    console.log();
    console.log('Schedules inserted!');

    // Insert Enrollments (linking students and courses)
    const updatedEnrollments = enrollments.map(enrollment => ({
      ...enrollment,
      student: usersMap[enrollment.student],  // Map student email to ObjectId
      course: courseDocuments.find(course => course.courseCode === enrollment.course)._id, // Map course code to ObjectId
    }));
    const enrollmentDocuments = await Enrollment.insertMany(updatedEnrollments);
    console.log('Enrollments inserted!');

    // Disconnect from MongoDB
    mongoose.disconnect();
    console.log('Data inserted successfully!');
  } catch (error) {
    console.error('Error inserting data:', error);
  }
}



// Call insertData function to populate the database
insertData();

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
