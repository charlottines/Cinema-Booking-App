const express = require('express');
const router = express.Router();
const Session = require('../models/Session');
const Movie = require('../models/Movie');

// Get all sessions
router.get('/', async (req, res) => {
    const { movieId, date } = req.query;
  
    try {
      // Base query
      const query = {};
  
      if (movieId) query.movie = movieId;
  
      if (date) {
        const startOfDay = new Date(date);
        const endOfDay = new Date(date);
        endOfDay.setDate(endOfDay.getDate() + 1);
        query.dateTime = { $gte: startOfDay, $lt: endOfDay };
      }
  
      const sessions = await Session.find(query).populate('movie');
      res.json(sessions);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
});
  

// Add a new session
router.post('/', async (req, res) => {
  const { room, movie, dateTime } = req.body;

  try {
    const movieDetails = await Movie.findById(movie);
    if (!movieDetails) {
      return res.status(400).json({ error: 'Movie not found' });
    }

    // Check for room availability
    const endTime = new Date(new Date(dateTime).getTime() + movieDetails.runtime * 60000);
    const overlappingSession = await Session.findOne({
      room,
      $or: [
        { dateTime: { $lt: endTime, $gte: dateTime } },
        { endTime: { $gt: dateTime, $lte: endTime } },
      ],
    });

    if (overlappingSession) {
      return res.status(400).json({ error: 'Room is already booked during this time.' });
    }

    const session = new Session({ room, movie, dateTime });
    await session.save();
    res.status(201).json(session);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete expired sessions
router.delete('/expired', async (req, res) => {
  try {
    const result = await Session.deleteMany({ dateTime: { $lt: new Date() } });
    res.json({ message: `${result.deletedCount} expired sessions deleted.` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
