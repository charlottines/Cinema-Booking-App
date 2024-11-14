<template>
    <div>
      <h1>Reservation for {{ movie.title }}</h1>
      <SeatSelection />
      <FoodOrder />
      <button @click="completeReservation">Complete Reservation</button>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import SeatSelection from '../components/SeatSelection.vue';
  import FoodOrder from '../components/FoodOrder.vue';
  
  export default {
    props: ['id'],
    components: { SeatSelection, FoodOrder },
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
      completeReservation() {
        // Logic to handle reservation completion
        alert("Reservation complete!");
        this.$router.push('/');
      },
    },
  };
  </script>
  