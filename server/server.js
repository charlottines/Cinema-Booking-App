
require('dotenv').config(); // Loads environment variables
// Import dependencies
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const axios = require('axios');
const fetchAndSaveMovies = require('./fetchMovies');

// Initialize app and configure port
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware setup
app.use(express.json()); // Parses incoming JSON requests
app.use(cors()); // Enables CORS for cross-origin requests

// Database setup and server Launch
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
    console.log('Connected to MongoDB');
    // Only start the server once MongoDB connection is established and updated
    fetchAndSaveMovies().then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    });
    })
    .catch(error => {
    console.error("MongoDB connection error:", error);
    process.exit(1); // Exit if there's an error in connecting to MongoDB
    });


const movieRoutes = require('./routes/movies');
app.use('/api/movies', movieRoutes);

const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

// Health check endpoint to confirm server is running
app.get('/', (req, res) => {
  res.send('Cinema Booking Server is running.');
});
