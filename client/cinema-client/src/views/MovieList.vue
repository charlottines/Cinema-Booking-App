<template>
  <div class="all-movies">
    <h1>Now Showing</h1>
    
    <div class="genre-filter">
      <label for="genre-select">Filter by Genre:</label>
      <select id="genre-select" v-model="selectedGenre" @change="filterMovies">
        <option value="">All</option>
        <option v-for="genre in allGenres" :key="genre" :value="genre">{{ genre }}</option>
      </select>
    </div>
    
    <div class="movie-grid">
      <MovieCard v-for="movie in filteredMovies" :key="movie._id" :movie="movie"/>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import MovieCard from '@/components/MovieCard.vue';

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
  components: {
    MovieCard,
  },
  methods: {
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
.all-movies {
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
</style>
  