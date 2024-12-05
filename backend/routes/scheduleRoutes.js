const express = require("express");
const { getSchedule, addSchedule } = require("../controllers/scheduleController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/", protect, getSchedule);
router.post("/", protect, addSchedule);

module.exports = router;
