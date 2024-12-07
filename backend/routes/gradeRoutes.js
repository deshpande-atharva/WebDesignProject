const express = require("express");
const { getStudentGrades,addGrade } = require("../controllers/gradeController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.get('/grades', getStudentGrades);
router.post('/grades', addGrade);


module.exports = router;
