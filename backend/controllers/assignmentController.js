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


exports.getCourseAssignment = async(req, res) => {
    try {
        const { courseId } = req.query;
        const courseAssignment = await Assignment.find({ courseId }); // Populate foreign keys
        if (!courseAssignment) {
          return res.status(404).json({ message: 'Assignment not found for specific course' });
        }
        res.status(200).json({ data: courseAssignment });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching assignment', error });
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
