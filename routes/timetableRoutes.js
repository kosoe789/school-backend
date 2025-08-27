// school-backend/routes/timetableRoutes.js (FINAL CORRECTED VERSION)

const express = require('express');
const router = express.Router();
const Timetable = require('../models/timetableModel');

// POST - Create or update a timetable for a grade
router.post('/', async (req, res) => {
    const { grade, schedule } = req.body;

    if (!grade || !schedule) {
        return res.status(400).json({ message: 'Grade and schedule are required.' });
    }

    try {
        // Find a document with a case-insensitive match for the grade and update it,
        // or create a new one if it doesn't exist (upsert: true).
        const updatedTimetable = await Timetable.findOneAndUpdate(
            { grade: { $regex: new RegExp(`^${grade.trim()}$`, 'i') } }, // Case-insensitive search
            { $set: { grade: grade, schedule: schedule } }, // Set the new data
            { new: true, upsert: true, runValidators: true }
        );
        res.status(201).json(updatedTimetable);
    } catch (err) {
        console.error('Error saving timetable:', err);
        res.status(500).json({ message: 'Failed to save timetable.', error: err.message });
    }
});

// GET - Fetch the timetable for a specific grade
router.get('/:grade', async (req, res) => {
    try {
        // Find the timetable using a case-insensitive regex to avoid "Grade 3" vs "grade 3" issues
        const gradeRegex = new RegExp(`^${req.params.grade.trim()}$`, 'i');
        const timetable = await Timetable.findOne({ grade: gradeRegex });

        if (!timetable || !timetable.schedule || Object.keys(timetable.schedule).length === 0) {
            // If no timetable is found or the schedule is empty, return a clear message.
            return res.status(404).json({ message: 'Timetable not found for this grade.' });
        }
        res.json(timetable);
    } catch (err) {
        console.error('Error fetching timetable:', err);
        res.status(500).json({ message: 'Failed to fetch timetable.', error: err.message });
    }
});

module.exports = router;
