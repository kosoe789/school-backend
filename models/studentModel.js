// school-backend/models/studentModel.js (FINAL CORRECTED VERSION)

const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    studentId: { type: String, required: true, unique: true },
    grade: { type: String, required: true },
    // FIX: Add the new fields for parent information
    parentName: { type: String, required: false }, // Set to false if it can be optional
    parentContact: { type: String, required: false }
});

module.exports = mongoose.model('Student', studentSchema);