// server/server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Routes
const fetchAndSaveMovies = require('./fetchMovies');
const movieRoutes = require('./routes/movies');
const reservationRoutes = require('./routes/reservations');


// Call this function to fetch movies on server start
fetchAndSaveMovies().then(() => {
    console.log("Initial movie fetch complete.");
  }).catch((err) => {
    console.error("Error during initial movie fetch:", err);
  });

// Middleware
app.use(cors());
app.use(express.json());
app.use('/api/movies', movieRoutes);
app.use('/api/reservations', reservationRoutes);

// MongoDB Connection
console.log('MongoDB URI:', process.env.MONGODB_URI);
mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Error connecting to MongoDB:', err);
});

// Routes
app.get('/', (req, res) => {
    res.send('Cinema Booking API');
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
