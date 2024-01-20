const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
   userId: String,
   username: String,
   userEmail: String,
   password: String,
   joinDate: String,
   lastLogin: String,
   token: String,
});

module.exports = mongoose.model('User', userSchema);