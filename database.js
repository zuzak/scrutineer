var mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/scrutineer')

var db = module.exports = mongoose.connection

db.on('error', function (err) {
  console.error(err)
})
db.once('open', function () {
  console.log('Connected to database.')
  var Station = require('./models/station.js')
  var Council = require('./models/council.js')
})
