const Student = require('../../models/Student');
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

exports.fetchStudent = async (studentId) => {
  try {
    const student = await Student.findById(studentId)
    return student;
  } catch (error) {
    next(error);
  }
};

exports.signup = async (req, res, next) => {
  const {password} = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    req.body.password = hashedPassword;
    const newStudent = await Student.create(req.body);
    res.status(201).json(newStudent);
  } catch (error) {
    next(error);
  }
};

exports.signin = async(req, res, next) =>{
 const {user} = req
    const payload = {
      id: user.id,
      username: user.name,
      exp: Date.now() + 900000, // the token will expire 15 minutes from when it's generated
    };
    const token = jwt.sign(JSON.stringify(payload), "asupersecretkey");
  return res.json({token})
}

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
    const students = await Student.find({}, '-createdAt -updatedAt -password').populate(
      'courses',
      'name'
    );
    res.json(students);
  } catch (error) {
    next(error);
  }
};
