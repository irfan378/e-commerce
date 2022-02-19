const nodemailer = require('nodemailer');
const { options } = require('nodemon/lib/config');

const sendEmail = async (options) => {
    const transporter = nodemailer.createTransport({
        service: process.env.SMPT_SERVICE,
        auth: {
            user: process.env.SMPT_MAIL,
            pass: process.env.SMPT_PASSWORD
        },
    });
    const mailOptions = {
        from: process.env.SMPT_MAIL,
        to: options.email,
        subject: options.subject,
        text: options.text
    };
    await transporter.sendMail(mailOptions);
}
module.exports = sendEmail;