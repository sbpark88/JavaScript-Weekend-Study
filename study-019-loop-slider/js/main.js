'use strict'

import {$} from './Render.js'
import {eventBind} from "./EventBinding.js";
import {escapingClosure} from "./CommonUtils.js";

const frame = $('.list')

// MARK: Event Binding
const clickPrev = (target, eventBind) => {
  eventBind('.prev', 'click', () => {
    target.prepend(target.lastElementChild)
    const prevButton = $('.prev')
    prevButton.classList.toggle('on', true)
    escapingClosure(() => prevButton.classList.toggle('on', false), 0.5)
  })
}
clickPrev(frame, eventBind)

const clickNext = (target, eventBind) => {
  eventBind('.next', 'click', () => {
    target.append(target.firstElementChild)
    const nextButton = $('.next')
    nextButton.classList.toggle('on', true)
    escapingClosure(() => nextButton.classList.toggle('on', false), 0.5)
  })
}
clickNext(frame, eventBind)
