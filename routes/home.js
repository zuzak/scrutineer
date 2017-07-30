var app = require('../app.js')

app.get('/', function (req, res) {
  res.render('index.pug', {title: 'helo'})
})
