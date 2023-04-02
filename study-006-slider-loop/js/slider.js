// 'use strict'

const slider = document.getElementById('slider')
const ul = slider.getElementsByTagName('ul')[0]
const prev = document.getElementsByClassName('prev')[0]
const next = document.getElementsByClassName('next')[0]

// init
;(() => {
  ul.style.left = '-100%';
  ul.prepend(ul.lastElementChild);
  ul.style.width = `${100  * ul.children.length}%`; // dynamic ul width
  [...ul.children].forEach(el => el.style.width = `${100 / ul.children.length}%`);  // dynamic li width
})()

next.addEventListener('click', () => slideToNext(ul))
prev.addEventListener('click', () => slideToPrev(ul))

function slideToNext(el) {
  new Anime(el, {
    prop: 'left',
    value: '-200%',
    duration: 1500,
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
    duration: 1500,
    callback: () => {
      el.prepend(el.lastElementChild);
      el.style.left = '-100%'
    }
  })
}

