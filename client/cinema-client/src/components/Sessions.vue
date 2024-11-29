<template>
    <div class="sessions">
      <h2>Available Sessions</h2>
      <div class="date-selector">
        <button @click="previousDay" :disabled="isFirstDay">&lt;</button>
        <span>{{ formattedDate }}</span>
        <button @click="nextDay" :disabled="isLastDay">&gt;</button>
      </div>
  
      <div class="sessions-list" v-if="sessions.length > 0">
        <div class="session-box" v-for="session in sortedSessions" :key="session._id">
          <p class="time">{{ formatTime(session.dateTime) }}</p>
          <p class="room">Room {{ session.room }}</p>
          <p class="seats">{{ 200 - session.takenSeats.length }} seats available</p>
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
        required: true,
      },
    },
    data() {
      return {
        currentDayOffset: 0, // Number of days from today
        sessions: [], // Fetched sessions for the selected day
      };
    },
    computed: {
      selectedDate() {
        const date = new Date();
        date.setDate(date.getDate() + this.currentDayOffset);
        return date;
      },
      formattedDate() {
        const options = { weekday: "long", month: "long", day: "numeric" };
        return this.selectedDate.toLocaleDateString(undefined, options);
      },
      isFirstDay() {
        return this.currentDayOffset === 0;
      },
      isLastDay() {
        return this.currentDayOffset === 14;
      },
      sortedSessions() {
        return this.sessions.sort((a, b) => new Date(a.dateTime) - new Date(b.dateTime));
      },
    },
    methods: {
      formatTime(dateTime) {
        const date = new Date(dateTime);
        return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
      },
      async fetchSessions() {
        try {
          const response = await axios.get(`http://localhost:3000/api/sessions`, {
            params: {
              movieId: this.movieId,
              date: this.selectedDate.toISOString().split("T")[0], // Send date in YYYY-MM-DD format
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
          this.fetchSessions();
        }
      },
      previousDay() {
        if (!this.isFirstDay) {
          this.currentDayOffset -= 1;
          this.fetchSessions();
        }
      },
    },
    watch: {
      currentDayOffset() {
        this.fetchSessions();
      },
    },
    mounted() {
      this.fetchSessions();
    },
  };
  </script>
  
  <style scoped>
  .sessions {
    color: #fff;
    background-color: #222;
    padding: 1.5rem;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }
  
  .sessions h2 {
    margin-bottom: 1rem;
    text-align: center;
  }
  
  .date-selector {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 1rem;
  }
  
  .date-selector button {
    background-color: #444;
    color: #fff;
    border: none;
    padding: 0.5rem 1rem;
    font-size: 1rem;
    cursor: pointer;
    border-radius: 4px;
    margin: 0 0.5rem;
  }
  
  .date-selector button:disabled {
    background-color: #333;
    cursor: not-allowed;
  }
  
  .sessions-list {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    justify-content: center;
  }
  
  .session-box {
    background-color: #333;
    padding: 1rem;
    border-radius: 6px;
    text-align: center;
    flex: 1 0 calc(30% - 1rem);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
  
  .session-box p {
    margin: 0.5rem 0;
  }
  
  .time {
    font-weight: bold;
    font-size: 1.2rem;
  }
  
  .seats {
    font-size: 0.9rem;
    color: #aaa;
  }
  
  .no-sessions {
    text-align: center;
    font-size: 1.2rem;
    color: #aaa;
  }
  </style>
  