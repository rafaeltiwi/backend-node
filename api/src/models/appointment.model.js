const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  date: Date,
  start_date: Date,
  end_date: Date,
  name: String,
  service: String,
  status: {type : String , default: "true"},
  schedule: String ,
  userId: String 
});

module.exports = mongoose.model('Appointment', appointmentSchema);
