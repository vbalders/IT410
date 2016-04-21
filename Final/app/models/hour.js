// app/models/hours.js
// load the things we need
var mongoose = require('mongoose');

// Define our beer schema
var hourSchema   = new mongoose.Schema({
  email: String,
  new_date: String,
  type: Number,
  updated_at: { type: Date, default: Date.now }
});

// Export the Mongoose model
module.exports = mongoose.model('Hour', hourSchema);
