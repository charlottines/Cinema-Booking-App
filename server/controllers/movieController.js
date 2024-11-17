
const Movie = require('../models/Movie');

// Get all movies
const getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    res.status(200).json(movies);
  } catch (error) {
    console.error("Error fetching movies:", error);
    res.status(500).json({ error: 'Failed to fetch movies' });
  }
};

// Get a single movie by ID
const getMovieById = async (req, res) => {
  const { id } = req.params;
  try {
    const movie = await Movie.findById(id);
    if (!movie) return res.status(404).json({ error: 'Movie not found' });
    res.status(200).json(movie);
  } catch (error) {
    console.error("Error fetching movie:", error);
    res.status(500).json({ error: 'Failed to fetch movie' });
  }
};

// Export controller functions
module.exports = {
  getAllMovies,
  getMovieById,
};
