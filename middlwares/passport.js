const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const Student = require("../models/Student")

exports.localStrategy = new LocalStrategy({ usernameField: 'name' },async (name, password, done)=>{
    try {
        const student = await Student.findOne({
          name, // equivalent to { name : name }
        });
        if (student) {
            const passwordsMatch = student
            ? await bcrypt.compare(password, student.password)
            : false;

            if (passwordsMatch) {
                return done(null, student);
              }
              return done(null, false);
        }
      } catch (error) {
        done(error);
      }
})