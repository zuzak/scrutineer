window.onload = function () {
  var stylesheet = document.createElement('style')
  document.head.appendChild(stylesheet)
  stylesheet.sheet.insertRule('li[data-subquestion-of] { display: none }', 0)

  var form = document.querySelector('form')
  form.addEventListener('click', function (e) {
    if (e.target.tagName === 'INPUT') {
      var hiddenFields = document.querySelectorAll('li[data-subquestion-of=' + e.target.name + ']')
      if (hiddenFields == null) return
      for (var i = 0; i < hiddenFields.length; i++) {
        hiddenFields[i].style.display = e.target.value === 'Yes' ? 'block' : 'none'
      }
    }
  })

  var ingressparent = document.getElementById('js-ingress')
  var btn = document.createElement('a')
  btn.href = '#entry'
  btn.className = ' button'
  btn.innerHTML = 'Insert current time'
  btn.addEventListener('click', function () {
    var now = new Date()
    document.getElementById('ingress').value = now.toTimeString()
  })
  ingressparent.appendChild(btn)
}
