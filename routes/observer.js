var Observer = require('../models/observer')
var User = require('../models/user')
var app = require('..')

app.get('/verify-your-observer-status', function (req, res, next) {
  if (!req.user) next()
  return res.render('users/observer-onboarding.pug')
})

app.post('/verify-your-observer-status', function (req, res, next) {
  console.log('a')
  if (!req.user) return next()
  console.log('b')
  if (!req.body['ec-confirm']) return next()
  console.log('c')
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
  Observer.findOne({
    id_number: req.body['ec-number'],
    family_name: req.body['ec-surname']
  }, function (err, response) {
    if (err) next(err)
    res.render('users/observer-confirm.pug', {observer: response})
  })
  //return res.render('users/observer-confirm.pug')
})