// controllers/dashboardController.js
import { Trip } from '../models/trip.js';

export const showDashboard = async (req, res) => {
  try {
    const userId = req.user._id;

    // Query trips created by the user
    const createdTrips = await Trip.find({ createdBy: userId })
      .populate('participants', 'firstName lastName email')
      .exec();

    // Query trips the user is participating in
    const joinedTrips = await Trip.find({ 
      participants: userId,
      createdBy: { $ne: userId } // Exclude trips created by the user
    })
      .populate('createdBy', 'firstName lastName email')
      .populate('participants', 'firstName lastName email')
      .exec();

    // Get incoming trip requests (for trips created by the user)
    const incomingRequests = await TripRequest.find({
      tripOwner: userId,
      status: 'pending'
    })
    .populate('trip', 'title from to date')
    .populate('requester', 'firstName lastName email')
    .sort({ createdAt: -1 })
    .exec();

    // Get outgoing trip requests (requests made by the user)
    const outgoingRequests = await TripRequest.find({
      requester: userId
    })
    .populate('trip', 'title from to date')
    .populate('tripOwner', 'firstName lastName email')
    .sort({ createdAt: -1 })
    .exec();

    // Count the number of participants per trip (created and joined)
    const updatedCreatedTrips = createdTrips.map(trip => ({
      ...trip.toObject(),
      participantCount: trip.participants.length,
    }));

    const updatedJoinedTrips = joinedTrips.map(trip => ({
      ...trip.toObject(),
      participantCount: trip.participants.length,
    }));

    // Combine both created and joined trips into a single array
    const allTrips = [...updatedCreatedTrips, ...updatedJoinedTrips];

    // Render the dashboard with trips data and requests
    res.render('pages/dashboard', {
      createdTrips: updatedCreatedTrips,
      joinedTrips: updatedJoinedTrips,
      allTrips,
      incomingRequests,
      outgoingRequests,
      user: req.user,
    });
  } catch (error) {
    console.error("Error fetching dashboard data: ", error);
    res.status(500).send("Server Error");
  }
};