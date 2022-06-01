const { model, Schema } = require('mongoose');

const StudentSchema = new Schema({
  name: String,
  password: String,
  courses: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Course',
    },
  ],
});

module.exports = model('Student', StudentSchema);
