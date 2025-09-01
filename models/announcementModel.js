// models/announcementModel.js

const mongoose = require('mongoose');

const announcementSchema = new mongoose.Schema({
    title: { // ကြေညာချက်ခေါင်းစဉ်
        type: String,
        required: true
    },
    content: { // အကြောင်းအရာအပြည့်အစုံ
        type: String,
        required: true
    },
    date: { // ထုတ်ပြန်သည့်နေ့
        type: Date,
        default: Date.now
    },
    // ကြေညာချက်ကို ဘယ်အတန်းတွေအတွက် ရည်ရွယ်သလဲ (e.g., ["Grade 1", "Grade 2"])
    // အတန်းအားလုံးအတွက်ဆိုရင် empty array အဖြစ်ထားနိုင်
    targetGrades: [{
        type: String
    }]
});

module.exports = mongoose.model('Announcement', announcementSchema);