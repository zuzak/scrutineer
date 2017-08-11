var app = require('../app.js')
var isCommonPassword = require('common-password')
var isValidEmail = require('isemail').validate
var passport = require('passport')

var User = require('../models/user.js')

app.get('/create-account', function (req, res) {
  res.render('users/create-account.pug')
})
app.post('/create-account', function (req, res, next) {
  var errors = validateAccount(req.body)
  if (errors.hasErrors) {
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

function validateAccount (data, ignorePassword) {
  var errors = {
    password: [],
    username: [],
    email: []
  }
  if (!ignorePassword) {
    if (data.password) {
      errors.password = []
      if (data.password.length < 8) {
        errors.password.push('Your password must be at least eight characters long.')
      }

      if (isCommonPassword(data.password)) {
        errors.password.push('Your chosen password is too easy to guess.')
      }
    } else {
      errors.password.push('You must set a password.')
    }
  }

  if (data.email) {
    if (!isValidEmail(data.email)) {
      errors.email.push('Your email address doesn\'t look right.')
    }
  } else {
    errors.email.push('You must specify an email address.')
  }

  if (data.username) {
    if (isBadUsername(data.username)) {
      errors.username.push('Your chosen username might be confusing to other users. Please pick another.')
    }
  } else {
    errors.username.push('You need to enter a username.')
  }
  errors.hasErrors = (errors.password.length + errors.username.length + errors.email.length) > 0

  return errors
}

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

// this method needs to be above any proper views!
app.all('*', function (req, res, next) {
  if (req.user) res.locals.user = req.user
  return next()
})

app.get('/amend-details', function (req, res) {
  if (!req.user) return res.redirect('/log-in')
  res.render('users/amend-details.pug')
})

app.post('/amend-details', function (req, res, next) {
  if (!req.user) return res.redirect('/log-in')
  var errors = validateAccount(req.body, ['password'])
  if (errors.hasErrors) {
    return res.render('users/amend-details.pug', {errors})
  }

  User.update({
    email: req.user.email,
    username: req.user.username
  }, {
    email: req.body.email,
    username: req.body.username
  }, function (err, newUser) {
    if (err) return next(err)
    return res.redirect('/about-you')
  })
})

app.get('/about-you', function (req, res) {
  if (!req.user) return res.redirect('/log-in')
  res.render('users/registration-successful.pug')
})
