// 'use strict'

const slider = document.getElementById('slider')
const ul = slider.getElementsByTagName('ul')[0]
const prev = document.getElementsByClassName('prev')[0]
const next = document.getElementsByClassName('next')[0]

next.addEventListener('click', () => slideToNext(ul))
function slideToNext(el) {
  new Anime(el, {
    prop: 'left',
    value: '-100%',
    duration: 500,
    callback: () => {
      ul.append(ul.firstElementChild);
      ul.style.left = '0'
    }
  })
}

