<template>
  <div class="home">
    <h1>Now Showing</h1>
    
    <div class="genre-filter">
      <label for="genre-select">Filter by Genre:</label>
      <select id="genre-select" v-model="selectedGenre" @change="filterMovies">
        <option value="">All</option>
        <option v-for="genre in allGenres" :key="genre" :value="genre">{{ genre }}</option>
      </select>
    </div>
    
    <div class="movie-grid">
      <div v-for="movie in filteredMovies" :key="movie._id" class="movie-card" @click="viewMovie(movie._id)">
        <img :src="`https://image.tmdb.org/t/p/w200/${movie.posterPath}`" :alt="movie.title" />
        <div class="movie-info">
          <h3>{{ movie.title }}</h3>
          <p>{{ movie.synopsis.slice(0, 100) }}...</p>
          <span class="rating">⭐ {{ movie.rating }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      movies: [],
      filteredMovies: [],
      allGenres: [],
      selectedGenre: '',
    };
  },
  async created() {
    try {
      const response = await axios.get('http://localhost:5000/api/movies');
      this.movies = response.data;
      this.filteredMovies = this.movies;
      
      // Extract unique genres from movies
      const genreSet = new Set();
      this.movies.forEach(movie => {
        movie.genres.forEach(genre => genreSet.add(genre));
      });
      this.allGenres = Array.from(genreSet);
      
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  },
  methods: {
    viewMovie(id) {
      this.$router.push(`/movie/${id}`);
    },
    filterMovies() {
      if (this.selectedGenre === '') {
        this.filteredMovies = this.movies;
      } else {
        this.filteredMovies = this.movies.filter(movie => movie.genres.includes(this.selectedGenre));
      }
    },
  },
};
</script>

<style scoped>
.home {
  text-align: center;
}

.genre-filter {
  margin: 1rem 0;
}

.genre-filter label {
  margin-right: 0.5rem;
}

.genre-filter select {
  padding: 0.5rem;
  font-size: 1rem;
}

.movie-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 2rem;
  margin: 1rem 20%;
}

.movie-card {
  cursor: pointer;
  background-color: #ddd;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.movie-card:hover {
  transform: scale(1.05);
  box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.2);
}

.movie-card img {
  width: 100%;
  height: auto;
}

.movie-info {
  padding: 1rem;
}

.movie-info h3 {
  font-size: 1.1rem;
  color: #333;
  margin-bottom: 0.5rem;
}

.movie-info p {
  font-size: 0.9rem;
  color: #555;
}

.rating {
  color: #ffb400;
  font-weight: bold;
}
</style>
