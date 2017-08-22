var IS_LISTENING = false
module.exports = function () {
  this.BeforeFeature(function (feature, done) {
    var app = require('../../bin/www')
    done()
  })
}
