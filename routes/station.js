var app = require('../app.js')
var Station = require('../models/station.js')
var Council = require('../models/council.js')
var Commission = require('../models/commission.js')
var Observation = require('../models/observation.js')

app.get('/station/:council/:station.json', function (req, res, next) {
  Station.find({
    council_id: req.params.council,
    station_id: req.params.station
  }, function (err, station) {
    if (err) next(err)
    res.json(station)
  })
})

app.get('/station/:council/:station', function (req, res, next) {
  Station.find({
    council_id: req.params.council,
    station_id: req.params.station
  }, function (err, station) {
    if (err) next(err)
    Council.find({council_id: req.params.council}, function (err2, council) {
      if (err2) next(err2)
      res.render('station.pug', {
        station: station[0],
        council: council[0],
        observe_url: req.path + '/observe',
        welsh: req.params.council.startsWith('W')
      })
    })
  })
})

app.get('/station/:council/:station/observe', function (req, res, next) {
  if (!req.user) {
    req.flash('error', 'You must log in to observe a station.')
    return res.redirect('/access-account')
  }
  if (!req.user.observerNumber) {
    req.flash('error', 'You must be verified as an observer before you can observe a station.')
    return res.redirect('/verify-your-observer-status')
  }
  Station.find({
    council_id: req.params.council,
    station_id: req.params.station
  }, function (err, station) {
    if (err) next(err)
    Council.find({council_id: req.params.council}, function (err2, council) {
      if (err2) next(err2)
      Commission.find({territory: req.params.council[0]}, function (err3, commissions) {
        if (err3) next(err3)
        res.render('inspection.pug', {
          station: station[0],
          council: council[0],
          welsh: req.params.council.startsWith('W'),
          commissions
        })
      })
    })
  })
})
app.post('/station/:council/:station/observe', function (req, res, next) {
  if (!req.user) {
    return res.redirect('/access-account')
    return next(new Error('Must be signed in to do this')) // FIXME 403 instead of 500
  }
  var data = req.body
  if (!data) next()
  // Convert "Yes"/"No" to Boolean
  var dataKeys = Object.keys(data)
  for (var i = 0; i < dataKeys.length; i++) {
    var value = data[dataKeys[i]]
    if (value === 'Yes') {
      data[dataKeys[i]] = true
    } else if (value === 'No') {
      data[dataKeys[i]] = false
    }
  }
  data.user_id = req.user._id

  Observation.update({
    station_id: req.params.station,
    council_id: req.params.council,
    user_id: req.user._id
  }, data, {upsert: true}, function (err, result) {
    if (err) next(err)
    res.send('inspection saved')
  })
})
