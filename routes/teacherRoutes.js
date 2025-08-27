// school-backend/routes/teacherRoutes.js (CORRECTED)

const express = require('express');
const router = express.Router();
const Teacher = require('../models/teacherModel');

// GET all teachers
router.get('/', async (req, res) => {
    try {
        const teachers = await Teacher.find();
        res.json(teachers);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST a new teacher
router.post('/', async (req, res) => {
    // Destructure all four fields from the request body
    const { name, subject, teacherId, contact } = req.body;

    const teacher = new Teacher({
        name,
        subject,
        teacherId,
        contact
    });

    try {
        const newTeacher = await teacher.save();
        res.status(201).json(newTeacher);
    } catch (err) {
        // Provide a more specific error message for duplicate teacherId
        if (err.code === 11000) {
            return res.status(400).json({ message: 'Teacher ID already exists.' });
        }
        res.status(400).json({ message: 'Failed to add teacher. Please check all fields.', error: err.message });
    }
});

// DELETE a teacher
router.delete('/:id', async (req, res) => {
    try {
        const teacher = await Teacher.findByIdAndDelete(req.params.id);
        if (!teacher) {
            return res.status(404).json({ message: 'Teacher not found' });
        }
        res.json({ message: 'Teacher deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;