function Tab(selector) {
  this.tab = document.querySelector(selector)
  this.btns = this.tab.querySelectorAll('ul li')
  this.boxs = this.tab.querySelectorAll('article div')
  this.addTabEvent()
}

Object.defineProperty(Tab.prototype, 'addTabEvent', {
  value: function () {
    this.btns.forEach(function (btn, idx) {
      btn.addEventListener('click', function () {
        [this.btns, this.boxs].forEach(function (el) {
          this.activation(el, idx)
        }.bind(this)) // What the.........
      }.bind(this))
    }.bind(this))
  },
})

Object.defineProperty(Tab.prototype, 'activation', {
  value: function (arr, idx) {
    arr.forEach(function (el) {
      el.classList.remove('on');
    });
    arr[idx].classList.add('on');
  }
})

new Tab('#tab')
