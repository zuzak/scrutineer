var Station = require('../models/station.js')
var API_URL = 'https://wheredoivote.co.uk/api/beta/pollingstations/geo.json'
var request = require('request')
var progress = require('smooth-progress')

var progressBar = null

function paginate (url, cb) {
  request.get({
    json: true,
    url: url
  }, function (err, response, body) {
    if (progressBar === null) {
      console.log('Beginning station synchronisation.')
      progressBar = progress({
        tmpl: 'Updating stations... :bar :percent :eta',
        width: 50,
        total: body.count
      })
      progressBar.tick(1)
    }
    if (err) console.error(err)
    if (body.next) {
      paginate(body.next, cb)
    }
    cb(err, body)
  })
}

paginate(API_URL, function (err, response) {
  if (err) throw err
  for (var i = 0; i < response.results.features.length; i++) {
    progressBar.tick(1)
    var curr = response.results.features[i]
    var res = {
      id: curr.id,
      station_id: curr.properties.station_id,
      council_id: curr.properties.council.split('/').filter(function (x) { return x }).pop(), // E080000021
      postcode: curr.properties.postcode, // NE3 3QT
      address: curr.properties.address, // Kenton Customer Service Centre and Library\nThe Kenton Centre\nHillsview Avenue\nNewcastle upon Tyne
      coords: curr.geometry ? curr.geometry.coordinates : null // [ -1.6532922869565219, 55.00431079565217 ]
    }

    Station.update({
      station_id: res.station_id,
      council_id: res.council_id
    }, res, {upsert: true}, function (err) {
      if (err) throw err
    })
  }
})
