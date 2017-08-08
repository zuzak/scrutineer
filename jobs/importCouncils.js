var Council = require('../models/council.js')
var API_URL = 'https://wheredoivote.co.uk/api/beta/councils.json'
var API2_URL = 'https://elections.democracyclub.org.uk/api/organisations.json'

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

module.exports = function () {
  request({
    json: true,
    url: API_URL
  }, function (err, res, body) {
    if (err) throw err
    for (var i = 0; i < body.length; i++) {
      var council = body[i]
      if (council.council_id) {
        console.log('Importing ' + council.name)
        Council.update({
          council_id: council.council_id
        }, council, {upsert: true}, function (err) {
          if (err) throw err
        })
      } else {
        console.error('Unable to update councils?')
      }
    }
  })
  paginate(API2_URL, function (err, response) {
    console.log('DOING THE THING')
    if (err) throw err
    if (!response.results) {
      return console.error(response)
    }
    for (var i = 0; i < response.results.length; i++) {
      var curr = response.results[i]
      console.log('Imported ' + curr.common_name)
      Council.update({
        council_id: curr.gss
      }, {
        slug: curr.slug,
        iso: curr.official_identifier,
        territory: curr.territory_code,
        humanName: curr.common_name
      }, {upsert: true}, function (err) {
        if (err) throw err
      })
    }
  })
}
