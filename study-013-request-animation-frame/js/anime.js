import {$, eventBind, clickEventBind} from "./domUtil.js";

const btn = document.querySelector('button');
const box = document.querySelector('#box');
let num = 0;
clickEventBind('button')(() => requestAnimationFrame(moveSquare))

const move = target => () => {
  if (num < 200) {
    ++num
    requestAnimationFrame(moveSquare)
  }
  console.log(`${num}px`)
  target.style.marginLeft = `${num}px`
}

const moveSquare = move(box)
