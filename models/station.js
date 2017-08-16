var mongoose = require('mongoose')

var schema = new mongoose.Schema({
  id: String,
  station_id: String, // 6344
  council_id: String, // E080000021
  postcode: String, // NE3 3QT
  address: String, // Kenton Customer Service Centre and Library\nThe Kenton Centre\nHillsview Avenue\nNewcastle upon Tyne
  coords: Array, // [ -1.6532922869565219, 55.00431079565217 ]
  humanName: String
})

module.exports = mongoose.model('Station', schema)
