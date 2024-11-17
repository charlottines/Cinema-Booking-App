
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String, // Simple for now, but could be encrypted in a real app
});

module.exports = mongoose.model('User', UserSchema);
