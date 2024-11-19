
require('dotenv').config();
const axios = require('axios');
const mongoose = require('mongoose');
const Movie = require('./models/Movie');
const RequestLog = require('./models/RequestLog');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI);

const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TMDB_API_URL = 'https://api.themoviedb.org/3/movie/';


async function fetchAndSaveMovies() {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalize to midnight for date comparison

    let log = await RequestLog.findOne({ name: 'dailyMovieFetch' });

    if (!log) {
      log = new RequestLog({ name: 'dailyMovieFetch', lastRequestDate: new Date(0) });
      await log.save();
    }

    if (log.lastRequestDate >= today) {
      console.log('Database already up to date. Launching server...');
      return;
    }

    // searching for recent movies
    const response = await axios.get(`${TMDB_API_URL}now_playing`, {
      params: {
        api_key: TMDB_API_KEY,
      },
    });

    const movies = response.data.results;

    for (const movie of movies) {
      const existingMovie = await Movie.findOne({ tmdbId: movie.id });

      if (!existingMovie) {

        // get more details about the movie
        const movieDetailsResponse = await axios.get(`${TMDB_API_URL}${movie.id}`, {
          params: {
            api_key: TMDB_API_KEY,
          },
        });
        // get the trailer youtube key
        const movieVideosResponse = await axios.get(`${TMDB_API_URL}${movie.id}/videos`, {
          params: {
            api_key: TMDB_API_KEY,
          },
        });

        const movieDetails = movieDetailsResponse.data;
        const movieVideos = movieVideosResponse.data.results;

        const newMovie = new Movie({
          tmdbId: movieDetails.id,
          title: movieDetails.title,
          genres: movieDetails.genres,
          tagline: movieDetails.tagline,
          synopsis: movieDetails.overview,
          releaseDate: movieDetails.release_date,
          posterPath: movieDetails.poster_path,
          backdropPath: movieDetails.backdrop_path,
          trailerKey: movieVideos.find(video => video.type === 'Trailer' && video.official === true)?.key,
          runtime: movieDetails.runtime,
          rating: movieDetails.vote_average,
        });
        await newMovie.save();
        console.log(`Saved new movie: ${movie.title}`);
      } else {
        console.log(`Movie already exists: ${movie.title}`);
      }
    }

    log.lastRequestDate = today;
    await log.save();
    console.log('Movie data fetched and saved successfully.');

  } catch (error) {
    console.error('Error fetching movies:', error);
  }
}

module.exports = fetchAndSaveMovies;
