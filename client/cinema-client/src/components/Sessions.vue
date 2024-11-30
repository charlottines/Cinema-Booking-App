<template>
  <div class="sessions">
    <h3>Available Sessions</h3>
    <div class="date-selector">
      <button @click="previousDay" :disabled="isFirstDay">&lt;</button>
      <span>{{ displayDate }}</span>
      <button @click="nextDay" :disabled="isLastDay">&gt;</button>
    </div>

    <div class="sessions-list" v-if="sessions.length > 0">
      <div class="session-box" v-for="session in sortedSessions" :key="session._id" @click="goToSeatSelection(session._id)">
        <p class="time">{{ formatTime(session.dateTime) }}</p>
        <p class="room">Room: {{ session.room }}</p>
        <p class="seats">{{ availableSeats(session.takenSeats.length) }}</p>
      </div>
    </div>

    <p v-else class="no-sessions">No sessions available for this day.</p>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: {
    movieId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      currentDayOffset: 0,
      sessions: [],
    };
  },
  computed: {
    selectedDate() {
      const date = new Date();
      date.setDate(date.getDate() + this.currentDayOffset);
      return date;
    },
    displayDate() {
      const today = new Date();
      const tomorrow = new Date();
      tomorrow.setDate(today.getDate() + 1);

      if (this.selectedDate.toDateString() === today.toDateString()) {
        return "Today";
      } else if (this.selectedDate.toDateString() === tomorrow.toDateString()) {
        return "Tomorrow";
      } else {
        const options = { weekday: "long", month: "long", day: "numeric" };
        return this.selectedDate.toLocaleDateString('en-US', options);
      }
    },
    isFirstDay() {
      return this.currentDayOffset === 0;
    },
    isLastDay() {
      return this.currentDayOffset === 10;
    },
    sortedSessions() {
      return this.sessions.sort((a, b) => new Date(a.dateTime) - new Date(b.dateTime));
    },
  },
  methods: {
    formatTime(dateTime) {
      const date = new Date(dateTime);
      return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: true });
    },
    availableSeats(takenSeats) {
      return `${200 - takenSeats} seats available`;
    },
    async fetchSessions() {
      try {
        const response = await axios.get(`http://localhost:3000/api/sessions`, {
          params: {
            movieId: this.movieId,
            date: this.selectedDate.toISOString().split("T")[0], // YYYY-MM-DD format
          },
        });
        this.sessions = response.data;
      } catch (err) {
        console.error("Failed to fetch sessions:", err);
      }
    },
    nextDay() {
      if (!this.isLastDay) {
        this.currentDayOffset += 1;
      }
    },
    previousDay() {
      if (!this.isFirstDay) {
        this.currentDayOffset -= 1;
      }
    },
    goToSeatSelection(sessionId) {
      this.$router.push({
        name: "SeatSelection",
        params: { sessionId },
      });
    },
  },
  watch: {
    currentDayOffset() {
      this.fetchSessions();
    },
    movieId: {
      immediate: true,
      handler() {
        this.fetchSessions();
      },
    },
  },
  mounted() {
    this.fetchSessions();
  },
};
</script>

<style scoped>
.sessions {
  margin-top: 2rem;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.7);
  padding: 1.5rem;
  border-radius: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
}

.sessions h3 {
  font-size: 1.8rem;
  margin-bottom: 1rem;
  text-align: center;
  color: #ffa500;
}

.date-selector {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1.5rem;
}

.date-selector button {
  background-color: transparent;
  color: #ffa500;
  border: 2px solid #ffa500;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.date-selector button:hover {
  background-color: #ffa500;
  color: #000;
  transform: scale(1.05);
}

.date-selector button:disabled {
  background-color: rgba(255, 165, 0, 0.3);
  border: 2px solid rgba(255, 165, 0, 0.3);
  color: #555;
  cursor: not-allowed;
}

.date-selector span {
  margin: 0 1rem;
  font-size: 1.2rem;
  font-weight: bold;
  color: #fff;
}

.sessions-list {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
}

.session-box {
  background-color: rgba(255, 255, 255, 0.1);
  padding: 1rem;
  border-radius: 12px;
  text-align: center;
  width: calc(33% - 1rem);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
  transition: transform 0.3s ease;
}

.session-box:hover {
  transform: scale(1.05);
}

.session-box p {
  margin: 0.5rem 0;
  color: #ddd;
}

.session-box .time {
  font-size: 1.2rem;
  font-weight: bold;
  color: #ffa500;
}

.session-box .room {
  font-size: 1rem;
  font-style: italic;
}

.no-sessions {
  text-align: center;
  font-size: 1.2rem;
  color: #aaa;
}
</style>
