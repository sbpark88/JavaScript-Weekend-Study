import {$, renderInnerHTML} from "./Render.js";
import {eventBind} from "./EventBinding.js";

const buttonWrapper = $('ul')
const buttons = $('li')

buttons.forEach((button, index) => {
  button.addEventListener('click', event => {
    event.preventDefault()

    for (const el of buttons) el.classList.remove('on')
    buttons[index].classList.add('on')
  })
})
