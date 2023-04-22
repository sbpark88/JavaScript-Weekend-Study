class Tab {
  constructor(selector) {
    this.tab = document.querySelector(selector)
    this.btns = this.tab.querySelectorAll('ul li')
    this.boxs = this.tab.querySelectorAll('article div')
    this.addTabEvent()
  }

  addTabEvent() {
    this.btns.forEach((btn, idx) => {
      btn.addEventListener('click', () => {
        [this.btns, this.boxs].forEach((el) => {
          this.activation(el, idx)
        })
      })
    })
  }

  activation(arr, idx) {
    arr.forEach((el) => {
      el.classList.remove('on');
    });
    arr[idx].classList.add('on');
  }
}

new Tab('#tab')
