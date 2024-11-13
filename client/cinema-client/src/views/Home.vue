<!-- client/src/views/Home.vue -->
<template>
    <div>
      <h1>Now Showing</h1>
      <div v-if="movies.length">
        <MovieCard v-for="movie in movies" :key="movie._id" :movie="movie" />
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import MovieCard from '@/components/MovieCard.vue';
  
  export default {
    name: 'Home',
    components: { MovieCard },
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
        console.error('Error fetching movies:', error);
      }
    },
  };
  </script>
  