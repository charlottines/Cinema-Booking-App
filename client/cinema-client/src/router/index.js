import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue';
import MovieDetail from '../views/MovieDetail.vue';
import Booking from '../views/Booking.vue';

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/movie/:id', name: 'MovieDetail', component: MovieDetail },
  { path: '/booking/:id', name: 'Booking', component: Booking },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
