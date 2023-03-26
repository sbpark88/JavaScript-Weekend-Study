const panelWrapper = document.getElementsByClassName('panel')[0]
const panels = [...panelWrapper.getElementsByTagName('div')]

const ring = document.getElementById('ring')

const buttonWrapper = document.getElementsByClassName('btn')[0]
const buttons = [...buttonWrapper.getElementsByTagName('li')]

const THOUSAND = 1000
const seconds = 1
const motionTime = THOUSAND * seconds

buttonWrapper.addEventListener('click', (evt) => {
  // condition 1 : '<ul class="btn">'이 아닌 '<li class="btn-wrapper__btn-number"></li>'가 클릭된 게 맞는가?
  // condition 2 : 현재 활성 상태가 아닌가?(= on 이 아닌가?)
  if ((buttons.some(v => v === evt.target)) && (!evt.target.classList.contains('on'))) {
    const btnIndex = Number(evt.target.dataset.number)
    slidePanels(btnIndex)
    rotateRing(btnIndex)
    setButtonToggle(btnIndex)
  }
})

const slidePanels = index => {
  new Anime(panelWrapper, {
    prop: 'margin-left',
    value: `${index * (-100)}`,
    duration: motionTime
  })
}

const rotateRing = index => {
  ring.className = `rot${index}`
}
const setButtonToggle = index => {
  buttons.forEach((v, i) => {
    i === index
        ? (v.classList.add('on'))
        : (v.classList.remove('on'))
  })
}
