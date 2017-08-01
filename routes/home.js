var app = require('../app.js')
var Station = require('../models/station.js')
app.get('/', function (req, res) {
  res.render('index.pug', {title: 'helo'})
})


app.get('/stations', function (req, res) {
  Station.find(function (err, stations) {
    if (err) throw err
    res.render('stations.pug', {stations})
  })
})