var app = require('../app.js')
var Station = require('../models/station.js')
var Council = require('../models/council.js')

app.get('/stations/:council.json', function (req, res, next) {
  Council.find({slug: req.params.council}, function (err, council) {
    var councilId = council[0].council_id
    if (err) next(err)
    Station.find({council_id: councilId}, function (err, stations) {
      if (err) next(err)
      res.json(stations)
    })
  })
})

app.get('/stations/:council', function (req, res, next) {
  Council.find({slug: req.params.council}, function (err, council) {
    try {
      var councilId = council[0].council_id
    } catch (e) {
      if (e instanceof TypeError) {
        return next() // 404
      }
    }

    if (err) next(err)
    Station.find({council_id: councilId}, function (err, stations) {
      if (err) next(err)
      res.render('stations.pug', {council: council[0], stations, welsh: req.params.council.startsWith('W')})
    })
  })
})

app.get('/stations/:council', function (req, res, next) {
  Council.find({council_id: req.params.council}, function (err, council) {
    if (err) next(err)
    try {
      var slug = council[0].slug
    } catch (e) {
      if (e instanceof TypeError) {
        return next() // 404
      }
    }
    res.redirect('/stations/' + slug)
  })
})

app.get('/councils', function (req, res, next) {
  Station.find().distinct('council_id', function (err, ids) {
    if (err) return next(err)
    Council.find({'council_id': {$in: ids}}, function (err, councils) {
      if (err) return next(err)
      res.render('councils.pug', {councils})
    })
  })
})
