var request = require('request')
var tempy = require('tempy')
var tabular = require('tabular-stream')
var format = require('format-data')
var exceldate = require('exceldate')

var Observer = require('../models/observer.js')
var REGISTER_UPSTREAM_URL = 'http://www.electoralcommission.org.uk/__data/assets/excel_doc/0009/57285/Accredited_observers.xls'

function downloadRegister (cb) {
  var excelFile = tempy.file({extension: '.xls'})
  // var stream = fs.createWriteStream(excelFile)
  var buffers = []
  request(REGISTER_UPSTREAM_URL).pipe(tabular()).pipe(format('json'))
    .on('data', function (buffer) {
      buffers.push(buffer)
    })
    .on('end', function () {
      cb(JSON.parse(buffers.join('')).rows)
      // ^^^^^^^^^^ FIXME
    })
}

downloadRegister(function (register) {
  /*
  {
    "IDNUMBER": 1234,
    "Surname": "Bloggs",
    "FirstName": "Joe",
    "Type": "Individual ",
    "Organisation Name": "",
    "DateAddedToRegister": 42829,
    "ValidFrom": 42832,
    "ValidTo": 43100
  }
   */

  for (var i = 0; i < register.length; i++) {
    var observer = register[i]
    var newEntry = {
      id_number: observer.IDNUMBER,
      family_name: observer.Surname,
      first_name: observer.FirstName,
      organization: observer['Organisation Name'],
      // excel dates are stored as elapsed days since 1900-01-01; need to be converted
      dateAdded: exceldate(observer.DateAddedToRegister),
      validFrom: exceldate(observer.ValidFrom),
      validTo: exceldate(observer.ValidTo)
    }
    console.log('Importing observer #' + observer.IDNUMBER)
    Observer.findOneAndUpdate({
      id_number: newEntry.id_number
    }, newEntry, {upsert: true}, function (err, res) {
      if (err) throw err
    })
  }
})
