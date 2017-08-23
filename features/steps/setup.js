var IS_LISTENING = false
module.exports = function () {
  this.BeforeFeature(function (feature, done) {
    require('../../bin/www')
    done()
  })
}
