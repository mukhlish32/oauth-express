const nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    host: process.env.MAILTRAP_HOST,
    port: 2525,
    auth: {
        user: process.env.MAILTRAP_USER,
        pass: process.env.MAILTRAP_PASS,
    },
});

const sendVerificationEmail = (email, code) => {
    const mailOptions = {
        from: 'no-reply@example.com',
        to: email,
        subject: 'Email Verification',
        text: `Kode verifikasi anda adalah ${code}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
    });
};

module.exports = { sendVerificationEmail };
