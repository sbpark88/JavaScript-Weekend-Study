/*
* 1. Element(BOM).scrollY : ㅎㅐ당 요소의 스크롤 거리값 반환(동적)
* 2. Element(DOM).offsetTop : 해당 요소의 세로 위치값을 반환(정적)
* 3. Element(BOM).scrollTo({x: 가로축 스크롤 위치, y: 세로축 스크롤 위치})
* */

const secs = [...document.getElementsByTagName('section')]
const btnContainer = document.getElementById('btn-wrapper')
const btns = [...btnContainer.children]
const icon = document.querySelector('.svgBox path')
const iconDasharrayLength = 2726
const speed = 500
const enableStepScroll = false
let enableScrollEvent = true

window.onload = () => {
  const event = Object.freeze({
    click: 'click',
    scroll: 'scroll',
    resize: 'resize',
    wheel: 'wheel'
  })

  btnContainer.addEventListener(event.click, clickMoveScroll(checkBullets)(moveScroll))
  throttleEvent(event.scroll)(activation)
  window.addEventListener(event.scroll, iconTransform)
  throttleEvent(event.resize)(holdCurrentYAxis)
  if (enableStepScroll) window.addEventListener(event.wheel, stepScroll)
}

// MARK: Throttling
const throttleEvent = evt => func => {
  let eventThrottling = false
  window.addEventListener(evt, () => {
    if (eventThrottling) return
    eventThrottling = setTimeout(() => {
      func()
      eventThrottling = false
    }, 200)
  })
}

// MARK: Scroll to specific y position
const moveScroll = index => {
  if (secs[index]) {
    enableScrollEvent = false
    new Anime(window, {
      prop: 'scroll',
      value: secs[index].offsetTop,
      duration: speed,
      callback: () => enableScrollEvent = true
    })
  }
}
const checkBullets = evt => evt.target.tagName === 'LI'

const clickMoveScroll = checker => action => evt => {
  if (checker) {
    btns.forEach((v, i) => {
      if (enableScrollEvent && btns[i] === evt.target) {
        action(i)
      }
    })
  }
}

// MARK: Activate bullets and screens
const activation = () => {
  const {scroll, base} = getYaxisPosition()

  secs.forEach((sec, i) => {
    if (scroll >= sec.offsetTop - base) {
      for (const el of btns) el.classList.remove('on')
      btns[i].classList.add('on')

      for (const el of secs) el.classList.remove('on')
      secs[i].classList.add('on')
    }
  })
}

const iconTransform = () => {
  const {scroll, base} = getYaxisPosition()

  if (scroll >= secs[2].offsetTop) {
    console.log('stop!!!')
    icon.style.strokeDashoffset = '0'
  } else if (scroll >= secs[2].offsetTop - base) {
    // const divider = base
    const divider = window.innerHeight
    const frame = iconDasharrayLength / divider
    icon.style.strokeDashoffset = `${frame * (scroll - secs[2].offsetTop)}`
    console.log('working!!!')

  }
}

const getYaxisPosition = () => {
  const scroll = window.scrollY
  const base = window.innerHeight / 2
  return {scroll, base}
}

// MARK: Set current y-axis when the browser is resized
const holdCurrentYAxis = () => {
  const {index: i} = currentButton()
  window.scroll(0, secs[i].offsetTop)
}

// MARK: Step scroll when the mouse wheel is triggered
const stepScroll = evt => {
  const {index: i} = currentButton()
  if (evt.deltaY > 0) { // move down => negative, move up => positive
    console.log('wheel down index: ', i + 1)
    moveScroll(i + 1)
  } else if (evt.deltaY < 0) {
    console.log('wheel up index: ', i - 1)
    moveScroll(i - 1)
  }
}

const currentButton = () => {
  for (const [i, v] of btns.entries()) {
    if (v.classList.contains('on'))
      return {index: i, button: v}
  }
}
