// server/routes/reservations.js
const express = require('express');
const Reservation = require('../models/Reservation');
const router = express.Router();

// Create a new reservation
router.post('/', async (req, res) => {
    const { userId, movieId, seats, foodOrder, totalPrice } = req.body;
    try {
        const reservation = new Reservation({ userId, movieId, seats, foodOrder, totalPrice });
        await reservation.save();
        res.status(201).json(reservation);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
