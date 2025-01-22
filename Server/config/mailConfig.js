const Nodemailer = require("nodemailer");

const transporter = Nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
    }
})


module.exports = transporter;