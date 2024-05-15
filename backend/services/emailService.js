import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'naver',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendVerificationEmail = (to, token) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: to,
    subject: 'Email Verification',
    html: `<p>Click <a href="http://localhost:4000/api/verify-email?token=${token}">here</a> to verify your email.</p>`,
  };

  return transporter.sendMail(mailOptions);
};
