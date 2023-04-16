function FontStyle(el, {size, color = 'green'}) {
  this.el = document.querySelector(el)
  this.size = size
  this.color = color
  this.setStyleWhenClick()
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

Object.defineProperty(FontStyle.prototype, 'setStyleWhenClick', {
  value: function () {
    return (() => {
      this.el.addEventListener('click', () => {
        if (this.size) this.changeSize(this.size)
        if (this.color) this.changeColor(this.color)
      })
    })()
    /*return (() => {
      console.log(this) // FontStyle {el: p#title1, size: '100px', color: 'aqua'}
      this.el.addEventListener('click', function () {
        console.log(this) // 일반 functions 을 사용시 event 안쪽에서 this 에 <p id="title1">HELLO</o> 가 잡힌다.
        if (this.size) this.changeSize(this.size)
        if (this.color) this.changeColor(this.color)
      })
    })()*/
  },
  enumerable: false,
  writable: false,
  configurable: false
})


new FontStyle('#title1', {size: '100px', color: 'aqua'})
new FontStyle('#title2', {size: '50px'})
new FontStyle('#title3', {color: 'orange'})
new FontStyle('#title4', {})
