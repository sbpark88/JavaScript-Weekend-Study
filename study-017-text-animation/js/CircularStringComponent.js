import {$} from "./Render.js";

const circularStringTemplate = ({text, degree, translate}) => {
  return text.reduce((template, char, index) => template += `<span style="transform: rotate(${degree * index}deg) ${translate}">${char}</span>`, '')
}

const rotateCircularString = ({
                                data: {selector, degree, translate},
                                keyframes: {direction = DIRECTION.CLOCKWISE, seconds}
                              }) => {
  const target = $(selector)
  const text = [...target.textContent]
  target.innerHTML = circularStringTemplate({text, degree, translate})
  target.animate(direction, {
    easing: 'linear',
    duration: seconds * 1000,
    iterations: Infinity
  })
}

const keyframes_rotationClockwise = [
  {transform: 'rotate(0deg)'},
  {transform: 'rotate(360deg)'}
]

const keyframes_rotationCounterClockwise = [
  {transform: 'rotate(360deg)'},
  {transform: 'rotate(0deg)'}
]

const DIRECTION = Object.freeze({
  CLOCKWISE: keyframes_rotationClockwise,
  COUNTER_CLOCKWISE: keyframes_rotationCounterClockwise
})

export {
  rotateCircularString,
  DIRECTION
}
