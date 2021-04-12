const nodemailer=require('nodemailer');
const {generateJWT}=require('../helpers/helpers');

const emailVerify=async(user)=>{

    const token=await generateJWT(user._id,process.env.VERIFY_KEY,process.env.VERIFY_EXPIRATION_DATE);

    const contentHTML=`
        <h1>Hello, ${user.name}</h1>
        <p>
            Thanks to join our cafe here, but you still need
            to auth your email, paste this token on verifcation.
        </p>
        <h2>Verification Token</h2>
        <p>${token}</p>
        <small>Token valid for one hour</small>
        <small>AB SOFTWARE 2020</small>
    `
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
        from: `"RESTServer Cafe" <${process.env.EMAIL}>`, // sender address,
        to: user.email,
        subject: 'Email Authentication',
        html: contentHTML
    });

    console.log('Message sent: %s', info.messageId);

}

module.exports={emailVerify};