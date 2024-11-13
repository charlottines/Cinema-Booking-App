// server/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Routes
const movieRoutes = require('./routes/movies');
const reservationRoutes = require('./routes/reservations');

// Middleware
app.use(cors());
app.use(express.json());
app.use('/api/movies', movieRoutes);
app.use('/api/reservations', reservationRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI).then(() => {
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
