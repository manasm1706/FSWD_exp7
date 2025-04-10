const mongoose = require('mongoose');
let studentschema = new mongoose.Schema({
  id: { type: Number, unique: true, required: true },
  name: { type: String, required: true },
  course: { type: String, required: true }
});
let Student = mongoose.model('Studentdetails', studentschema);
module.exports = Student;
