const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const hasAuth = require('./middlewares/auth');
const authRoutes = require('./routes/authRoutes');
const oauthRoutes = require('./routes/oauthRoutes');
const userRoutes = require('./routes/userRoutes');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

require('./config/passport');

// Middleware
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
app.use(passport.initialize());

// Connect to MongoDB
mongoose.connect(process.env.DB_SETTING);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Database error:'));
db.once('open', () => {
    console.log('Connected to database');
});

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/oauth', oauthRoutes);
app.use('/api/users', hasAuth, userRoutes);

// Test route handler for the root URL ("/")
app.get('/', (req, res) => {
    res.send('API is running!');
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
