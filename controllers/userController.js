import { User } from "../models/User.js";
import { Otp } from "../models/Otp.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { sendOTP } from "../utils/emailService.js";

const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString(); // make OTP always string

export const requestOTP = async (req, res) => {
  const { email } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: "Email already registered" });
    }

    const otp = generateOTP();
    await Otp.findOneAndUpdate(
      { email },
      { email, code: otp, expiresAt: Date.now() + 10 * 60 * 1000 },
      { upsert: true, new: true }
    );

    await sendOTP(email, otp);
    res.status(200).json({ message: "OTP sent to email" });
  } catch (error) {
    console.error("OTP Error:", error);
    res.status(500).json({ error: "Error processing OTP request" });
  }
};

export const handleUserSignup = async (req, res) => {
  const { email, password, otp, firstName, lastName, birthdate, location, interests } = req.body;

  try {
    const storedOtp = await Otp.findOne({ email });

    if (!storedOtp) {
      return res.status(400).json({ error: "No OTP requested for this email" });
    }

    if (storedOtp.expiresAt < Date.now()) {
      await Otp.deleteOne({ email });
      return res.status(400).json({ error: "OTP expired" });
    }

    if (storedOtp.code !== otp.toString()) { // Compare as strings
      return res.status(400).json({ error: "Invalid OTP" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: "Email already registered" });
    }

    const user = await User.create({
      email,
      password,
      firstName,
      lastName,
      birthdate: new Date(birthdate),
      location,
      interests,
      verified: true,
    });

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    await Otp.deleteOne({ email });

    res.status(200).json({
      message: "Signup successful",
      token, // Send the token so the frontend can store it
    });
  } catch (error) {
    console.error("Signup Error:", error.message);
    res.status(500).json({ error: "Server error during signup" });
  }
};

export const handleUserLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.render('pages/Login', { error: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.render('pages/Login', { error: 'Invalid credentials' });
    }

    // Login successful, handle JWT or session logic here
    const token = jwt.sign({ id: user._id },  process.env.JWT_SECRET, { expiresIn: '1h' });
    res.cookie('token', token, {
      httpOnly: true,  // For security (prevents client-side access)
      secure: process.env.NODE_ENV === 'production',  // Set to true if using HTTPS
      maxAge: 3600000,  // Token expires in 1 hour
    });
    res.status(200).json({ message: 'Login successful', token });
  } catch (err) {
    console.error('Login Error:', err);
    res.render('pages/Login', { error: 'Something went wrong, please try again' });
  }
};

export const handleUserAccountData = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({ message: "User Found", user });
  } catch (error) {
    console.error("Account Data Error:", error);
    res.status(500).send("Server Error Occurred");
  }
};

export const handleLogout = async (req, res) => {
  try {
    res.clearCookie('token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });
    res.redirect('/login');
  } catch (error) {
    console.error('Logout Error:', error);
    res.status(500).json({ error: 'Server error during logout' });
  }
};
