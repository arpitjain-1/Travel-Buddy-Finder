import { Trip } from '../models/trip.js';
import { User } from '../models/User.js';

export const getHomePage = async (req, res) => {
  try {
    const user = req.user || { name: 'Guest' };
    const loggedInUserId = user._id ? user._id.toString() : null;

    // Fetch last 3 trips (most recent first) with their creators
    const recentTrips = await Trip.find()
      .sort({ createdAt: -1 })
      .limit(10)
      .populate('createdBy');

    // Use a Map to collect unique user IDs, excluding the logged-in user
    const uniqueUsersMap = new Map();

    for (const trip of recentTrips) {
      const creator = trip.createdBy;
      // Skip if this is the logged-in user or if we already have this user
      if (creator && 
          !uniqueUsersMap.has(creator._id.toString()) && 
          creator._id.toString() !== loggedInUserId) {
        uniqueUsersMap.set(creator._id.toString(), creator);
        if (uniqueUsersMap.size === 3) break;
      }
    }

    const users = Array.from(uniqueUsersMap.values());

    // Fetch trips and prepare data for rendering, excluding trips created by the current user
    const tripDocs = await Trip.find(
      loggedInUserId ? { createdBy: { $ne: loggedInUserId } } : {}
    )
      .limit(6)
      .populate('createdBy', 'name')
      .sort({ createdAt: -1 });

    const activeTrips = tripDocs.map(trip => ({
      title: trip.title || `${trip.from} to ${trip.to}`,
      from: trip.from,
      to: trip.to,
      startDate: trip.startDate?.toDateString() || 'TBD',
      duration: trip.duration,
      budget: `₹${trip.budget}`,
      tags: trip.tags || ["Hiking", "Adventure", "Beach"],
      description: trip.description,
      currentTravelers: trip.participants.length,
      totalTravelers: trip.travelersNeeded
    }));
      

    res.render('pages/home', {
      user,
      users,
      activeTrips,
      recentTrips: [],
      travelStories: [],
      trendingDestinations: [],
      travelBuddies: []
    });

  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};
