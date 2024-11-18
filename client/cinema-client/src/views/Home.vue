<template>
  <div class="home">
    <MovieCarousel />

    <div class="genres-section">
      <div class="genre-row" v-for="(genre, index) in genres" :key="index">
        <h2 class="genre-title">{{ genre.name }}</h2>
        <div class="genre-movies-container">
          <button class="scroll-button prev" @click="scrollLeft(index)">&#10094;</button>

          <div class="movies-list" :ref="'moviesList' + index">
            
            <img v-for="movie in genre.movies" 
              :src="`https://image.tmdb.org/t/p/w300/${movie.posterPath}`" :alt="movie.title" 
              :class="['movie-card']" :key="movie._id"
              @click="viewMovie(movie._id)">
          </div>

          <button class="scroll-button next" @click="scrollRight(index)">&#10095;</button>
        </div>
      </div>
    </div>
    <div class="all-movies-button-container">
      <router-link to="/movies" class="all-movies-button">See More</router-link>
    </div>

    <div class="date-navigation">
      <button class="nav-button" @click="prevDate" :disabled="isAtStart">&#10094;</button>
      <div class="dates-container">
        <span
          v-for="(date, index) in visibleDates"
          :key="index"
          :class="{ active: selectedDate === date.dateString }"
          class="date"
          @click="selectDate(date.dateString)"
        >
          {{ date.label }}
        </span>
      </div>
      <button class="nav-button" @click="nextDate" :disabled="isAtEnd">&#10095;</button>
    </div>

  </div>
</template>

<script>
import axios from "axios";
import MovieCarousel from "@/components/MovieCarousel.vue";
import MovieCard from "@/components/MovieCard.vue";

export default {
  name: "Home",
  components: {
    MovieCarousel,
    MovieCard,
  },
  data() {
    const today = new Date();
    const dateOptions = { weekday: "long", day: "numeric", month: "long" };

    // Generate the next 14 days including today
    const allDates = Array.from({ length: 14 }, (_, i) => {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      return {
        dateString: date.toISOString().split("T")[0],
        label: i === 0 ? "Today" : date.toLocaleDateString("en-US", dateOptions),
      };
    });

    return {
      genres: [
        { id: 878, name: "Science Fiction", movies: [] },
        { id: 10749, name: "Romance", movies: [] },
        { id: 27, name: "Horror", movies: [] },
      ],

      allDates, // Full list of dates
      currentStartIndex: 0, // Index of the first visible date
      selectedDate: allDates[0].dateString, // Currently selected date
    };
  },
  async created() {
    try {
      const response = await axios.get("http://localhost:5000/api/movies");
      const movies = response.data;

      this.genres.forEach((genre) => {
        genre.movies = movies.filter((movie) => movie.genres.includes(genre.name));
      });

      //console.log(this.genres);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  },
  computed: {
    visibleDates() {
      // Return only 3 days starting from the currentStartIndex
      return this.allDates.slice(this.currentStartIndex, this.currentStartIndex + 3);
    },
    isAtStart() {
      return this.currentStartIndex === 0;
    },
    isAtEnd() {
      return this.currentStartIndex + 3 >= this.allDates.length;
    },
  },
  methods: {
    scrollLeft(index) {
      const list = this.$refs[`moviesList${index}`][0]; 
      if (list) {
        list.scrollBy({
          left: -300, // Adjust the scroll distance
          behavior: "smooth", // Enable smooth scrolling
        });
      }
    },
    scrollRight(index) {
      const list = this.$refs[`moviesList${index}`][0];
      if (list) {
        list.scrollBy({
          left: 300, // Adjust the scroll distance
          behavior: "smooth", // Enable smooth scrolling
        });
      }
    },
    prevDate() {
      if (!this.isAtStart) {
        this.currentStartIndex--;
      }
    },
    nextDate() {
      if (!this.isAtEnd) {
        this.currentStartIndex++;
      }
    },
    selectDate(dateString) {
      this.selectedDate = dateString;
      console.log(`Selected date: ${dateString}`);
      // Optionally, filter movies based on the selected date
    },
    viewMovie(id) {
      this.$router.push(`/movies/${id}`);
    },
  },
};
</script>

<style scoped>
.home {
  width: 100%;
  margin: 0 auto;
  color: white;
}

.genres-section {
  margin: 5rem 20%;
}

.genre-row {
  margin-bottom: 30px;
}

.genre-title {
  font-size: 1.8rem;
  margin-bottom: 10px;
  margin-left: 20px;
  color: #f90;
}

.genre-movies-container {
  position: relative;
  display: flex;
  align-items: center;
}

.movies-list {
  display: flex;
  overflow-x: auto;
  gap: 2rem;
  padding: 50px;
  scrollbar-width: none; /* Hides scrollbar in Firefox */
  scroll-behavior: smooth;
  transition: transform 2s ease-in-out; /* Smooth scrolling animation */
}

.movies-list::-webkit-scrollbar {
  display: none; /* Hides scrollbar in Chrome/Safari */
}

.movie-card {
  width: 300px;
  flex-shrink: 0;
  text-align: center;
  cursor: pointer;
  border-radius: 5%;
  transition: transform 0.2s ease;
}

.movie-card:hover {
  transform: scale(1.05);
}

.movie-card img {
  width: 100%;
  border-radius: 10px;
}

.scroll-button {
  background-color: rgba(0, 0, 0, 0.6);
  color: #f90;
  border: none;
  padding: 10px;
  cursor: pointer;
  display: flex;
  position: absolute;
  z-index: 2;
  font-size: 2rem;
  border-radius: 50%;
  align-items: center;
  justify-content: center;
  top: 50%;
  transform: translateY(-50%);
}

.scroll-button.prev {
  left: 10px;
}

.scroll-button.next {
  right: 10px;
}
.genre-movies-container:hover .scroll-button {
  transition: opacity 0.3s ease-in;
  opacity: 1;
}

.scroll-button {
  transition: opacity 0.3s ease-out;
  opacity: 0;
}

.all-movies-button-container {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.all-movies-button {
  background-color: #f70;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 1.2rem;
  text-decoration: none;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.all-movies-button:hover {
  background-color: #f50;
}

.date-navigation {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px 0;
}

.nav-button {
  background-color: rgba(0, 0, 0, 0.7); /* Dark semi-transparent background */
  color: white;
  border: none;
  padding: 10px;
  font-size: 1.5rem;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.nav-button:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

.nav-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.dates-container {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  padding: 0 20px;
}

.date {
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.7);
  cursor: pointer;
  transition: color 0.3s ease;
}

.date:hover {
  color: white;
}

.date.active {
  font-weight: bold;
  color: white;
  text-decoration: underline;
}
</style>
