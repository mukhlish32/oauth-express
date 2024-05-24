const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const UserActivity = require('../models/UserActivity');
const jwtSecret = process.env.JWT_SECRET || 'test';
const { sendVerificationEmail } = require('../config/mailer');

// Function to record user activity
const logUserActivity = async (username, action) => {
    try {
        const activity = new UserActivity({ username, timestamp: new Date(), action });
        await activity.save();
    } catch (error) {
        console.error('Error: ', error);
    }
};

// Register user
exports.registerUser = async (req, res) => {
    try {
        const { username, email, password, nama, alamat, telp } = req.body;
        const encryptedPass = await bcrypt.hash(password, 10);

        // set verificationCode
        const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
        const user = new User({
            username, email, password: encryptedPass, nama, alamat, telp, verificationCode
        });

        await user.save();
        sendVerificationEmail(email, verificationCode);

        await logUserActivity(username, 'register');
        res.status(201).json({ message: 'User berhasil terdaftar, harap lakukan verifikasi dahulu' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error: ', error });
    }
};

// Verifikasi user
exports.verifyEmail = async (req, res) => {
    const { email, code } = req.body;
    try {
        const user = await User.findOne({ email: email, verificationCode: code });
        if (!user) {
            return res.status(400).json({ message: 'Kode Verifikasi Invalid' });
        }

        user.verified = true;
        user.verifiedAt = new Date();
        user.verificationCode = null;
        await logUserActivity(user.username, 'verified');
        await user.save();
        res.status(200).json({ message: 'Verifikasi berhasil'});
    } catch (error) {
        res.status(500).json({ message: 'Error: ', error });
    }
};

// Login user
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'User tidak ditemukan' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Password tidak sesuai' });
        }

        if (!user.verified) {
            return res.status(400).json({ message: 'Email belum verifikasi' });
        }

        const token = jwt.sign({ userId: user._id }, jwtSecret);

        res.cookie('jwtToken', token, { maxAge: 86400 * 1000, httpOnly: true });

        await logUserActivity(user.username, 'login');
        res.status(200).json({ message: 'Login berhasil', token: token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error: ', error });
    }
};

// Logout user
exports.logoutUser = async (req, res) => {
    try {
        res.clearCookie('jwtToken');
        await logUserActivity(req.body.username, 'logout');

        res.status(200).json({ message: 'Logout berhasil' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error: ', error });
    }
};