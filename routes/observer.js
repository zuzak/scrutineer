var Observer = require('../models/observer')
var app = require('..')

app.get('/become-an-observer', function (req, res) {
  return res.render('users/observer-onboarding.pug')
})

app.post('/become-an-observer', function (req, res, next) {
  Observer.findOne({
    id_number: req.body['ec-number'],
    family_name: req.body['ec-surname']
  }, function (err, response) {
    if (err) next(err)
    res.render('users/observer-confirm.pug', {observer: response})
  })
  //return res.render('users/observer-confirm.pug')
})