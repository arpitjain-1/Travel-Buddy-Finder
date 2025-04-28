// models/Otp.js
import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    index: true
  },
  code: {
    type: String,
    required: true
  },
  expiresAt: {
    type: Date,
    default: Date.now,
    index: { expires: '5m' } // Auto-delete after 5 minutes
  }
});

export const Otp = mongoose.model('Otp', otpSchema);