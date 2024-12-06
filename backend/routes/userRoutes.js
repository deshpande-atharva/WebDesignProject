const express = require("express");
const { getUserDetails } = require("../controllers/userController"); // Import the controller function

const router = express.Router();

// Define the route
router.get("/api/user-details", getUserDetails);

module.exports = router;
