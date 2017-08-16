var app = require('../app')
var Station = require('../models/station.js')
app.get('/', function (req, res, next) {
  Station.count({}, function (err, stationCount) {
    if (err) next(err)
    res.render('index.pug', {
      title: 'Scrutineer',
      data: [{
        caption: 'polling stations in database',
        value: stationCount
      }]
    })
  })
})