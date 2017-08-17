var app = require('../app.js')

app.all('*', function (req, res, next) {
  if (process.env.NODE_ENV) {
    res.locals.env = process.env.NODE_ENV
  }
  next()
})
