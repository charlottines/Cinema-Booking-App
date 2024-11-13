<!-- client/src/views/MovieDetail.vue -->
<template>
    <div v-if="movie">
      <h1>{{ movie.title }}</h1>
      <p>{{ movie.synopsis }}</p>
      <button @click="reserveSeat">Reserve a Seat</button>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'MovieDetail',
    data() {
      return {
        movie: null,
      };
    },
    async created() {
      const movieId = this.$route.params.id;
      try {
        const response = await axios.get(`http://localhost:5000/api/movies/${movieId}`);
        this.movie = response.data;
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    },
    methods: {
      reserveSeat() {
        this.$router.push({ name: 'Booking', params: { id: this.movie._id } });
      },
    },
  };
  </script>
  