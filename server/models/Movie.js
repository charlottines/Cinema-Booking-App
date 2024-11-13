// server/models/Movie.js
const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
    title: String,
    synopsis: String,
    rating: Number,
    comments: [String],
    availableSeats: [Number], // Array of seat numbers
});

module.exports = mongoose.model('Movie', MovieSchema);
