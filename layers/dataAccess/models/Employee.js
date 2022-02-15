const mongoose = require('mongoose');
const { Schema } = mongoose;

const EmployeeSchema = new Schema({
  id: { type: String, required: true},
  name: { type: String, required: true },
  firstName: { type: String, default: "" },
  dateCreated: { type: Date, default: new Date()},
  department: { type: String, required: true },
  checkin: { type: Date },
  checkout: { type: Date },
  active: { type: Boolean, default: true},
  diffInOutTime: { type: Number },
  salary: { type: Number }
});

module.exports = mongoose.model('Employee', EmployeeSchema, 'employees')