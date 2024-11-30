<template>
  <div class="seat-selection">
    <h1>Select Your Seats</h1>
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
      seats: Array(300).fill(null).map((_, i) => ({
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
          return require('@/assets/seats/seat-available.png');
        case 'selected':
          return require('@/assets/seats/seat-selected.png');
        case 'reserved':
          return require('@/assets/seats/seat-reserved.png');
        default:
          return require('@/assets/seats/seat-available.png');
      }
    },
  },
};
</script>

<style scoped>
.seat-selection {
  text-align: center;
  margin: 5rem 10%;
}

.screen {
  margin: 5rem auto;
  padding: 0.5rem;
  color: #333;
  background-color: #ccc;
  width: 70%;
  text-align: center;
  font-weight: bold;
}

.seats-grid {
  display: grid;
  grid-template-columns: repeat(25, 1fr);
  gap: 0.5rem;
  margin: 5rem 0;
  justify-content: center;
}

.seat {
  min-width: 50px;
  min-height: 50px;
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
