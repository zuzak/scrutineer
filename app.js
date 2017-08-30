var express = require('express')
var path = require('path')
var logger = require('morgan')
var sassMiddleware = require('node-sass-middleware')

var app = module.exports = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use(require('body-parser')())
app.use(require('express-flash')())

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
if (process.env.NODE_ENV !== 'test') {
  app.use(logger('dev'))
}
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: false, // true = .sass and false = .scss
  sourceMap: true
}))
app.use(express.static(path.join(__dirname, 'public')))

app.locals.pretty = true
// app.use('/', index)

require('./login')
require('./routes')
require('./database')

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  console.error(err.stack)
  res.render('error.pug')
})

if (!process.env.NO_SYNC) {
  console.log('   Synchronising upstream.')
  if (!process.env.NO_STATION_SYNC) {
    require('./jobs/importStations.js')()
  }
  if (!process.env.NO_COUNCIL_SYNC) {
    require('./jobs/importCouncils.js')()
  }
  if (!process.env.NO_COMMISSION_SYNC) {
    require('./jobs/importObservers')
  }
} else {
  console.log('Not synchronising upstream.')
}
