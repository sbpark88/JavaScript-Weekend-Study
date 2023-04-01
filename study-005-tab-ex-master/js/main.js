const main = document.getElementsByTagName('main')[0]
const btns = document.querySelectorAll(' ul li')
const boxs = main.querySelectorAll('section article')

btns.forEach((el, idx) => {
  el.addEventListener('click', (e) => {
    e.preventDefault();

    for (const btn of btns) btn.classList.remove('on');
    btns[idx].classList.add('on');

    for (const box of boxs) box.classList.remove('on');
    boxs[idx].classList.add('on');
  });
});
