// school-backend/models/teacherModel.js (CORRECTED)

const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
    name: { type: String, required: true },
    subject: { type: String, required: true },
    teacherId: { type: String, required: true, unique: true },
    contact: { type: String, required: true }
});

module.exports = mongoose.model('Teacher', teacherSchema);