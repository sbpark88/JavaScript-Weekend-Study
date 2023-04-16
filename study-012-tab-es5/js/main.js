var tab = document.querySelector('#tab');
var btns = tab.querySelectorAll('ul li');
var boxs = tab.querySelectorAll('article div');

addTabEvent()
function addTabEvent() {
  btns.forEach(function (btn, idx) {
    btn.addEventListener('click', function () {
      [btns, boxs].forEach((el) => activation(el, idx));
    });
  });
}

function activation(arr, idx) {
  arr.forEach(function (el) {
    el.classList.remove('on');
  });
  arr[idx].classList.add('on');
}
