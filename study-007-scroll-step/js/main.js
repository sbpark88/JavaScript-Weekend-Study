/*
* 1. Element(BOM).scrollY : ㅎㅐ당 요소의 스크롤 거리값 반환(동적)
* 2. Element(DOM).offsetTop : 해당 요소의 세로 위치값을 반환(정적)
* 3. Element(BOM).scrollTo({x: 가로축 스크롤 위치, y: 세로축 스크롤 위치})
* */

const secs = [...document.getElementsByTagName('section')]
const btnContainer = document.getElementById('btn-wrapper')
const btns = [...btnContainer.children]

btnContainer.addEventListener('click', evt => {
  if (evt.target.tagName === 'LI') {
    btns.forEach((v, i) => {
      if (btns[i] === evt.target) {
        window.scrollTo({left: 0, top: secs[i].offsetTop, behavior: 'smooth'});
        btns[i].classList.add('on')
      } else {
        btns[i].classList.remove('on')
      }
    })
  }
})
