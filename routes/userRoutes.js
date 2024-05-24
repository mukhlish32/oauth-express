const express = require('express');
const user = require('../controllers/userController');
const router = express.Router();

router.get('/dashboard', user.dashboard);

module.exports = router;
