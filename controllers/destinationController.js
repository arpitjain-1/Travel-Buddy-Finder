import {Destination} from "../models/destinationModel.js"; 

export const getDestinationsPage = async (req, res) => {
    try {
        const { region, category, search } = req.query;

        let query = {};

        if (region && region !== 'all') query.region = region;
        if (category && category !== 'all') query.category = category;
        if (search) query.name = { $regex: search, $options: 'i' };

        const destinations = await Destination.find(query).limit(12);

        res.render('pages/destination', {
            destinations,
            selectedRegion: region || 'all',
            selectedCategory: category || 'all',
            searchQuery: search || ''
        });
    } catch (err) {
        console.log(err);
        
        res.status(500).send('Server Error');
    }
};
