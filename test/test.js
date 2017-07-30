var app = require('../app')
var request = require('supertest')

require('should')

describe('index', function () {
  it('should 200', function (done) {
    request(app)
      .get('/')
      .expect(200, done)
  })
  it('should render hello world', function () {
    request(app)
      .get('/')
      .end(function (err, res) {
        if (err) throw err
        res.text.should.contain('Hello, world!')
        done()
      })
  })
})
