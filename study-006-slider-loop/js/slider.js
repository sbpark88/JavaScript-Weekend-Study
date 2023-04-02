// 'use strict'

const slider = document.getElementById('slider');
const ul = slider.getElementsByTagName('ul')[0];
const prev = document.getElementsByClassName('prev')[0];
const next = document.getElementsByClassName('next')[0];
const speed = 500
let enableEvent = true;

// MARK: test data
const data = [
  { txt: 'TEXT1', bg: 'hotpink'},
  { txt: 'TEXT2', bg: 'orange'},
  { txt: 'TEXT3', bg: 'aqua'},
  { txt: 'TEXT4', bg: 'greenyellow'},
  { txt: 'TEXT5', bg: 'blue'},
]

const createDOM = (data, parentEl) => {
      let tags = '';
      data.map((v, i) => {
        tags += `<li data-index="${i + 1}" style="background-color: ${v.bg}">${v.txt}</li>`
      })
      parentEl.innerHTML = tags
    }

// init
;(() => {
  createDOM(data, ul);
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
    duration: speed,
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
    duration: speed,
    callback: () => {
      el.prepend(el.lastElementChild);
      el.style.left = '-100%'
      enableEvent = true
    }
  })
}
