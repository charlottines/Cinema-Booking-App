
require('dotenv').config();
const axios = require('axios');
const mongoose = require('mongoose');
const Movie = require('./models/Movie');
const RequestLog = require('./models/RequestLog');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI);

const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TMDB_API_URL = 'https://api.themoviedb.org/3/movie/now_playing';
const TMDB_API_GENRES = 'https://api.themoviedb.org/3/genre/movie/list';


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

    const response = await axios.get(TMDB_API_URL, {
      params: {
        api_key: TMDB_API_KEY,
      },
    });
    const genresResponse = await axios.get(TMDB_API_GENRES, {
      params: {
        api_key: TMDB_API_KEY,
      },});

    const movies = response.data.results;

    for (const movie of movies) {
      const existingMovie = await Movie.findOne({ tmdbId: movie.id });

      if (!existingMovie) {
        const newMovie = new Movie({
          tmdbId: movie.id,
          title: movie.title,
          genres: movie.genre_ids.map(
            id => genresResponse.data.genres.find(
              genre => genre.id === id).name),
          tagline: movie.tagline,
          synopsis: movie.overview,
          releaseDate: movie.release_date,
          posterPath: movie.poster_path,
          backdropPath: movie.backdrop_path,
          runtime: movie.runtime,  // doesn't work yet
          rating: movie.vote_average,
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

// Export the function so it can be used in other files
module.exports = fetchAndSaveMovies;
