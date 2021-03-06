var mongoose = require('mongoose'),
  Api = require('./api'),
  bcrypt = require('bcrypt-nodejs')

var User = mongoose.Schema({
  expLevel: String,
  admin: {type: Boolean, default: false},
  local: {
    name: String,
    email: String,
    password: String,
  },
  github: {
    id: String,
    token: String,
    email: String,
    name: String,
  },
  favorites: [{
    type: mongoose.Schema.ObjectId,
    ref: 'Api'
  }]
})

User.methods.encrypt = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

User.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.local.password);
}

module.exports = mongoose.model('User', User)
