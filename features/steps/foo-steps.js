module.exports = function () {
  this.When(/^I visit the homepage$/, function () {
    // Write code here that turns the phrase above into concrete actions
    return driver.get('http://localhost:3000')
  })
  this.Then(/^I should see the header$/, function () {
    return driver.wait(until.elementsLocated(by.css('a.logo')), 10000).then(function () {
      return driver.findElements(by.css('a.logo'))
    })
      .then(function (elements) {
        expect(elements.length).to.not.equal(0)
      })
  })
  this.Then(/^I should see a link to log in/, function () {
    return driver.wait(until.elementsLocated(by.css('a')), 10000).then(function () {
      return driver.findElements(by.css('a[href="/access-account"]'))
    })
      .then(function (elements) {
        expect(elements.length).to.not.equal(0)
      })
  })
  this.Then(/^the heading should read "(.*)"$/, function (value) {
    return driver.wait(until.elementsLocated(by.css('h1')), 10000).then(function () {
      return driver.findElement(by.css('h1')).getText()
    })
      .then(function (foo) {
        return expect(foo).to.equal(value)
      })
  })
}