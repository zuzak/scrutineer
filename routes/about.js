var app = require('../app')
var packageJson = require('../package.json')
var creditsTo = require('credits-to')
var gitHash = require('githash')

app.get('/about', function (req, res, next) {
  var coreDeps = Object.keys(packageJson.dependencies)
  creditsTo(function (err, deps) {
    if (err) next(err)
    res.render('about.pug', {deps, coreDeps, hash: gitHash()})
  })
  res.render('about.pug', {title: 'helo'})
})
