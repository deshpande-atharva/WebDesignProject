const Course = require('../models/Course');
const mongoose = require('mongoose');


// Controller function to get all courses
const getCourses = async (req, res) => {
  try {
    // Fetch courses and populate related fields
    const courses = await Course.find()
      .populate('teacher', 'name email') // Populate teacher details
      .populate('ta', 'name email');    // Populate TA details

    if (!courses || courses.length === 0) {
      return res.status(404).json({ message: 'No courses found' });
    }

    // Send response with courses
    res.status(200).json(courses);
  } catch (error) {
    console.error('Error fetching courses:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};



// Controller function to get a course by courseCode
const getCourseByCode = async (req, res) => {
  const { courseCode } = req.params; // Extract courseCode from URL parameters

  try {
    // Find the course by courseCode and populate the teacher field
    const course = await Course.findOne({ courseCode })
      .populate('teacher', 'name email')  // Populate teacher details (name and email)
      .populate('ta', 'name email')      // Optionally populate TA details
      .exec();

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    res.json(course); // Return the course details with populated teacher data
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Controller function to add a new course
const addCourse = async (req, res) => {
  try {
    const { name, courseCode, description, teacher, ta, content } = req.body;

    // Validate teacher and TA inputs
    if (!mongoose.isValidObjectId(teacher)) {
      return res.status(400).json({ message: 'Invalid teacher ID' });
    }
    const invalidTAs = ta.filter((taEmail) => !mongoose.isValidObjectId(taEmail));
    if (invalidTAs.length > 0) {
      return res.status(400).json({ message: `Invalid TA IDs: ${invalidTAs.join(', ')}` });
    }

    // Convert teacher and TA values to ObjectId
    const teacherId = new mongoose.Types.ObjectId(teacher);
    const taIds = ta.map((taEmail) => new mongoose.Types.ObjectId(taEmail));

    const newCourse = new Course({
      name,
      courseCode,
      description,
      teacher: teacherId,
      ta: taIds,
      content,
    });

    const savedCourse = await newCourse.save();
    res.status(201).json(savedCourse);
  } catch (error) {
    console.error('Error adding course:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};

module.exports = { getCourses, getCourseByCode, addCourse };
