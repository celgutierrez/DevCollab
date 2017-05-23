var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var UserSchema = mongoose.Schema({
    name: String,
    avatar: String,
    portfolio_id: String,
    contacts: {
        email: {
            type: String,
            required: true,
            unique: true
        },
        phone: Number,
        gitHubLink: String,
        linkedIn: String,
    },

    password: {
        type: String,
        required: true},

    likes: ['User._id'],
    dislikes: ['User._id']
});

UserSchema.set('toJSON', {
    transform: function(doc, ret, options) {
        var returnJson = {
            id: ret._id,
            email: ret.email,
            name: ret.name
        };
        return returnJson;
    }
});

UserSchema.methods.authenticated = function(password) {
    var user = this;
    var isAuthenticated = bcrypt.compareSync(password, user.password);
    return isAuthenticated ? user : false;
};

UserSchema.pre('save', function(next) {
    if (!this.isModified('password')) {
        next();
    } else {
        this.password = bcrypt.hashSync(this.password, 10);
        next();
    }
});

module.exports = mongoose.model('User', UserSchema);
