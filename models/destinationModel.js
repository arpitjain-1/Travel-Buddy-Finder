import mongoose from 'mongoose';

const destinationSchema = new mongoose.Schema({
    name: String,
    region: String,
    category: String,
    description: String,
    image: String
});

export const Destination = mongoose.model('Destination', destinationSchema);