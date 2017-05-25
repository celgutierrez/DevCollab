
var mongoose = require('mongoose');

var StalkersUsersSchema = mongoose.Schema({
  userId: String,
  stalkerId: String
});

module.exports = mongoose.model('StalkersUsers', StalkersUsersSchema);
