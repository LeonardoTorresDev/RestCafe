const nodemailer = require('nodemailer');
const {
    verificationTemplate
} = require('../templates/verificationTemplate');

const emailVerify = async (user) => {

    const contentHTML = await verificationTemplate(user);

    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    let info = await transporter.sendMail({
        from: `"RestCafe" <${process.env.EMAIL}>`, // sender address,
        to: user.email,
        subject: 'Email Authentication',
        html: contentHTML
    });

    console.log('Message sent: %s', info.messageId);
}

module.exports = {
    emailVerify
};