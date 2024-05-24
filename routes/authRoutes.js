const express = require('express');
const auth = require('../controllers/authController');
const router = express.Router();

router.post('/register', auth.registerUser);
router.post('/verify/email', auth.verifyEmail);
router.post('/login', auth.loginUser);
router.post('/logout', auth.logoutUser);

module.exports = router;
