import a from './a'

var box = document.createElement('div')
box.innerHTML = 'hello world' + a
document.body.appendChild(box)