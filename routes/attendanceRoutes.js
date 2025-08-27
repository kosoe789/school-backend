// routes/attendanceRoutes.js (FINAL CORRECTED VERSION)

const express = require('express');
const router = express.Router();
const Attendance = require('../models/attendanceModel'); // This will now work correctly
const Student = require('../models/studentModel');

// POST - Handles SINGLE attendance records from the Admin Portal
router.post('/', async (req, res) => {
  const { date, grade, studentId, status } = req.body;

  // Validation for a single record
  if (!date || !grade || !studentId || !status) {
    return res.status(400).json({ message: 'Date, grade, studentId, and status are required for each record.' });
  }

  try {
    // Use findOneAndUpdate with upsert:true.
    // This will update the record if it exists for that student on that day,
    // or create a new one if it doesn't.
    const result = await Attendance.findOneAndUpdate(
      {
        studentId: studentId,
        date: new Date(new Date(date).setUTCHours(0, 0, 0, 0))
      },
      {
        $set: {
          grade: grade,
          status: status
        }
      },
      {
        new: true,    // Return the updated document
        upsert: true  // Create the document if it doesn't exist
      }
    );

    res.status(201).json({
      message: `Attendance for student ${studentId} saved successfully.`,
      data: result
    });

  } catch (error) {
    console.error(`Error saving single attendance for student ${studentId}:`, error);
    res.status(500).json({ message: 'Server error while saving attendance.', error: error.message });
  }
});


// --- GET Routes (No changes needed here, but they will work now) ---

// GET - Fetch attendance for a specific grade and date
router.get('/', async (req, res) => {
  const { date, grade } = req.query;
  if (!date || !grade) {
    return res.status(400).json({ message: 'Date and grade query parameters are required.' });
  }
  try {
    const records = await Attendance.find({
      date: new Date(new Date(date).setUTCHours(0, 0, 0, 0)),
      grade: grade,
    }).populate({
        path: 'studentId',
        select: 'name studentId'
    });
    res.json(records);
  } catch (error) {
    console.error('Error fetching attendance by grade/date:', error);
    res.status(500).json({ message: 'Server error while fetching attendance.' });
  }
});

// GET - Fetch all attendance for a specific student (for Flutter App)
router.get('/student/:studentMongoId', async (req, res) => {
  try {
    const records = await Attendance.find({ studentId: req.params.studentMongoId })
      .sort({ date: -1 });
    if (!records || records.length === 0) {
      return res.status(404).json({ message: 'No attendance records found for this student.' });
    }
    res.json(records);
  } catch (error) {
    console.error('Error fetching attendance by student ID:', error);
    res.status(500).json({ message: 'Server error while fetching attendance records.' });
  }
});

module.exports = router;
