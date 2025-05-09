// models/trip.js
import mongoose from 'mongoose';

const tripSchema = new mongoose.Schema({
  title: String,
  from: String,
  to: String,
  duration: Number,
  budget: Number,
  date: Date,
  image: String, // optional field
  tags: [String], // new
  description: String,
  travelersNeeded: Number,
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  participants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }]
});

export const Trip = mongoose.models.Trip || mongoose.model('Trip', tripSchema);
