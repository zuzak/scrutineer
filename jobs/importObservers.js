var request = require('request')
var fs = require('fs') // core
var path = require('path') // core
var tempy = require('tempy')
var XLSX = require('xlsx')

var REGISTER_UPSTREAM_URL = 'http://www.electoralcommission.org.uk/__data/assets/excel_doc/0009/57285/Accredited_observers.xls'

function downloadRegister (cb) {
  var excelFile = tempy.file()
  console.log(typeof excelFile, excelFile)
  var stream = fs.createWriteStream(excelFile)
  request(REGISTER_UPSTREAM_URL).pipe(stream)
  stream.close()
  console.log('a')
  // https://docs.sheetjs.com/#streaming-read
  console.log(excelFile)
  //var workbook = XLSX.readFile(excelFile)

  //console.log(workbook)
  var fname = tempy.file()
  var ostream = fs.createWriteStream(fname)
  var stream = fs.createReadStream(excelFile)
  stream.pipe(ostream)
  ostream.on('finish', function () {
    console.log(fname)
    var wb = XLSX.readFile(fname)
     console.log(wb)
   })
}

downloadRegister()
