var Observer = require('../models/observer')
var User = require('../models/user')
var app = require('..')

app.get('/verify-your-observer-status', function (req, res, next) {
  if (!req.user) next()
  return res.render('users/observer-onboarding.pug')
})

app.post('/verify-your-observer-status', function (req, res, next) {
  if (!req.user) return next()
  if (!req.body['ec-confirm']) return next()
  if (req.body['ec-confirm'] !== 'Yes') return next()
  Observer.findOne({
    id_number: req.body['ec-number'],
    family_name: req.body['ec-surname']
  }, function (err, observer) {
    console.log('d')
    if (err) return next(err)
    console.log('e', err, observer)
    if (!observer) return next()
    console.log('f')
    User.update({
      _id: req.user._id
    }, {
      observerNumber: req.body['ec-number']
    }, function (err2, res2) {
      console.log('g')
      if (err2) return next(err2)
      console.log('h', res2, req.body)
      return res.redirect('/about-you')
    })
  })
})

app.post('/verify-your-observer-status', function (req, res, next) {
  if (!req.user) next()
  if (req.body['ec-card'] !== 'Yes') {
    return res.render('users/observer-fail.pug')
  }
  Observer.findOne({
    id_number: req.body['ec-number'],
    family_name: req.body['ec-surname']
  }, function (err, response) {
    if (err) next(err)
    res.render('users/observer-confirm.pug', {observer: response})
  })
  //return res.render('users/observer-confirm.pug')
})