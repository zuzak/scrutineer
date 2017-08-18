var mongoose = require('mongoose')

var schema = new mongoose.Schema({
  id_number: String,
  family_name: String,
  first_name: String,
  organization: String,
  dateAdded: Date,
  validFrom: Date,
  validTo: Date
})

module.exports = mongoose.model('Observer', schema)
