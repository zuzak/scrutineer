var app = require('../app')
var Station = require('../models/station.js')
var Observation = require('../models/observation')

app.get('/', function (req, res, next) {
  Observation.count({}, function (err, observationCount) {
    if (err) next(err)
    Station.count({}, function (err2, stationCount) {
      if (err2) next(err)
      res.render('index.pug', {
        title: 'Scrutineer',
        data: [{
          caption: 'polling stations in database',
          value: stationCount
        }, {
          caption: 'observation forms started',
          value: observationCount
        }]
      })
    })
  })
})
