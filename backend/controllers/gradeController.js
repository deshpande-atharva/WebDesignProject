const Grade = require("../models/Grade");

exports.getGrades = async (req, res) => {
  const grades = await Grade.find();
  res.json(grades);
};

exports.addGrade = async (req, res) => {
  const { student, course, grade } = req.body;
  const newGrade = new Grade({ student, course, grade });
  await newGrade.save();
  res.status(201).json(newGrade);
};
