const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
  room: { type: Number, required: true, min: 1, max: 15 },
  movie: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true },
  dateTime: { type: Date, required: true },
  takenSeats: { type: [String], default: [] }, // Example: ['A1', 'B2']
});

const Session = mongoose.model('Session', sessionSchema);

module.exports = Session;
