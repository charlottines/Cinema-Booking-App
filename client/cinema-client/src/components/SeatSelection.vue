<!-- SeatSelection.vue -->
<template>
  <div class="seat-selection">
    <h2>Select Your Seats</h2>
    <div class="screen">Screen</div>
    <div class="seats-grid">
      <div
        v-for="(seat, index) in seats"
        :key="index"
        :class="['seat', seat.status]"
        @click="selectSeat(seat)"
        :style="{
          backgroundImage: `url(${getSeatImage(seat.status)})`
        }">
        {{ index + 1 }}
      </div>
    </div>
    <button class="reserve-button" @click="reserveSeats">Reserve Selected Seats</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      seats: Array(200).fill(null).map((_, i) => ({
        id: i + 1,
        status: 'available',
      })),
      selectedSeats: [],
    };
  },
  methods: {
    selectSeat(seat) {
      if (seat.status === 'available') {
        seat.status = 'selected';
        this.selectedSeats.push(seat);
      } else if (seat.status === 'selected') {
        seat.status = 'available';
        this.selectedSeats = this.selectedSeats.filter(s => s.id !== seat.id);
      }
    },
    reserveSeats() {
      alert(`Reserved seats: ${this.selectedSeats.map(s => s.id).join(', ')}`);
      this.selectedSeats.forEach(seat => (seat.status = 'reserved'));
      this.selectedSeats = [];
    },
    getSeatImage(status) {
      switch (status) {
        case 'available':
          return require('@/assets/seat-available.png');
        case 'selected':
          return require('@/assets/seat-selected.png');
        case 'reserved':
          return require('@/assets/seat-reserved.png');
        default:
          return require('@/assets/seat-available.png');
      }
    },
  },
};
</script>

<style scoped>
.seat-selection {
  text-align: center;
}

.screen {
  margin: 1rem auto;
  padding: 0.5rem;
  background-color: #ccc;
  width: 200px;
  text-align: center;
  font-weight: bold;
}

.seats-grid {
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  gap: 0.5rem;
  margin-top: 1rem;
  justify-content: center;
}

.seat {
  width: 50px;
  height: 50px;
  background-size: cover;
  text-align: center;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.reserve-button {
  background-color: #ff4500;
  color: #fff;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: 1rem;
}
</style>
