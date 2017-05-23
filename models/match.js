var mongoose = require('mongoose');

var MatchSchema = mongoose.Schema({
    selector: String,
    selectee: String
});


module.exports = mongoose.model('Match', MatchSchema);
