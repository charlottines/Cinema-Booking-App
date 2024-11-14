<template>
    <div class="movie-card">
      <img :src="`https://image.tmdb.org/t/p/w500/${movie.posterPath}`" :alt="movie.title" />
      <h3>{{ movie.title }}</h3>
      <router-link :to="`/movie/${movie._id}`">View Details</router-link>
    </div>
  </template>
  
  <script>
  export default {
    props: ['movie'],
  };
  </script>
  