const express = require('express');
const router = express.Router();
const { getCourses, getCourseByCode, addCourse } = require('../controllers/courseController');  // Add getCourseByCode here

// Get all courses
router.get('/courses', getCourses);

// Get a specific course by courseCode
router.get('/:courseCode', getCourseByCode);  // This was missing the import for getCourseByCode

// Add a new course
router.post('/courses', addCourse);

module.exports = router;
