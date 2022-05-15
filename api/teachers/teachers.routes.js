const express = require('express');
const router = express.Router();
const {
  teachersGet,
  teachersUpdate,
  teachersDelete,
  teachersCreate,
  fetchTeacher,
  coursesCreate,
} = require('./teachers.controllers');

router.param('teacherId', async (req, res, next, teacherId) => {
  const teacher = await fetchTeacher(teacherId, next);
  if (teacher) {
    req.teacher = teacher;
    next();
  } else {
    const err = new Error('Teacher Not Found');
    err.status = 404;
    next(err);
  }
});

router.get('/', teachersGet);
router.post('/', teachersCreate);
router.post('/:teacherId/courses', coursesCreate);

router.delete('/:teacherId', teachersDelete);

router.put('/:teacherId', teachersUpdate);

module.exports = router;
