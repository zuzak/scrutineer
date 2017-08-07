var mongoose = require('mongoose')

var schema = new mongoose.Schema({
  area: String,
  address: String,
  postcode: String,
  fax: String,
  tel: String,
  email: String
  // council_id
})

// https://www.electoralcommission.org.uk/contact-us/our-offices
var commissions = [
  {
    "area": "E",
    "address": "The Electoral Commission\n3 Bunhill Row\nLondon",
    "postcode": "EC1Y 8YZ",
    "tel": "020 7271 0500",
    "fax": "020 7271 0505",
    "email": "info@electoralcommission.org.uk"
  },
  {
    "area": "S",
    "address": "The Electoral Commission\nLothian Chambers\n59-63 George IV Bridge\nEdinburgh",
    "postcode": "EH1 1RN",
    "tel": "0333 103 1928",
    "fax": "0131 225 0205",
    "email": "infoscotland@electoralcommission.org.uk"
  },
  {
    "area": "W",
    "address": "The Electoral Commission\nCompanies House\nCrown Way\mCardiff",
    "postcode": "CF14 3UZ",
    "tel": "0333 103 1929",
    "fax": "029 2038 0996",
    "email": "infowales@electoralcommission.org.uk"
  },
  {
    "area": "W",
    "address": "Y Comisiwn Etholiadol\nTŷ’r Cwmnïau\nFfordd y Goron\nCaerdydd",
    "postcode": "CF14 3UZ",
    "tel": "0333 103 1929",
    "fax": "029 2038 0996",
    "email": "gwybodaeth@comisiwnetholiadol.org.uk"
  }
]
module.exports = mongoose.model('Commission', schema)
