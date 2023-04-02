// 'use strict'

const slider = document.getElementById('slider');
const ul = slider.getElementsByTagName('ul')[0];
const prev = document.getElementsByClassName('prev')[0];
const next = document.getElementsByClassName('next')[0];
let enableEvent = true;

// init
;(() => {
  ul.style.left = '-100%';
  ul.prepend(ul.lastElementChild);
  ul.style.width = `${100 * ul.children.length}%`; // dynamic ul width
  [...ul.children].forEach(el => el.style.width = `${100 / ul.children.length}%`);  // dynamic li width
})()

window.onload = () => {
  next.addEventListener('click', () => enableEvent && slideToNext(ul))
  prev.addEventListener('click', () => enableEvent && slideToPrev(ul))
}

function slideToNext(el) {
  enableEvent = false
  new Anime(el, {
    prop: 'left',
    value: '-200%',
    duration: 1500,
    callback: () => {
      el.append(el.firstElementChild);
      el.style.left = '-100%'
      enableEvent = true
    }
  })
}

function slideToPrev(el) {
  enableEvent = false
  new Anime(el, {
    prop: 'left',
    value: '0',
    duration: 1500,
    callback: () => {
      el.prepend(el.lastElementChild);
      el.style.left = '-100%'
      enableEvent = true
    }
  })
}

