
import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import MovieList from '../views/MovieList.vue';
import MovieDetails from '../views/MovieDetails.vue';
import FoodOrder from '../components/FoodOrder.vue';
import SeatSelection from '../components/SeatSelection.vue';
import Login from '../components/Login.vue';
import Register from '../components/Register.vue';

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/movies', name: 'MovieList', component: MovieList },
  { path: '/movies/:id', name: 'MovieDetails', component: MovieDetails, props: true },
  { path: '/order-food', name: 'FoodOrder', component: FoodOrder },
  { path: '/reservation/:id', name: 'SeatSelection', component: SeatSelection },
  { path: '/login', name: 'Login', component: Login },
  { path: '/register', name: 'Register', component: Register },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
