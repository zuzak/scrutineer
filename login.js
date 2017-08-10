var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy
var User = require('./models/user')
var app = require('./app.js')

app.use(require('cookie-parser')())
app.use(require('body-parser')())
app.use(require('express-session')({ secret: 'keyboard cat' }))
app.use(passport.initialize())
app.use(passport.session())

passport.use(new LocalStrategy( // http://passportjs.org/docs/configure
  function (username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err, null) }
      if (!user) {
        return done(null, false)
      }
      user.comparePassword(password, function (err, match) {
        if (err) return done(err)
        if (!match) return done(null, false)
        return done(null, user)
      })
    })
  }
))

passport.serializeUser(function (user, done) {
  done(null, user.id)
})

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user)
  })
})
