const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const connectDB = require("./config/db");
const courseRoutes = require('./routes/courseRoutes');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const Assignment= require('./models/Assignment');
const assignmentRoutes = require("./routes/assignmentRoutes");
const submissionRoutes = require('./routes/submissionRoutes');
const fs = require('fs');
const path = require('path');
const scheduleRoutes = require("./routes/scheduleRoutes");
const gradeRoutes = require('./routes/gradeRoutes');
const Grade=require('./models/Grade');
const Schedule = require("./models/Schedule");


// Ensure uploads/submissions directory exists
const submissionDir = path.join(__dirname, 'uploads/submissions');
if (!fs.existsSync(submissionDir)) {
  fs.mkdirSync(submissionDir, { recursive: true });
}

// Import Models
const User = require("./models/User");
const Course = require("./models/Course");
const Enrollment = require("./models/Enrollment");


// Initialize dotenv for environment variables
dotenv.config();

// Express app setup
const app = express();
app.use(cors());
app.use(cors({
  origin: 'http://localhost:5173', // Allow only requests from the React frontend
  methods: 'GET, POST, PUT, DELETE',
  allowedHeaders: 'Content-Type, Authorization',
}));
app.use(express.json());

app.use('/uploads', express.static('uploads')); // Serve uploaded files

// Connect to the database and start the server
const startServer = async () => {
  try {
    await connectDB();
    console.log("Database connected successfully!");
    await insertData(); // Insert data every time

    const PORT = process.env.PORT || 5001;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Error in MongoDB connection:", err);
    process.exit(1);
  }
};


// API routes
app.use('/api/assignments', assignmentRoutes); // Register assignment routes
app.use('/api/submissions', submissionRoutes);
app.use('/api/schedules', scheduleRoutes);
app.use("/api", courseRoutes);
app.use('/api', authRoutes);
app.use(userRoutes);
app.use('/api', gradeRoutes);

// Static Data
const assignments = [
  {
    title: "Midterm Project",
    description: "Complete a project demonstrating your understanding of course concepts.",
    points: 100,
    dueDate: new Date("2024-12-15"),
    allowedAttempts: 1,
    submissionType: "file",
    submissionDetails: "Submit a PDF report and source code.",
  },
  {
    title: "Final Exam",
    description: "Comprehensive exam covering all course material.",
    points: 150,
    dueDate: new Date("2024-12-20"),
    allowedAttempts: 1,
    submissionType: "text",
    submissionDetails: "Complete the online exam within the allocated time.",
  },
  {
    title: "Weekly Quiz",
    description: "Short quiz on this week's topics.",
    points: 20,
    dueDate: new Date("2024-12-10"),
    allowedAttempts: 2,
    submissionType: "link",
    submissionDetails: "Access the quiz through the provided link.",
  },
];

const users = [
  {
    name: "John Doe",
    email: "john.doe@example.com",
    password: "hashedpassword123",
    role: "student",
    courses: ["CS101", "CS103"], // Using course codes
  },
  {
    name: "Jane Smith",
    email: "jane.smith@example.com",
    password: "hashedpassword456",
    role: "student",
    courses: ["CS101", "CS102"], // Using course codes
  },
  {
    name: "Prof. Richard Lee",
    email: "richard.lee@example.com",
    password: "hashedpassword789",
    role: "teacher",
    teaching_courses: ["CS101"], // Prof. Richard teaches CS101
  },
  {
    name: "Prof. Mary Taylor",
    email: "mary.taylor@example.com",
    password: "hashedpassword101",
    role: "teacher",
    teaching_courses: ["CS102"], // Prof. Mary teaches CS102
  },
  {
    name: "Michael Scott",
    email: "michael.scott@example.com",
    password: "hashedpassword112",
    role: "ta",
    assigned_courses: ["CS101", "CS102"], // TA for CS101 and CS102
  },
  {

    name: "Dwight Schrute",
    email: "dwight.schrute@example.com",
    password: "hashedpassword113",
    role: "ta",
    assigned_courses: ["CS101", "CS103"], // TA for CS101 and CS103
  },
];

const courses = [
  {
    name: "Introduction to Computer Science",
    courseCode: "CS101",
    description: "A beginner-level course on the basics of computer science.",
    teacher: "richard.lee@example.com", // Email of teacher
    ta: ["michael.scott@example.com", "dwight.schrute@example.com"], // Emails of TAs
    content: "Course content will cover algorithms, data structures, etc.",
  },
  {
    name: "Data Structures",
    courseCode: "CS102",
    description: "Intermediate course on data structures and algorithms.",
    teacher: "mary.taylor@example.com", // Email of teacher
    ta: ["michael.scott@example.com", "dwight.schrute@example.com"],
    content: "Content covers linked lists, trees, and hash maps.",
  },
  {
    name: "Web Development",
    courseCode: "CS103",
    description: "Learn to build web applications using HTML, CSS, and JavaScript.",
    teacher: "richard.lee@example.com", // Email of teacher
    ta: ["dwight.schrute@example.com"],
    content: "Web technologies, JavaScript frameworks, HTML5, CSS3.",
  },
];

const schedules = [
  {
    course: "CS101",
    days: ["Monday", "Wednesday"],
    time: "10:00 AM - 12:00 PM",
    location: "Room 101",
    duration: {
      startDate: new Date("2024-01-01"), // Example start date
      endDate: new Date("2024-05-15"),   // Example end date
    },
  },
  {
    course: "CS102",
    days: ["Tuesday", "Thursday"],
    time: "2:00 PM - 4:00 PM",
    location: "Room 102",
    duration: {
      startDate: new Date("2024-01-02"), // Example start date
      endDate: new Date("2024-05-16"),   // Example end date
    },
  },
  {
    course: "CS103",
    days: ["Friday"],
    time: "9:00 AM - 12:00 PM",
    location: "Room 103",
    duration: {
      startDate: new Date("2024-01-05"), // Example start date
      endDate: new Date("2024-05-19"),   // Example end date
    },
  },
];



const insertData = async () => {
  try {
    // Clear existing collections
    await User.deleteMany({});
    await Course.deleteMany({});
    await Enrollment.deleteMany({});
    //await Schedule.deleteMany({});
    await Grade.deleteMany({});

    await Assignment.deleteMany({});

    console.log("Existing data cleared!");

    // Hash passwords for users
    const updatedUsers = await Promise.all(
      users.map(async (user) => ({
        ...user,
        password: await bcrypt.hash(user.password, 10), // Hash password with salt rounds
        courses: [], // Placeholder for student courses
        teaching_courses: [], // Placeholder for teacher courses
        assigned_courses: [], // Placeholder for TA courses
      }))
    );

    // Insert Users
    const userDocuments = await User.insertMany(updatedUsers);
    console.log("Users with hashed passwords inserted!");

    // Map user emails to ObjectId
    const userMap = userDocuments.reduce((map, user) => {
      map[user.email] = user._id;
      return map;
    }, {});

    // Update Courses to include teacher and TA ObjectId references
    const updatedCourses = courses.map(course => ({
      ...course,
      teacher: userMap[course.teacher], // Replace teacher email with ObjectId
      ta: course.ta.map(email => userMap[email]), // Replace TA emails with ObjectIds
    }));
    const courseDocuments = await Course.insertMany(updatedCourses);
    console.log("Courses inserted!");

    // Map course codes to ObjectId
    const courseMap = courseDocuments.reduce((map, course) => {
      map[course.courseCode] = course._id;
      return map;
    }, {});

    // Update users with course references
    const updatedUserDocuments = userDocuments.map(user => {
      const updatedUser = { ...user.toObject() };
      if (user.role === "student") {
        updatedUser.courses = users
          .find(u => u.email === user.email)
          ?.courses.map(code => courseMap[code]) || [];
      } else if (user.role === "teacher") {
        updatedUser.teaching_courses = users
          .find(u => u.email === user.email)
          ?.teaching_courses.map(code => courseMap[code]) || [];
      } else if (user.role === "ta") {
        updatedUser.assigned_courses = users
          .find(u => u.email === user.email)
          ?.assigned_courses.map(code => courseMap[code]) || [];
      }
      return updatedUser;
    });

    // Replace Users with updated references
    

    // Create Enrollments for students
    const enrollments = updatedUserDocuments
      .filter(user => user.role === "student")
      .flatMap(user =>
        user.courses.map(courseId => ({
          student: user._id, // Use user ObjectId
          course: courseId, // Use course ObjectId
          status: "enrolled",
        }))
      );

    // Insert Enrollments
    await Enrollment.insertMany(enrollments);
    console.log("Enrollments inserted!");

    // Insert Schedules
    const updatedSchedules = schedules.map(schedule => ({
      ...schedule,
      course: courseDocuments.find(course => course.courseCode === schedule.course)._id,
    }));
    await Schedule.insertMany(updatedSchedules);
    console.log("Schedules inserted!");
    for (const course of courseDocuments) {
      const courseAssignments = assignments.map(assignment => ({
        ...assignment,
        courseId: course._id,
        userId: course.teacher,
      }));
      await Assignment.insertMany(courseAssignments);
      console.log(`Assignments created for course: ${course.name}`);
    }

  } catch (err) {
    console.error("Error inserting data:", err);
  }
};


startServer();