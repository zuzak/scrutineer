var Station = require('../models/station.js')
var API_URL = 'https://wheredoivote.co.uk/api/beta/pollingstations/geo.json'
var request = require('request')

function paginate (url, cb) {
  request.get({
    json: true,
    url: url
  }, function (err, response, body) {
    if (err) console.error(err)
    if (body.next) {
      paginate(body.next, cb)
    }
    cb(err, body)
  })
}

var checkIfUpdateNeeded = function (cb) {
  request.get({
    json: true,
    url: API_URL
  }, function (err, response, body) {
    if (response.statusCode !== 200) {
      return cb(new Error('Upstream API unavailable.'))
    }
    var upstreamCount = body.count
    Station.count(function (err2, localCount) {
      cb(err || err2, upstreamCount >= localCount)
    })
  })
}

module.exports = function () {
  checkIfUpdateNeeded(function (err, updateNeeded) {
    if (err) console.log('Upstream API unavailable. Skipping sync.')
    if (updateNeeded) {
      return loadStations()
    }
  })
}

var loadStations = function () {
  paginate(API_URL, function (err, response) {
    if (err) throw err
    if (!response.results) {
      return console.error(response)
    }
    for (var i = 0; i < response.results.features.length; i++) {
      var curr = response.results.features[i]
      console.log("Importing " + curr.properties.station_id)
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
}
