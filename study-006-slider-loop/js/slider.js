// 'use strict'

const slider = document.getElementById('slider')
const ul = slider.getElementsByTagName('ul')[0]
const prev = document.getElementsByClassName('prev')[0]
const next = document.getElementsByClassName('next')[0]

next.addEventListener('click', () => slideToNext(ul))
prev.addEventListener('click', () => slideToPrev(ul))

function slideToNext(el) {
  new Anime(el, {
    prop: 'left',
    value: '-200%',
    duration: 5000,
    callback: () => {
      el.append(el.firstElementChild);
      el.style.left = '-100%'
    }
  })
}

function slideToPrev(el) {
  new Anime(el, {
    prop: 'left',
    value: '0',
    duration: 5000,
    callback: () => {
      el.prepend(el.lastElementChild);
      el.style.left = '-100%'
    }
  })
}

