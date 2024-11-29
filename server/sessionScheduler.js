const Session = require('./models/Session');
const Movie = require('./models/Movie');

const scheduleSessions = async () => {
  try {
    const movies = await Movie.find();
    if (movies.length === 0) {
      console.log('No movies available for scheduling.');
      return;
    }

    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 14);

    for (let day = 0; day < 14; day++) {
      const date = new Date();
      date.setDate(startDate.getDate() + day);

      for (let room = 1; room <= 15; room++) {
        let availableTime = new Date(date.setHours(9, 0, 0, 0)); // Start scheduling at 9 AM
        const endTime = new Date(date.setHours(23, 0, 0, 0)); // Last session ends at 11 PM

        while (availableTime < endTime) {
          const randomMovie = movies[Math.floor(Math.random() * movies.length)];
          const sessionEnd = new Date(
            availableTime.getTime() + randomMovie.runtime * 60000
          );

          if (sessionEnd > endTime) break;

          const overlappingSession = await Session.findOne({
            room,
            $or: [
              { dateTime: { $lt: sessionEnd, $gte: availableTime } },
              { endTime: { $gt: availableTime, $lte: sessionEnd } },
            ],
          });

          if (!overlappingSession) {
            await Session.create({
              room,
              movie: randomMovie._id,
              dateTime: availableTime,
            });
          }

          availableTime = sessionEnd; // Move to the next time slot
        }
      }
    }
  } catch (err) {
    console.error('Error scheduling sessions:', err.message);
  }
};

const removeExpiredSessions = async () => {
  try {
    const result = await Session.deleteMany({ dateTime: { $lt: new Date() } });
    console.log(`${result.deletedCount} expired sessions deleted.`);
  } catch (err) {
    console.error('Error removing expired sessions:', err.message);
  }
};

module.exports = { scheduleSessions, removeExpiredSessions };
