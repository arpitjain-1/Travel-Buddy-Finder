import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// Create reusable transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

/**
 * Send OTP to user's email
 * @param {string} email - Recipient email address
 * @param {number|string} otp - One-time password to send
 * @return {Promise} - Resolves when email is sent
 */
export const sendOTP = async (email, otp) => {
  // Email template
  const mailOptions = {
    from: `"Travel Buddy Finder" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Verify Your Travel Buddy Account',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
        <div style="text-align: center; margin-bottom: 20px;">
          <h1 style="color: #4a6ce9;">Travel Buddy Finder</h1>
        </div>
        <div style="padding: 20px; background-color: #f9f9f9; border-radius: 5px;">
          <h2 style="margin-top: 0;">Verify Your Email</h2>
          <p>Thank you for registering with Travel Buddy Finder. To complete your registration, please use the verification code below:</p>
          <div style="text-align: center; margin: 30px 0;">
            <div style="font-size: 24px; font-weight: bold; letter-spacing: 8px; padding: 15px; background-color: #4a6ce9; color: white; border-radius: 5px;">
              ${otp}
            </div>
          </div>
          <p>This code will expire in 10 minutes for security reasons.</p>
          <p>If you didn't request this code, please ignore this email.</p>
        </div>
        <div style="text-align: center; margin-top: 20px; color: #888; font-size: 12px;">
          <p>&copy; 2025 Travel Buddy Finder. All rights reserved.</p>
        </div>
      </div>
    `
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: %s', info.messageId);
    return info;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};