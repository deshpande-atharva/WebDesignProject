const mongoose = require('mongoose');

const submissionSchema = mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    assignmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Assignment', required: true },
    dateUploaded: { type: Date, default: Date.now },
    zipFilePath: { type: String, required: true }, // Path to the uploaded zip file
  },
  { timestamps: true }
);

module.exports = mongoose.model('Submission', submissionSchema);
