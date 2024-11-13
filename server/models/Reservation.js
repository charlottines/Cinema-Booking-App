// server/models/Reservation.js
const mongoose = require('mongoose');

const ReservationSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    movieId: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie' },
    seats: [Number],
    foodOrder: {
        popcorn: Number,
        iceCream: Number,
    },
    totalPrice: Number,
    reservationDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Reservation', ReservationSchema);
