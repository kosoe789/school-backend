// routes/gradeRoutes.js

const express = require('express');
const router = express.Router();
const Grade = require('../models/gradeModel');

// ကျောင်းသားတစ်ယောက်ရဲ့ အမှတ်စာရင်းအားလုံးကို student's mongoDB ID နဲ့ ဆွဲထုတ်ရန်
router.get('/student/:studentId', async (req, res) => {
    try {
        const grades = await Grade.find({ student: req.params.studentId });
        if (!grades) {
            return res.status(404).json({ message: 'No grades found for this student.' });
        }
        res.json(grades);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Admin Portal ကနေ အမှတ်စာရင်းအသစ်ထည့်ရန် (Flutter App အတွက်မလို)
router.post('/', async (req, res) => {
    const { student, subject, score, examType } = req.body;
    const grade = new Grade({ student, subject, score, examType });
    try {
        const newGrade = await grade.save();
        res.status(201).json(newGrade);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;