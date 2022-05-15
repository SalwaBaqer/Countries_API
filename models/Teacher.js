const { model, Schema } = require('mongoose');

const TeacherSchema = new Schema({
  name: String,
  courses: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Course',
    },
  ],
});

module.exports = model('Teacher', TeacherSchema);
