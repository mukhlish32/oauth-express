const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        maxLength: 30,
        minLength: 2,
        unique: true
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        match: /.+\@.+\..+/
    },
    password: {
        type: String,
        required: true
    },
    nama: {
        type: String,
        required: true
    },
    alamat: {
        type: String,
        trim: true,
        maxlength: 100
    },
    telp: {
        type: String,
        trim: true,
        match: /^\d{10,15}$/
    },
    verified: {
        type: Boolean,
        default: false
    },
    verificationCode: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    verifiedAt: {
        type: Date
    }
});

const User = mongoose.model('users', userSchema);

module.exports = User;
