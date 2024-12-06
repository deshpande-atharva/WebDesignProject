const express = require('express');
const { getCourses, getCourseById, addCourse } = require('../controllers/courseController');

const router = express.Router();

// Define routes
router.get('/courses', getCourses); // Removed `/api` prefix as it's added in `app.js`
router.get('/courses/:id', getCourseById);
router.post('/courses', addCourse);

module.exports = router;
