const { model, Schema } = require('mongoose');

const CourseSchema = new Schema({
  name: String,
  teacherId: { type: Schema.Types.ObjectId, ref: 'Teacher' },
  students: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Student',
    },
  ],
});

module.exports = model('Course', CourseSchema);
