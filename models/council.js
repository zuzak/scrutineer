var mongoose = require('mongoose')

var schema = new mongoose.Schema({
  council_id: String, // E08000021
  name: String, // Newcastle City Council
  email: String, // elections@newcastle.gov.uk
  phone: String, // 0191 278 7878
  website: String, // http://www.newcastle.gov.uk
  postcode: String, // NE1 8QH
  address: String, // Electoral Registration Officer\nCivic Centre
  // council_id
})

module.exports = mongoose.model('Council', schema)
