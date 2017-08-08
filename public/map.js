function wget (url, cb) {
  var xhr = new XMLHttpRequest()
  xhr.open('GET', url, true)
  xhr.responseType = 'json'
  xhr.onload = function () {
    var status = xhr.status
    if (status === 200) {
      cb(null, xhr.response)
    } else {
      cb(status)
    }
  }
  xhr.send()
}

window.onload = function () {
  console.log('shwmae ffrindiau')
  var mymap = L.map('map1').setView([52.4052, -4.0486], 13)
  L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoicGhlbm9scGh0aGFsZWluIiwiYSI6ImNqNXM1anprbjE2MHUzM3M2ZmhjNnR5dWIifQ.AJlqnuS80-PQ1y3VHITFPQ'
  }).addTo(mymap)

  // SHF E08000019
  // CGN W06000008
  wget('https://wheredoivote.co.uk/api/beta/pollingstations/geo.json?council_id=W06000008', function (err, data) {
    if (err) return console.error(err)
    L.geoJSON(data).addTo(mymap)
    console.log(data)
  })
}

function loadStations (url) {
  wget(url, function (err, data) {
    if (err) return console.error(err)
    L.geoJSON(data.results)
    if (data.next) {
      loadStations(data.next)
    } else {
      console.log('Done')
    }
  })
}
