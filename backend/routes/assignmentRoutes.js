const express = require('express');
const router = express.Router();


const { getAssignment, addAssignment, getCourseAssignment, getAssignments } = require("../controllers/assignmentController");
// const { protect } = require("../middleware/authMiddleware");

router.get("/getAssignment", getAssignment);
router.post("/create", addAssignment);
router.get("/getAll", getCourseAssignment);
router.get("/getAssignment/:title", getAssignments);
router.get("/course/:courseId", getCourseAssignment);

module.exports = router;
