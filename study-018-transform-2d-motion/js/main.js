'use strict'

import {$} from './Render.js'
import {eventBind} from "./EventBinding.js";

const frame = $('section')
const boxes = $('article')
const prev = $('.prev')
const next = $('.next')


// MARK: Event Binding
const clickPrev = (target, eventBind) => {
  eventBind('.prev', 'click', () => {
    target.prepend(target.lastElementChild)
  })
}
clickPrev(frame, eventBind)

const clickNext = (target, eventBind) => {
  eventBind('.next', 'click', () => {
    target.append(target.firstElementChild)
  })
}
clickNext(frame, eventBind)
