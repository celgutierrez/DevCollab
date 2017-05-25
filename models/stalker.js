var mongoose = require('mongoose');

var StalkerSchema = new mongoose.Schema({
  name: String,
  title: String,
  description: String,
  avatar: String,
  portfolioUrl: String,
  image: String
});

module.exports = mongoose.model('Stalker', StalkerSchema);
