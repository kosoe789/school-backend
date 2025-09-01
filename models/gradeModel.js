// models/gradeModel.js

const mongoose = require('mongoose');

const gradeSchema = new mongoose.Schema({
    student: { // ဘယ်ကျောင်းသားလဲဆိုတာ သိဖို့ Student Model ကို ချိတ်ဆက်မယ်
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true
    },
    subject: { // ဘာသာရပ်အမည်
        type: String,
        required: true
    },
    score: { // ရမှတ်
        type: Number,
        required: true
    },
    examType: { // ဘယ်စာမေးပွဲအမျိုးအစားလဲ (e.g., "Mid-term", "Final")
        type: String,
        required: true
    },
    date: { // စာမေးပွဲစစ်တဲ့နေ့
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Grade', gradeSchema);