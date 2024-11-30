const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    leaveBalance: { type: Number, default: 10 },
    tasks: [{ type: String }],
    performanceMetrics: {
        totalTasks: { type: Number, default: 0 },
        completedTasks: { type: Number, default: 0 },
    },
});

module.exports = mongoose.model('User', userSchema);
