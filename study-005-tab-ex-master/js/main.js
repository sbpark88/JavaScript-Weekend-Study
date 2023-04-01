const main = document.getElementsByTagName('main')[0]
const btnsWrapper = document.getElementById('wrapper__btns')
const btns = document.querySelectorAll(' ul li')
const boxs = main.querySelectorAll('section article')


btnsWrapper.addEventListener('click', (e) => {
  e.preventDefault()
  const index = Number(e.target.dataset.number) - 1;
  if (btns[index].classList.contains('on')) return;   // 활성 타겟 재클릭 동작 방지
  [btns, boxs].forEach(arr => activation(arr, index)) // 비활성 타겟 클릭시 동작
  changeHeight(index)
})

// MARK: TAB Click
const activation = (arr, index) => {
  console.log('activation')
  for (const el of arr) {
    el.classList.remove('on')
  }
  arr[index].classList.add('on')
}

const changeHeight = index => {
  // 해당 높이값으로 탭 프레임의 높이값 모션 적용
  new Anime(main, {
    prop: 'height',
    value: parseInt(`${getComputedStyle(boxs[index])?.height}`),
    duration: 500
  })
}
