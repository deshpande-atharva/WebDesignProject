
const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true }, // Foreign key to Course
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Foreign key to User
  description: { type: String, required: true },
  points: { type: Number, required: true },
  dueDate: { type: Date, required: true },
  allowedAttempts: { type: Number, required: true },
  submissionType: { type: String, enum: ['file', 'text', 'link'], required: true },
  submissionDetails: { type: String }, // Details about the submission, e.g., link or description
}, { timestamps: true }); // Automatically add createdAt and updatedAt fields

module.exports = mongoose.model('Assignment', assignmentSchema);
