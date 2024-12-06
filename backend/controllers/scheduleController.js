const Schedule = require("../models/Schedule");

// Fetch all schedules
exports.getSchedule = async (req, res) => {
  try {
    const { courseId } = req.query; // Extract courseId from query parameters

    let schedules;
    
      schedules = await Schedule.find({ course: courseId });
      if (schedules.length === 0) {
        return res.status(404).json({ message: "No schedules found for the given course ID" });
      }
    res.status(200).json(schedules);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching schedules", error });
  }
};


