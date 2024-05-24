const User = require('../models/User');

exports.dashboard = async (req, res) => {
    try {
        const users = await User.find().select('name email createdAt verifiedAt').exec();
        const totalUsers = await User.countDocuments().exec();
        res.status(200).json({ totalUsers, users });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};