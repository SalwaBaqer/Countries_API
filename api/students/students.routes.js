const express = require('express');
const router = express.Router();
const {
  studentsGet,
  studentsUpdate,
  studentsDelete,
  studentsCreate,
  fetchStudent,
} = require('./students.controllers');

router.param('studentId', async (req, res, next, studentId) => {
  const student = await fetchStudent(studentId, next);
  if (student) {
    req.student = student;
    next();
  } else {
    const err = new Error('Student Not Found');
    err.status = 404;
    next(err);
  }
});

router.get('/', studentsGet);
router.post('/', studentsCreate);

router.delete('/:studentId', studentsDelete);

router.put('/:studentId', studentsUpdate);

module.exports = router;
