
const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');

// GET /api/movies - Fetch all movies
router.get('/', movieController.getAllMovies);

// GET /api/movies/:id - Fetch a single movie by ID
router.get('/:id', movieController.getMovieById);

module.exports = router;
