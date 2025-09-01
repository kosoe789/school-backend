// server.js (Final Corrected Version for Deploy)

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// DB Connection
const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
  console.error('FATAL ERROR: MONGO_URI is not defined in .env file.');
  process.exit(1);
}
mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB connected successfully.'))
  .catch(err => console.error('MongoDB connection error:', err));

// API Routes
const studentRoutes = require('./routes/studentRoutes');
const teacherRoutes = require('./routes/teacherRoutes');
const timetableRoutes = require('./routes/timetableRoutes');
const attendanceRoutes = require('./routes/attendanceRoutes');
const gradeRoutes = require('./routes/gradeRoutes');
const announcementRoutes = require('./routes/announcementRoutes');

app.use('/api/students', studentRoutes);
app.use('/api/teachers', teacherRoutes);
app.use('/api/timetables', timetableRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/grades', gradeRoutes);
app.use('/api/announcements', announcementRoutes);

// A simple root route to check if the server is running
app.get('/', (req, res) => {
    res.send('School Backend API is running!');
});

// Start Server
app.listen(PORT, () => {
  // ==========================================================
  // vvvvvvvvvvvvvvv   ဒီတစ်ကြောင်းကို သေချာပြင်ပါ   vvvvvvvvvvvvvvv
  // Backticks () ကို သုံးထားမှသာ အလုပ်လုပ်ပါမည်။
  console.log(`Server is running on port ${PORT}`);
  // ^^^^^^^^^^^^^^^   ဒီတစ်ကြောင်းကို သေချာပြင်ပါ   ^^^^^^^^^^^^^^^
  // ==========================================================
});