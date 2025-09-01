// routes/announcementRoutes.js

const express = require('express');
const router = express.Router();
const Announcement = require('../models/announcementModel');

// ကြေညာချက်အားလုံးကို (ရက်စွဲအလိုက်) ဆွဲထုတ်ရန်
router.get('/', async (req, res) => {
    try {
        // နောက်ဆုံးကြေညာချက်ကို အပေါ်ဆုံးမှာပြရန် sort လုပ်သည်
        const announcements = await Announcement.find().sort({ date: -1 });
        res.json(announcements);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Admin Portal ကနေ ကြေညာချက်အသစ်ထည့်ရန် (Flutter App အတွက်မလို)
router.post('/', async (req, res) => {
    const { title, content, targetGrades } = req.body;
    const announcement = new Announcement({ title, content, targetGrades });
    try {
        const newAnnouncement = await announcement.save();
        res.status(201).json(newAnnouncement);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;