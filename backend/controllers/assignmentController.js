const Assignment = require("../models/Assignment");
const Course = require('../models/Course');

exports.getAssignment = async (req, res) => {
    try {
        const { title } = req.query;
        const assignment = await Assignment.findOne({ title }); // Populate foreign keys
        if (!assignment) {
          return res.status(404).json({ message: 'Assignment not found' });
        }
        res.status(200).json({ data: assignment });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching assignment', error });
      }
};


exports.getCourseAssignment = async (req, res) => {
  try {
    const { courseId } = req.query;
    const courseAssignments = await Assignment.find({ courseId });
    if (courseAssignments.length === 0) {
      return res.status(404).json({ message: 'No assignments found for this course' });
    }
    res.status(200).json({ data: courseAssignments });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching assignments', error });
  }
};

exports.addAssignment = async (req, res) => {
    try {
        const {
          title,
          courseId,
          userId,
          description,
          points,
          dueDate,
          allowedAttempts,
          submissionType,
          submissionDetails,
        } = req.body;
    
        const newAssignment = new Assignment({
          title,
          courseId,
          userId,
          description,
          points,
          dueDate,
          allowedAttempts,
          submissionType,
          submissionDetails,
        });
    
        const savedAssignment = await newAssignment.save();

        // Update the course with the new assignment
        const updatedCourse = await Course.findByIdAndUpdate(
        courseId,
        { $push: { assignments: newAssignment._id } }, // Add the assignment ID to the assignments array
        { new: true } // Return the updated document
        );
  
        if (!updatedCourse) {
            return res.status(404).json({ message: "Course not found" });
        }
  

        res.status(201).json({ message: 'Assignment created successfully', data: savedAssignment });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating assignment', error });
      }
};
