import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

// Function to generate a JWT token
export const generateToken = (userId) => {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '1h' });
};

// Function to verify JWT token
export const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;  // In case the token is invalid or expired
  }
};
