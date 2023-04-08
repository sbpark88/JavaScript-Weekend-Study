/*
* 1. Element(BOM).scrollY : ㅎㅐ당 요소의 스크롤 거리값 반환(동적)
* 2. Element(DOM).offsetTop : 해당 요소의 세로 위치값을 반환(정적)
* 3. Element(BOM).scrollTo({x: 가로축 스크롤 위치, y: 세로축 스크롤 위치})
* */

const secs = [...document.getElementsByTagName('section')]
const btnContainer = document.getElementById('btn-wrapper')
const btns = [...btnContainer.children]
const speed = 500

window.onload = () => {
  btnContainer.addEventListener('click', moveScroll)
  window.addEventListener('scroll', activation)
}

// MARK: Scroll to specific y position
const moveScroll = evt => {
  if (evt.target.tagName === 'LI') {
    btns.forEach((v, i) => {
      if (btns[i] === evt.target) {
        new Anime(window, {
          prop: 'scroll',
          value: secs[i].offsetTop,
          duration: speed
        })
      }
    })
  }
}

// MARK: Activate bullets and screens
const activation = () => {
  const scroll = window.scrollY
  const base = window.innerHeight / 2

  secs.forEach((sec, i) => {
    if (scroll >= sec.offsetTop - base) {
      for (const el of btns) el.classList.remove('on')
      btns[i].classList.add('on')

      for (const el of secs) el.classList.remove('on')
      secs[i].classList.add('on')
    }
  })
}
