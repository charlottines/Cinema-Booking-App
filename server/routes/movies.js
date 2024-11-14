// server/routes/movies.js

const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie'); // Import the Movie model

// GET /api/movies - Fetch all movies
router.get('/', async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (error) {
    console.error("Error fetching movies:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get movie details by ID
router.get('/:id', async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
        res.json(movie);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
