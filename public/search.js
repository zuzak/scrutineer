function normalize (string) {
  return string.toLowerCase()
}
window.onload = function () {
  var placeholder = document.getElementById('js-search')
  var searchBar = document.createElement('input')
  searchBar.type = 'search'
  searchBar.placeholder = 'Search'
  placeholder.appendChild(searchBar)

  searchBar.addEventListener('input', function (a) {
    var searchTerm = a.target.value
    var councils = document.querySelectorAll('.councils li')
    for (var i = 0; i < councils.length; i++) {
      var content = councils[i].innerText
      if (normalize(content).indexOf(normalize(searchTerm)) !== -1) {
        councils[i].style.display = 'inherit'
      } else {
        councils[i].style.display = 'none'
      }
    }
  })
}
