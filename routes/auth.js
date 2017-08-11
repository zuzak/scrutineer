var app = require('../app.js')
var isCommonPassword = require('common-password')
var isValidEmail = require('isemail').validate
var passport = require('passport')

var User = require('../models/user.js')

app.get('/create-account', function (req, res) {
  res.render('users/create-account.pug')
})
app.post('/create-account', function (req, res, next) {
  var errors = {}

  if (req.body.password.length < 8) {
    errors.password = 'Your password must be at least eight characters long.'
  }

  if (isCommonPassword(req.body.password)) {
    errors.password = 'Your chosen password is too easy to guess.'
  }

  if (!isValidEmail(req.body.email)) {
    errors.email = 'Your email address doesn\'t look right.'
  }

  if (!req.body.username) {
    errors.username = 'You need to enter a username.'
  }

  if (isBadUsername(req.body.username)) {
    errors.username = 'Please pick a different user name.'
  }

  console.log(errors, Object.keys(errors).length)
  if (Object.keys(errors).length > 0) {
    return res.render('users/create-account.pug', {errors})
  }

  var user = new User(req.body)
  user.save(function (err) {
    if (err) return next(err)
    req.login(user, function (err) {
      if (err) { return next(err) }
      return res.render('users/registration-successful.pug', {user})
    })
  })
})

app.get('/log-out', function (req, res) {
  req.logout()
  res.redirect('/')
})

app.get('/log-in', function (req, res) {
  res.render('users/log-in.pug')
})

app.post('/log-in',
  passport.authenticate('local'),
  function (req, res) {
    res.redirect('/')
  }
)

function isBadUsername (username) {
  // var isProfane = require('swearjar').profane
  var isOnBlacklist = require('the-big-username-blacklist').validate
  // if (isProfane(username)) return true
  if (!isOnBlacklist(username)) return true
  return false
}

app.all('*', function (req, res, next) {
  if (req.user) res.locals.user = req.user
  return next()
})
