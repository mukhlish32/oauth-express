const jwt = require('jsonwebtoken');
const User = require('../models/User');

const hasAuth = async (req, res, next) => {
    try {
        let token;
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }
   
        if (!token) {
            return res.status(401).json({ message: 'Tidak ada token' });
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        if (!decodedToken || !decodedToken.userId) {
            return res.status(401).json({ message: 'Token tidak valid' });
        }

        const userId = decodedToken.userId;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(401).json({ message: 'User tidak ditemukan' });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error('Error: ', error);
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: 'Token tidak valid' });
        }
        return res.status(500).json({ message: 'Error: ', error });
    }
};

module.exports = hasAuth;
