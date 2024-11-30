<template>
  <div class="seat-selection">
    <div class="movie-info">
      <h1>{{ movieTitle }}</h1>
      <p class="tagline">{{ movieTagline }}</p>
    </div>

    <div class="screen-section">
      <div class="screen">Screen</div>
    </div>

    <div class="cinema-room">
      <div class="row" v-for="(row, rowIndex) in seats" :key="rowIndex">
        <!-- Left side seats -->
        <div
          class="seat"
          v-for="seat in row.slice(0, row.length / 3)"
          :key="seat.id"
          :class="seat.status"
          @click="selectSeat(seat)"
          :style="{ backgroundImage: `url(${getSeatImage(seat.status)})` }"
        >
          {{ seat.id }}
        </div>

        <!-- Aisle -->
        <div class="aisle"></div>

        <!-- Middle side seats -->
        <div
          class="seat"
          v-for="seat in row.slice(row.length / 3, row.length / 3 * 2)"
          :key="seat.id"
          :class="seat.status"
          @click="selectSeat(seat)"
          :style="{ backgroundImage: `url(${getSeatImage(seat.status)})` }"
        >
          {{ seat.id }}
        </div>

        <!-- Aisle -->
        <div class="aisle"></div>

        <!-- Right side seats -->
        <div
          class="seat"
          v-for="seat in row.slice(row.length / 3 * 2, row.length)"
          :key="seat.id"
          :class="seat.status"
          @click="selectSeat(seat)"
          :style="{ backgroundImage: `url(${getSeatImage(seat.status)})` }"
        >
          {{ seat.id }}
        </div>
      </div>
    </div>

    <div class="reservation-info">
      <p class="info">
        Selected seats: <strong>{{ selectedSeats.map(s => s.id).join(", ") || "None" }}</strong>
      </p>
      <button class="reserve-button" @click="reserveSeats" :disabled="selectedSeats.length === 0">
        Reserve Seats
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: ['sessionId'],
  data() {
    return {
      seats: [],
      selectedSeats: [],
      movieTitle: "",
      movieTagline: "",
      takenSeats: [],
    };
  },
  async created() {
    await this.fetchSessionDetails();
  },
  
  methods: {
    async fetchSessionDetails() {
      try {
        const response = await axios.get(`http://localhost:3000/api/sessions/${this.sessionId}`);
        const { takenSeats, movie, room } = response.data;

        this.movieTitle = movie.title || "Unknown Movie";
        this.movieTagline = movie.tagline || "Enjoy your movie!";
        this.takenSeats = takenSeats || [];

        // Fetch room layout dynamically (you could also include it in the session response)
        const roomLayout = await this.getRoomLayout(room); // e.g., { rows: 10, cols: 20 }
        this.initializeSeats(roomLayout.rows, roomLayout.cols);
      } catch (err) {
        console.error("Failed to fetch session details:", err);
      }
    },

    async getRoomLayout(room) {
      // Mock API or static data for room layouts
      const roomLayouts = {
        1: { rows: 10, cols: 20 },
      };
      return roomLayouts[room] || { rows: 10, cols: 20 }; // Default layout
    },

    async reserveSeats() {
      try {
        const selectedSeatIds = this.selectedSeats.map(s => s.id);
        const response = await axios.post(`http://localhost:3000/api/sessions/${this.sessionId}/reserve`, {
          seats: selectedSeatIds,
        });

        alert(response.data.message || "Seats reserved successfully!");
        
        // Update seat statuses after successful reservation
        this.takenSeats.push(...selectedSeatIds);
        this.selectedSeats.forEach(seat => (seat.status = "reserved"));
        this.selectedSeats = [];
      } catch (err) {
        console.error("Failed to reserve seats:", err.response?.data || err);
        alert(err.response?.data?.error || "Failed to reserve seats. Try again.");
      }
    },

    initializeSeats(rows, cols) {
      const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      this.seats = Array.from({ length: rows }, (_, rowIndex) =>
        Array.from({ length: cols }, (_, colIndex) => {
          const seatId = `${alphabet[rowIndex]}${colIndex + 1}`;
          return {
            id: seatId,
            status: this.takenSeats.includes(seatId) ? "reserved" : "available",
          };
        })
      );
    },

    selectSeat(seat) {
      if (seat.status === "available") {
        seat.status = "selected";
        this.selectedSeats.push(seat);
      } else if (seat.status === "selected") {
        seat.status = "available";
        this.selectedSeats = this.selectedSeats.filter(s => s.id !== seat.id);
      }
    },
    
    getSeatImage(status) {
      switch (status) {
        case "available":
          return require("@/assets/seats/seat-available.png");
        case "selected":
          return require("@/assets/seats/seat-selected.png");
        case "reserved":
          return require("@/assets/seats/seat-reserved.png");
        default:
          return require("@/assets/seats/seat-available.png");
      }
    },
  },
};
</script>

<style scoped>
.seat-selection {
  text-align: center;
  margin: 3rem 10%;
  color: #fff;
}

.movie-info {
  text-align: center;
  margin-bottom: 2rem;
}

.movie-info h1 {
  font-size: 2.5rem;
  color: #ffa500;
  margin-bottom: 0.5rem;
}

.movie-info .tagline {
  font-size: 1.2rem;
  color: #ddd;
}

.screen-section {
  margin-bottom: 2rem;
}

.screen {
  margin: 0 auto;
  padding: 0.5rem;
  background-color: #444;
  color: #fff;
  font-weight: bold;
  border-radius: 8px;
  width: 60%;
  text-align: center;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
}

.cinema-room {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.row {
  display: flex;
  margin-bottom: 0.5rem;
  justify-content: center;
}

.seat {
  width: 60px;
  height: 60px;
  margin: 0.2rem;
  background-size: cover;
  cursor: pointer;
  border-radius: 4px;
  transition: transform 0.2s ease;
}

.seat:hover {
  transform: scale(1.1);
}

.aisle {
  width: 4rem;
}

.reservation-info {
  margin-top: 2rem;
}

.reserve-button {
  background-color: #ffa500;
  color: #fff;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.reserve-button:hover {
  background-color: #ff4500;
  transform: scale(1.05);
}

.reserve-button:disabled {
  background-color: #888;
  cursor: not-allowed;
}
</style>
