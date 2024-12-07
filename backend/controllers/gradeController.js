const Assignment = require("../models/Assignment");
const Course = require('../models/Course');
const User = require('../models/User');
const Grade = require('../models/Grade');

exports.addGrade = async (req, res) => {
  try {
    const { userId, courseId, assignmentGrades, finalGrade } = req.body;

    // Validate input
    if (!userId || !courseId || !Array.isArray(assignmentGrades)) {
      return res.status(400).json({
        message: 'Missing required fields or invalid input format: userId, courseId, or assignmentGrades.',
      });
    }

    // Verify user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Verify course exists
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found.' });
    }

    // Verify assignments exist
    const assignmentIds = assignmentGrades.map((item) => item.assignment);
    const assignments = await Assignment.find({ _id: { $in: assignmentIds } });

    if (assignments.length !== assignmentGrades.length) {
      return res.status(404).json({ message: 'One or more assignments not found.' });
    }

    // Find existing grade document or create a new one
    let gradeDoc = await Grade.findOne({ userId, course: courseId });

    if (!gradeDoc) {
      gradeDoc = new Grade({
        userId,
        course: courseId,
        assignmentGrades: [],
      });
    }

    // Add or update grades for assignments
    for (const { assignment, grade } of assignmentGrades) {
      const existingAssignment = gradeDoc.assignmentGrades.find(
        (item) => item.assignment.toString() === assignment.toString()
      );

      if (existingAssignment) {
        existingAssignment.grade = grade; // Update grade if already exists
      } else {
        gradeDoc.assignmentGrades.push({ assignment, grade }); // Add new grade
      }
    }

    // Update final grade if provided
    if (finalGrade !== undefined) {
      gradeDoc.finalGrade = finalGrade;
    }

    // Save the grade document
    const savedGrade = await gradeDoc.save();

    res.status(201).json({
      message: 'Grades added or updated successfully',
      data: savedGrade,
    });
  } catch (error) {
    console.error('Error adding grade:', error);
    res.status(500).json({ message: 'Error adding grade', error: error.message });
  }
};


exports.getStudentGrades = async (req, res) => {
  try {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({ message: 'User ID is required.' });
    }

    const grades = await Grade.find({ student: userId })
      .populate('course', 'name courseCode')
      .populate('assignmentGrades.assignment', 'title') // Populate assignment titles
      .select('assignmentGrades finalGrade course');

    if (!grades || grades.length === 0) {
      return res.status(404).json({ message: 'No grades found for this user.' });
    }

    const formattedGrades = grades.map(grade => ({
      course: {
        _id: grade.course._id,
        name: grade.course.name,
        courseCode: grade.course.courseCode
      },
      assignmentGrades: grade.assignmentGrades.map(item => ({
        assignment: {
          _id: item.assignment._id,
          title: item.assignment.title
        },
        grade: item.grade
      })),
      finalGrade: grade.finalGrade
    }));

    res.status(200).json({
      message: 'Grades fetched successfully',
      data: formattedGrades
    });
  } catch (error) {
    console.error("Error fetching grades:", error);
    res.status(500).json({ message: 'Error fetching grades', error: error.message });
  }
};