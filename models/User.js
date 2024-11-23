const mongoose = require('mongoose');

// Define User Schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true }, // Ensure email is unique
  password: { type: String},
});





// Create User Model
const User = mongoose.model('User', userSchema);

module.exports = User;
