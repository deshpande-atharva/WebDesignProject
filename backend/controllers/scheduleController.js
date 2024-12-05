const Schedule = require("../models/Schedule");

exports.getSchedule = async (req, res) => {
  const schedules = await Schedule.find();
  res.json(schedules);
};

exports.addSchedule = async (req, res) => {
  const { course, date, time } = req.body;
  const schedule = new Schedule({ course, date, time });
  await schedule.save();
  res.status(201).json(schedule);
};
