import { Trip } from '../models/trip.js';
import { User } from '../models/User.js';

// Controller to handle joining a trip
export const joinTrip = async (req, res) => {
  try {
    const userId = req.user._id; // Authenticated user
    const tripId = req.params.tripId; // Trip ID from route param

    const trip = await Trip.findById(tripId);
    if (!trip) return res.status(404).send('Trip not found');

    if (trip.participants.includes(userId)) {
      return res.status(400).send('You already joined this trip');
    }

    trip.participants.push(userId);
    trip.currentTravelers = trip.participants.length;
    await trip.save();

    res.status(200).send({ message: 'Successfully joined the trip', trip });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};
