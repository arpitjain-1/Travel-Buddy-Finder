// models/BuddySearch.js
import mongoose from 'mongoose';

const buddySearchSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  destination: { type: String, required: true },
  travelDate: { type: Date, required: true },
  message: { type: String },
  createdAt: { type: Date, default: Date.now }
});

export const BuddySearch = mongoose.model('BuddySearch', buddySearchSchema);
