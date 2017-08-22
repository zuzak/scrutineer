var mongoose = require('mongoose')

var env = process.env.NODE_ENV || ''
env = env.length > 0 ? '-' + env : env
env = env.toLowerCase()

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/scrutineer' + env, {server: {auto_reconnect: true}})

var db = module.exports = mongoose.connection

db.on('error', function (err) {
  console.error('DB PROBLEM', err)
  throw err
})
db.once('open', function () {
  console.log('Connected to database.')
  require('./models/station.js')
  require('./models/council.js')
  require('./models/commission.js')
  require('./models/observer.js')
})
