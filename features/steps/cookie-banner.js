module.exports = function () {
  this.Then(/^the cookie banner should be displayed$/, function () {
    return driver.wait(until.elementsLocated(by.css('p.cookie-message')), 1000).then(function () {
      return driver.findElement(by.css('p.cookie-message'))
    })
  })
}
