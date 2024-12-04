const express = require("express");
const { getGrades, addGrade } = require("../controllers/gradeController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/", protect, getGrades);
router.post("/", protect, addGrade);

module.exports = router;
