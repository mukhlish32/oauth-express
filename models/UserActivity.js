const mongoose = require('mongoose');

const userActivitySchema = new mongoose.Schema({
    username: { 
        type: String, 
        required: true 
    },
    timestamp: { 
        type: Date, 
        required: true 
    },
    action: { 
        type: String, 
        required: true 
    }
});

const UserActivity = mongoose.model('user_activities', userActivitySchema);

module.exports = UserActivity;