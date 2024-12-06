const express = require('express');
const { getCourses, getCourseByCode, addCourse } = require('../controllers/courseController');

const router = express.Router();

// Define routes
router.get('/courses', getCourses); // Removed `/api` prefix as it's added in `app.js`
router.get('/courses/:courseCode', getCourseByCode);
router.post('/courses', addCourse);

module.exports = router;
