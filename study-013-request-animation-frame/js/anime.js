import {$, eventBind, clickEventBind} from "./domUtil.js";

const anime = (selector, options = {prop: '', value: 0, seconds: 0}, callback) => {
  const target = $(selector)
  if (!target || !options.prop) return
  let start = null
  const milliseconds = options.seconds * 1000
  const run = (timestamp = null) => {
    if (!start) start = timestamp
    let progress = timestamp - start
    if (progress < milliseconds) {
      target.style[options.prop] = `${options.value * progress / milliseconds}px`
      requestAnimationFrame(run)
    } else {
      target.style[options.prop] = `${options.value}px`
      if (callback instanceof Function) callback()
    }
  }
  return run
}

const moveSquare = anime('#box', {prop: 'margin-left', value: 500, seconds: 2})
clickEventBind('button')(() => moveSquare())
