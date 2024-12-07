const Submission = require('../models/Submission');
const path = require('path');
const fs = require('fs');
const multer = require('multer');

// Set up multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Define the upload directory where files will be saved
    const uploadDir = path.join(__dirname, '../uploads'); // Adjust this to your desired upload directory
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true }); // Ensure the directory exists
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    // Set file name with current timestamp to avoid file name conflicts
    cb(null, Date.now() + path.extname(file.originalname)); // e.g., 1234567890.zip
  }
});

// Filter to ensure only ZIP files are uploaded
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['application/zip'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true); // Accept the file
  } else {
    cb(new Error('Only ZIP files are allowed'), false); // Reject other file types
  }
};

// Initialize multer upload with storage and file filter configurations
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024 // Limit file size to 10MB (optional)
  }
});

// The controller for uploading submissions
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
      zipFilePath: req.file.path, // Save the file path in the database
    });

    res.status(201).json({ message: "Submission uploaded successfully", submission });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to upload submission", error: error.message });
  }
};

// Controller to get all submissions
const getSubmissions = async (req, res) => {
  try {
    const submissions = await Submission.find({});
    res.status(200).json(submissions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to retrieve submissions", error: error.message });
  }
};

module.exports = { uploadSubmission, getSubmissions, upload };
