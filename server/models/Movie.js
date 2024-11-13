// server/models/Movie.js
const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  tmdbId: { type: Number, unique: true }, // Unique identifier from TMDb
  title: String,
  synopsis: String,
  releaseDate: String,
  posterPath: String,
  availableSeats: Number,
});

module.exports = mongoose.model('Movie', movieSchema);
