import {$, renderInnerHTML} from "./Render.js";
import {eventBind} from "./EventBinding.js";
import {rotateCircularString} from "./CircularStringComponent.js";

const circle = document.querySelector('.circle p');


// MARK: Page Init
// 시계 방향으로 도는 텍스트 생성하기
rotateCircularString({
  data: {
    selector: '.circle p',
    degree: 6,
    translate: 'translateY(-150px)'
  },
  keyframes: {
    seconds: 15
  }
})

// article 안쪽 h1 의 문자를 각각 <span> 태그로 감싸주기
$('article h1').forEach(hTag => {
  const rawText = hTag.textContent
  const template = [...rawText].reduce((acc, character) => acc += wrapSpan(character), '')
  hTag.innerHTML = template

  hTag.querySelectorAll('span').forEach((el, index) => el.style.transitionDelay = `${0.1 * index}s`)

  function wrapSpan(text) {
    return `<span>${text}</span>`
  }
})

const careerDesigner = $('.career__designer')
const careerDeveloper = $('.career__developer')

const toggleOnDesigner = () => {
  careerDesigner.forEach(el => el.classList.toggle('on', true))
  careerDeveloper.forEach(el => el.classList.toggle('on', false))
}

const toggleOnDeveloper = () => {
  careerDesigner.forEach(el => el.classList.toggle('on', false))
  careerDeveloper.forEach(el => el.classList.toggle('on', true))
}

const ActivationToggle = {
  btnDesigner: toggleOnDesigner,
  btnDeveloper: toggleOnDeveloper
}

eventBind('.main__btn', 'click', event => {
  ActivationToggle[event.target.id]()
})
