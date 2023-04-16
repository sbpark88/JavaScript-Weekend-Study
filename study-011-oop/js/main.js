class FontStyle {
  constructor(el, {size, color = 'green'}) {
    this.el = document.querySelector(el)
    this.size = size
    this.color = color
    this.setStyleWhenClick()
  }

  changeSize(size) {
    this.el.style.fontSize = size
  }

  changeColor(color) {
    this.el.style.color = color
  }

  setStyleWhenClick() {
    this.el.addEventListener('click', () => {
      if (this.size) this.changeSize(this.size)
      if (this.color) this.changeColor(this.color)
    })
  }

}


new FontStyle('#title1', {size: '100px', color: 'aqua'})
new FontStyle('#title2', {size: '50px'})
new FontStyle('#title3', {color: 'orange'})
new FontStyle('#title4', {})
