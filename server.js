// server.js (CORRECTED FOR CORS TEST)

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ======================= TEMPORARY CORS FIX =======================
// This allows requests from ANY origin. It's for testing.
app.use(cors());
// ================================================================

// Middleware to parse JSON bodies
app.use(express.json());

// DB Connection
const MONGO_URI = process.env.MONGO_URI;
mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB connected successfully.'))
  .catch(err => console.error('MongoDB connection error:', err));

// API Routes
const studentRoutes = require('./routes/studentRoutes');
const teacherRoutes = require('./routes/teacherRoutes');
const timetableRoutes = require('./routes/timetableRoutes');
const attendanceRoutes = require('./routes/attendanceRoutes');

app.use('/api/students', studentRoutes);
app.use('/api/teachers', teacherRoutes);
app.use('/api/timetables', timetableRoutes);
app.use('/api/attendance', attendanceRoutes);

// A simple root route to check if the server is running
app.get('/', (req, res) => {
    res.send('School Backend API is running!');
});

// Start Server
app.listen(PORT, () => {
  // CORRECTED THE CONSOLE LOG SYNTAX TO USE BACKTICKS (`)
  console.log(`Server is running on port ${PORT}`);
});
