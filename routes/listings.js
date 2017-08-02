var app = require('../app.js')
var Station = require('../models/station.js')
var Council = require('../models/council.js')


app.get('/stations/:council.json', function (req, res) {
  Station.find({council_id: req.params.council}, function (err, stations) {
    if (err) throw err
    res.json(stations)
  })
})

app.get('/stations/:council', function (req, res, next) {
  Council.find({council_id: req.params.council}, function (err, council) {
    if (err) next(err)
    Station.find({council_id: req.params.council}, function (err, stations) {
      if (err) next(err)
      res.render('stations.pug', {council: council[0], stations, welsh: req.params.council.startsWith('W')})
    })
  })
})


app.get('/councils', function (req, res) {
  Station.find().distinct('council_id', function (err, ids) {
    if (err) throw err
    res.render('councils.pug', {councils: ids})
  })

})
