var app = require('../app.js')
var Observation = require('../models/observation.js')
var User = require('../models/user.js')
app.get('/observations', function (req, res, next) {
  Observation.find(function (err, rawObservations) {
    if (err) next(err)
    var observations = {'complete': [], 'inprogress': [], 'incomplete': []}

    for (var i = 0; i < rawObservations.length; i++) {
      var observation = rawObservations[i]

      if (observation.upheldSuffrage !== undefined && observation.upheldIntegrity !== undefined) {
        observations.complete.push(observation)
        continue
      }

      if (observation.ingress && !observation.egress) {
        observations.inprogress.push(observation)
        continue
      }

      observations.incomplete.push(observation)
    }
    res.render('observations/index.pug', {observations})
  })
})
