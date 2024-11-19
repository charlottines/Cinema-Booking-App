
const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  tmdbId: { type: Number, unique: true }, // Unique identifier from TMDb
  title: String,
  genres: [{ id: Number, name: String }],
  tagline: String,
  synopsis: String,
  releaseDate: String,
  posterPath: String,
  backdropPath: String,
  trailerKey: String,
  runtime: Number,
  rating: Number,
});

module.exports = mongoose.model('Movie', movieSchema);
