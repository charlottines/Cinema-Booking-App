<!-- client/src/views/Booking.vue -->
<template>
    <div>
      <h1>Book Your Seat for {{ movie.title }}</h1>
      <div>
        <h2>Available Seats</h2>
        <div v-for="seat in movie.availableSeats" :key="seat" @click="selectSeat(seat)">
          <button :class="{ selected: selectedSeats.includes(seat) }">{{ seat }}</button>
        </div>
      </div>
  
      <div>
        <h2>Food Order</h2>
        <label>Popcorn:</label>
        <input type="number" v-model="foodOrder.popcorn" min="0" />
        <label>Ice Cream:</label>
        <input type="number" v-model="foodOrder.iceCream" min="0" />
      </div>
  
      <button @click="confirmBooking">Confirm Booking</button>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        movie: null,
        selectedSeats: [],
        foodOrder: { popcorn: 0, iceCream: 0 },
      };
    },
    async created() {
      const movieId = this.$route.params.id;
      const response = await axios.get(`http://localhost:5000/api/movies/${movieId}`);
      this.movie = response.data;
    },
    methods: {
      selectSeat(seat) {
        if (!this.selectedSeats.includes(seat)) {
          this.selectedSeats.push(seat);
        } else {
          this.selectedSeats = this.selectedSeats.filter(s => s !== seat);
        }
      },
      async confirmBooking() {
        try {
          const userId = 'placeholder-user-id'; // Replace with actual user ID
          const response = await axios.post('http://localhost:5000/api/reservations', {
            userId,
            movieId: this.movie._id,
            seats: this.selectedSeats,
            foodOrder: this.foodOrder,
            totalPrice: this.calculateTotalPrice(),
          });
          alert('Booking confirmed!');
        } catch (error) {
          console.error('Error creating reservation:', error);
        }
      },
      calculateTotalPrice() {
        return this.selectedSeats.length * 10 + this.foodOrder.popcorn * 5 + this.foodOrder.iceCream * 4;
      },
    },
  };
  </script>
  