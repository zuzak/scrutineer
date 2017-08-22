module.exports = function () {
  this.When(/^I click the link in the subheading$/, function () {
    return driver.findElement(by.css('.subheading a')).click()
  })
  this.When(/^I click the "(.*)" button$/, function (value) {
    return driver.findElement(by.css('input[value="' + value + '"]'))
      .then(function (button) {
        return button.click()
      })
  })
  this.When(/^I click "(.*)"/, function (value) {
    return driver.wait(until.elementsLocated(by.partialLinkText(value)), 1000).then(function () {
      return driver.findElement(by.linkText(value))
    })
      .then(function (button) {
        return button.click()
      })
  })
}
