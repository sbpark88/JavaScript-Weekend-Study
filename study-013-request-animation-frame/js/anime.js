import {$, eventBind, clickEventBind} from "./domUtil.js";

const btn = document.querySelector('button');
const box = document.querySelector('#box');
clickEventBind('button')(() => requestAnimationFrame(moveSquare))

const move = target => ({value, seconds}) => {
  let start = null
  const milliseconds = seconds * 1000
  return (timestamp) => {
    if (!start) start = timestamp
    let progress = timestamp - start
    if (progress < milliseconds) {
      target.style.marginLeft = `${value * progress / milliseconds}px`
      requestAnimationFrame(moveSquare)
    } else {  // 주어진 정수값에 딱 떨어지도록 하기 위해... 이렇게 안 해주면 500 입력시 499.98 이런식으로 멈춘다.
      target.style.marginLeft = `${value}px`
    }
  }
}

const moveSquare = move(box)({value: 500, seconds: 2})

