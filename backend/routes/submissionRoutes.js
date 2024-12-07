

const express = require('express');
const router = express.Router();

// Define the submission routes
router.post('/upload', (req, res) => {
  res.send('File uploaded!');
});

module.exports = router;  // Make sure to export the router

