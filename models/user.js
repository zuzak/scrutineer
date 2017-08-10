var mongoose = require('mongoose')

var schema = new mongoose.Schema({
  username: {type: String, index: {unique: true}},
  password: String,
  lastLogin: Date,
  email: {type: String, index: {unique: true}}
})

schema.plugin(require('mongoose-password-plugin'))
module.exports = mongoose.model('User', schema)
