const boxes = document.querySelectorAll('section article')
const buttons = document.querySelectorAll('.scrollNavi li')
const distance = 3000

window.addEventListener('scroll', () => {
  const scroll = window.scrollY

  boxes.forEach((box, idx) => {
    box.style.transform = `translateZ(${-distance * idx + scroll}px)`
    if (scroll >= distance * idx) {
      for (const el of buttons) el.classList.remove('on')
      for (const el of boxes) el.classList.remove('on')
      buttons[idx].classList.add('on');
      boxes[idx].classList.add('on');
    }
  })
})

buttons.forEach((button, idx) => {
  button.addEventListener('click', () => {
    window.scrollTo({left: 0, top: distance * idx, behavior: 'smooth'})
  })
})
