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
      <router-link to="/movies" class="all-movies-button">View All Movies</router-link>
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
    return {
      genres: [
        { id: 878, name: "Science Fiction", movies: [] },
        { id: 10749, name: "Romance", movies: [] },
        { id: 27, name: "Horror", movies: [] },
      ],
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
}

.genre-movies-container {
  position: relative;
  display: flex;
  align-items: center;
}

.movies-list {
  display: flex;
  overflow-x: auto;
  gap: 15px;
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
  background-color: #f39c12;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 1.2rem;
  text-decoration: none;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.all-movies-button:hover {
  background-color: #d35400;
}
</style>
