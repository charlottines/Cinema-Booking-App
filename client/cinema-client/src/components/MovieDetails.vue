<!-- MovieDetails.vue -->
<template>
    <div class="movie-details">
      <img :src="`https://image.tmdb.org/t/p/w500/${movie.posterPath}`" :alt="movie.title" />
      <div class="details">
        <h2>{{ movie.title }}</h2>
        <p>{{ movie.synopsis }}</p>
        <p>Release Date: {{ movie.releaseDate }}</p>
        <button @click="reserve" class="reserve-button">Reserve Tickets</button>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    props: ['id'],
    data() {
      return {
        movie: {},
      };
    },
    async created() {
      try {
        const response = await axios.get(`http://localhost:5000/api/movies/${this.id}`);
        this.movie = response.data;
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    },
    methods: {
      reserve() {
        this.$router.push(`/seat-selection`);
      },
    },
  };
  </script>
  
  <style scoped>
  .movie-details {
    display: flex;
    align-items: flex-start;
    gap: 2rem;
    max-width: 800px;
    margin: auto;
    margin-top: 2rem;
  }
  
  .movie-details img {
    width: 50%;
    border-radius: 8px;
  }
  
  .details {
    flex: 1;
  }
  
  .details h2 {
    font-size: 2rem;
    margin-bottom: 1rem;
  }
  
  .details p {
    font-size: 1rem;
    color: #666;
    margin-bottom: 1rem;
  }
  
  .reserve-button {
    background-color: #ff4500;
    color: #fff;
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .reserve-button:hover {
    background-color: #e63e00;
  }
  </style>
  