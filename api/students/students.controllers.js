const Student = require('../../models/Student');

exports.fetchStudent = async (studentId) => {
  try {
    const student = await Student.findById(studentId);
    return student;
  } catch (error) {
    next(error);
  }
};

exports.studentsCreate = async (req, res, next) => {
  try {
    const newStudent = await Student.create(req.body);
    res.status(201).json(newStudent);
  } catch (error) {
    next(error);
  }
};

exports.studentsDelete = async (req, res, next) => {
  try {
    await Student.findByIdAndRemove(req.student.id);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

exports.studentsUpdate = async (req, res, next) => {
  try {
    await Student.findByIdAndUpdate(req.student.id, req.body);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

exports.studentsGet = async (req, res, next) => {
  try {
    const students = await Student.find({}, '-createdAt -updatedAt').populate(
      'courses',
      'name'
    );
    res.json(students);
  } catch (error) {
    next(error);
  }
};
