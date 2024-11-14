<template>
  <div>
    <h1>{{ movie.title }}</h1>
    <p>{{ movie.synopsis }}</p>
    <button @click="reserve">Make a Reservation</button>
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
      this.$router.push(`/reservation/${this.movie._id}`);
    },
  },
};
</script>
