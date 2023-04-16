function FontStyle(el, { size, color = 'green'} ) {
  this.el = document.querySelector(el)
  if (size) this.changeSize(size)
  if (color) this.changeColor(color)
}

FontStyle.prototype.changeSize = function (size) {
  this.el.style.fontSize = size
}

Object.defineProperty(FontStyle.prototype, 'changeColor', {
  value: function (color) {
    // 메서드 코드
    this.el.style.color = color
  },
  enumerable: false, // 속성이 for...in 루프에서 열거되지 않도록 설정
  writable: true, // 속성 값이 변경 가능하도록 설정
  configurable: true // 속성이 삭제될 수 있도록 설정
})

new FontStyle('#title1', {size: '100px', color: 'aqua'})
new FontStyle('#title2', {size: '50px'})
new FontStyle('#title3', {color: 'orange'})
new FontStyle('#title4', {})
