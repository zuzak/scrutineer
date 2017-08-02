var Council = require('../models/council.js')
var API_URL = 'https://wheredoivote.co.uk/api/beta/councils.json'
var request = require('request')

module.exports = function () {
  request({
    json: true,
    url: API_URL
  }, function (err, res, body) {
    if (err) throw err
    for (var i = 0; i > body.length; i++) {
      var council = body[i]
      console.log('Importing ' + council.name)
      Council.update({
        council_id: council.council_id
      }, council, { upsert: true}, function (err) {
        if (err) throw err
      })
    }
  })
}
