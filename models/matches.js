var mongoose = require('mongoose');

var MatchesSchema = mongoose.Schema({
    selector: String,
    selectee: String,


});

module.exports = mongoose.model('Matches', MatchesSchema);
