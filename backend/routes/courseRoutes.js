const express = require("express");
const { getCourses, addCourse } = require("../controllers/courseController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/", protect, getCourses);
router.post("/", protect, addCourse);

module.exports = router;
