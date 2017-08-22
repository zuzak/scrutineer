module.exports = function () {
  this.When(/^I type "(.*)" in the (.*) field$/, function (contents, name) {
    return driver.findElement(by.name(name))
      .then(function (field) {
        field.sendKeys(contents)
      })
  })
  this.Then(/^I should get a "(.*)" error message$/, function (message) {
    return driver.wait(until.elementsLocated(by.partialLinkText(message)), 1000).then(function () {
      return driver.findElement(by.partialLinkText(message))
    })
  })
  this.Then(/^I should get an error message$/, function () {
    return driver.wait(until.elementsLocated(by.css('p.error')), 1000).then(function () {
      return driver.findElement(by.css('p.error'))
    })
  })
}
