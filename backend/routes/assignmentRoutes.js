const express = require("express");
const { getAssignment, addAssignment, getCourseAssignment } = require("../controllers/assignmentController");
// const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/getAssignment", getAssignment);
router.post("/create", addAssignment);
router.get("/getAll", getCourseAssignment)

module.exports = router;
