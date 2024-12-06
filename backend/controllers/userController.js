const mongoose = require("mongoose");
const User = require("../models/User"); // Assuming your User model is in this path

// Fetch user details by userId
exports.getUserDetails = async (req, res) => {
  try {
    const { userId } = req.query;

    // Validate if userId is provided
    if (!userId) {
      return res.status(400).json({ success: false, message: "User ID is required." });
    }

    // Validate if the userId is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ success: false, message: "Invalid User ID." });
    }

    // Find the user by userId and populate courses, teaching_courses, and assigned_courses
    const user = await User.findById(userId)
      .populate([
        { path: "courses", select: "name courseCode description" },
        { path: "teaching_courses", select: "name courseCode description" },
        { path: "assigned_courses", select: "name courseCode description" },
      ]);

    // Check if the user exists
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found." });
    }

    // Return the user details along with populated courses
    res.status(200).json({
      success: true,
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
        courses: user.courses, // Populated courses
        teaching_courses: user.teaching_courses, // Populated teaching courses
        assigned_courses: user.assigned_courses, // Populated assigned courses
      },
    });
  } catch (err) {
    console.error("Error fetching user details:", err);
    res.status(500).json({ success: false, message: `Server error: ${err.message}` });
  }
};
