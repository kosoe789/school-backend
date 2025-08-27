// models/attendanceModel.js (CORRECTED EXPORT)

const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student', // This should match the model name you use for students
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ['Present', 'Absent', 'Late'], // Allowed values
        required: true
    },
    grade: {
        type: String,
        required: true
    }
});

// Create a compound index to ensure one record per student per day
attendanceSchema.index({ studentId: 1, date: 1 }, { unique: true });

// FIX: Export the compiled model directly
module.exports = mongoose.model('Attendance', attendanceSchema);