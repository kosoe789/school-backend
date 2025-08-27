// school-backend/routes/studentRoutes.js (FINAL CORRECTED VERSION)

const express = require('express');
const router = express.Router();
const Student = require('../models/studentModel');

// GET all students
router.get('/', async (req, res) => {
    try {
        const students = await Student.find();
        res.json(students);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET a single student by studentId (for Flutter App Login)
router.get('/:studentId', async (req, res) => {
    try {
        const student = await Student.findOne({ studentId: req.params.studentId });
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }
        res.json(student);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST a new student
router.post('/', async (req, res) => {
    // FIX: Destructure all fields from the request body, including parent info
    const { name, grade, studentId, parentName, parentContact } = req.body;

    const student = new Student({
        name,
        grade,
        studentId,
        parentName,
        parentContact
    });

    try {
        const newStudent = await student.save();
        res.status(201).json(newStudent);
    } catch (err) {
        if (err.code === 11000) {
            return res.status(400).json({ message: 'Student ID already exists.' });
        }
        res.status(400).json({ message: 'Failed to add student. Please check all fields.', error: err.message });
    }
});

// DELETE a student
router.delete('/:id', async (req, res) => {
    try {
        const student = await Student.findByIdAndDelete(req.params.id);
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }
        res.json({ message: 'Student deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;