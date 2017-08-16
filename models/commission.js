var mongoose = require('mongoose')

var schema = new mongoose.Schema({
  territory: String,
  lang: String,
  address: String,
  postcode: String,
  fax: String,
  tel: String,
  email: String
})

var Commission = module.exports = mongoose.model('Commission', schema)

var commissions = [
  {
    territory: 'E',
    lang: 'en',
    address: 'The Electoral Commission\n3 Bunhill Row\nLondon',
    postcode: 'EC1Y 8YZ',
    tel: '020 7271 0500',
    fax: '020 7271 0505',
    email: 'info@electoralcommission.org.uk'
  },
  {
    territory: 'S',
    address: 'The Electoral Commission\nLothian Chambers\n59-63 George IV Bridge\nEdinburgh',
    lang: 'en',
    postcode: 'EH1 1RN',
    tel: '0333 103 1928',
    fax: '0131 225 0205',
    email: 'infoscotland@electoralcommission.org.uk'
  },
  {
    territory: 'W',
    address: 'The Electoral Commission\nCompanies House\nCrown Way\nCardiff',
    lang: 'en',
    postcode: 'CF14 3UZ',
    tel: '0333 103 1929',
    fax: '029 2038 0996',
    email: 'infowales@electoralcommission.org.uk'
  },
  {
    territory: 'W',
    address: 'Y Comisiwn Etholiadol\nTŷ’r Cwmnïau\nFfordd y Goron\nCaerdydd',
    lang: 'cy',
    postcode: 'CF14 3UZ',
    tel: '0333 103 1929',
    fax: '029 2038 0996',
    email: 'gwybodaeth@comisiwnetholiadol.org.uk'
  }
]

for (var i = 0; i < commissions.length; i++) {
  Commission.update({
    territory: commissions[i].territory,
    lang: commissions[i].lang
  }, commissions[i], {upsert: true}, function (err) {
    if (err) throw err
  })
}
