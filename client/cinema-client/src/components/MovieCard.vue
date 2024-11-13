<!-- client/src/components/MovieCard.vue -->
<template>
    <div @click="goToDetail">
      <h2>{{ movie.title }}</h2>
      <p>{{ movie.synopsis }}</p>
    </div>
  </template>
  
  <script>
  export default {
    name: 'MovieCard',
    props: ['movie'],
    methods: {
      goToDetail() {
        this.$router.push({ name: 'MovieDetail', params: { id: this.movie._id } });
      },
    },
  };
  </script>
  