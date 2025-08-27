// school-backend/models/timetableModel.js (FINAL CORRECTED VERSION)

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// This sub-schema defines the structure for a single class period.
// It will be part of the main timetable.
const periodSchema = new Schema({
    time: { type: String, required: true },
    subject: { type: String, required: true },
    teacher: { type: String, required: true } // Storing teacher name directly for simplicity
}, { _id: false }); // _id is not needed for these sub-documents

// This is the main schema for the entire timetable of a single grade.
const timetableSchema = new Schema({
    grade: {
        type: String,
        required: true,
        unique: true // Ensures each grade has only one timetable document.
    },
    // The 'schedule' is a Map where keys are days (e.g., "Monday")
    // and the values are an array of Period objects defined above.
    schedule: {
        type: Map,
        of: [periodSchema] // The value of the map is an array of 'periodSchema' objects
    }
}, { timestamps: true });

module.exports = mongoose.model('Timetable', timetableSchema);