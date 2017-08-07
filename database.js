var mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/scrutineer', {server: {auto_reconnect: true}})

var db = module.exports = mongoose.connection

db.on('error', function (err) {
  console.error('DB PROBLEM', err)
  throw err;
})
db.once('open', function () {
  console.log('Connected to database.')
  var Station = require('./models/station.js')
  var Council = require('./models/council.js')
})
