const Course = require('../models/Course');
const mongoose = require('mongoose');
const { ObjectId } = require('mongodb');


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

// Controller function to get a course by Id
const getCourseById = async (req, res) => {
  const { id } = req.params; // Extract course ID from route params

  // Validate the ID format
  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid course ID format' });
  }

  try {
    // Find the course by _id and populate teacher and TA fields
    const course = await Course.findById(new ObjectId(id)) // Correct usage of ObjectId
      .populate('teacher', 'name email') // Populate teacher details
      .populate('ta', 'name email') // Optionally populate TA details
      .exec();

    // Handle course not found
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // Return the course details with populated teacher and TA data
    res.status(200).json(course);
  } catch (err) {
    console.error('Error fetching course:', err);
    res.status(500).json({ message: 'Internal server error' });
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

module.exports = { getCourses, getCourseById, addCourse };
