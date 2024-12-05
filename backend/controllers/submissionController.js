const Submission = require('../models/Submission');
const path = require('path');
const fs = require('fs');

const uploadSubmission = async (req, res) => {
  try {
    const { userId, assignmentId } = req.body;

    // Ensure required fields are provided
    if (!userId || !assignmentId || !req.file) {
      return res.status(400).json({ message: "All fields (userId, assignmentId, zip file) are required." });
    }

    // Create a new submission record
    const submission = await Submission.create({
      userId,
      assignmentId,
      zipFilePath: req.file.path,
    });

    res.status(201).json({ message: "Submission uploaded successfully", submission });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to upload submission", error: error.message });
  }
};

const getSubmissions = async (req, res) => {

    try {
       const submissions = await Submission.find( {});
       res.status(200).json(submissions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to retrieve submissions", error: error.message });
  }
};

module.exports = { uploadSubmission, getSubmissions };
