const express = require("express");
const {
  getAssignment,
  addAssignment,
  getCourseAssignment
} = require("../controllers/assignmentController");
// const { protect } = require("../middleware/authMiddleware");
const router = express.Router();
// Removed the authenticate middleware for simplified routes

// Route to get a specific assignment
router.get("/getAssignment", getAssignment);

// Route to create a new assignment
router.post("/create", addAssignment);

// Route to get assignments for a specific course
router.get("/getAll", getCourseAssignment);

module.exports = router;
