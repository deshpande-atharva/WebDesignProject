const express = require("express");
const { getAssignment, addAssignment } = require("../controllers/assignmentController");
// const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/getAssignment", getAssignment);
router.post("/create", addAssignment);

module.exports = router;
