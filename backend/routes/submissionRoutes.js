const express = require('express');
const multer = require('multer');
const { uploadSubmission, getSubmissions } = require('../controllers/submissionController');

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/submissions'); // Directory for storing uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Route for uploading a submission
router.post('/upload', upload.single('zipFile'), uploadSubmission);

// Route for fetching submissions by assignment ID
router.get('/:assignmentId', getSubmissions);

module.exports = router;
