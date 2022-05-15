const Course = require('../../models/Course');
const Teacher = require('../../models/Teacher');

exports.fetchTeacher = async (teacherId, next) => {
  try {
    const teacher = await Teacher.findById(teacherId);
    return teacher;
  } catch (error) {
    next(error);
  }
};

exports.coursesCreate = async (req, res, next) => {
  try {
    req.body.teacherId = req.teacher.id;
    const newCourse = await Course.create(req.body);
    await Teacher.findByIdAndUpdate(req.teacher.id, {
      $push: { courses: newCourse._id },
    });
    res.status(201).json(newCourse);
  } catch (error) {
    next(error);
  }
};

exports.teachersCreate = async (req, res, next) => {
  try {
    const newTeacher = await Teacher.create(req.body);
    res.status(201).json(newTeacher);
  } catch (error) {
    next(error);
  }
};

exports.teachersDelete = async (req, res, next) => {
  try {
    await Teacher.findByIdAndRemove(req.teacher.id);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

exports.teachersUpdate = async (req, res, next) => {
  try {
    await Teacher.findByIdAndUpdate(req.teacher.id, req.body);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

exports.teachersGet = async (req, res, next) => {
  try {
    const teachers = await Teacher.find({}, '-createdAt -updatedAt').populate(
      'courses'
    );
    res.json(teachers);
  } catch (error) {
    next(error);
  }
};
