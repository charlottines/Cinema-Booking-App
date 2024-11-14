<!-- Home.vue -->
<template>
  <div class="home">
    <h1>Now Showing</h1>
    <div class="movie-grid">
      <div v-for="movie in movies" :key="movie._id" class="movie-card" @click="viewMovie(movie._id)">
        <img :src="`https://image.tmdb.org/t/p/w300/${movie.posterPath}`" :alt="movie.title" />
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
    };
  },
  async created() {
    try {
      const response = await axios.get('http://localhost:5000/api/movies');
      this.movies = response.data;
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  },
  methods: {
    viewMovie(id) {
      this.$router.push(`/movie/${id}`);
    },
  },
};
</script>

<style scoped>
.home {
  margin: 0 20%;
  text-align: center;
}

.movie-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.movie-card {
  cursor: pointer;
  background-color: #bbb;
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
  color: #444;
}

.rating {
  color: #ffb400;
  font-weight: bold;
}
</style>
