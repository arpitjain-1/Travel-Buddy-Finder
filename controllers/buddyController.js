import { BuddySearch } from '../models/buddySearch.js';
import { Trip } from '../models/trip.js';

export const showFindBuddyPage = async (req, res) => {
  try {
    const { destination, date } = req.query;

    const query = {};

    if (destination && typeof destination === 'string' && destination.trim() !== '') {
      query.to = { $regex: new RegExp(destination, 'i') };
    }

    if (date && !isNaN(Date.parse(date))) {
      query.date = new Date(date);
    }

    // Find all trips to the destination
    const trips = await Trip.find(query)
      .populate('createdBy', 'firstName lastName email location')
      .exec();

    res.render('pages/findBuddy', {
      trips,
      searchQuery: destination || '',
      searchDate: date || ''
    });

  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

export const createBuddySearch = async (req, res) => {
  try {
    const { destination, travelDate, message } = req.body;

    // Look for an existing trip that matches the destination and date
    const existingTrip = await Trip.findOne({ from: destination, date: travelDate });

    let tripId = null;
    if (existingTrip) {
      // If a matching trip exists, associate it with the buddy search
      tripId = existingTrip._id;
    }

    const newSearch = new BuddySearch({
      userId: req.user._id,
      destination,
      travelDate,
      message,
      tripId  // Link the trip if found
    });

    await newSearch.save();
    res.redirect('/find-buddy');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error creating buddy search');
  }
};

export const createTrip = async (req, res) => {
  try {
    const { from, to, budget, date, duration, description, travelersNeeded } = req.body;
    console.log(req.body);  // Still useful for debugging

    const userId = req.user._id;
    console.log(userId);  // Log the user ID for debugging

    // Validate required fields
    if (!from || !to || !budget || !date || !duration) {
      return res.status(400).send('All required fields must be filled.');
    }

    const newTrip = new Trip({
      from,
      to,
      budget,
      date,
      duration, // ✅ Include in the trip
      description,
      createdBy: userId,
      travelersNeeded,
      participants: []
    });

    await newTrip.save();
    res.redirect('/find-buddy');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error creating trip');
  }
};

