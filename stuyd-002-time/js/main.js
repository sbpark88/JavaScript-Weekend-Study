window.onload = () => {
  clockStart()
}

const time = document.querySelectorAll('.screen span')
const [ am, pm ] = document.querySelectorAll(('.screen em'));

let clock;
const THOUSAND = 1000;

const getTime = () => {
  const now = new Date()
  let hr = now.getHours()
  const morning = hr < 12
  hr = morning ? hr : hr - 12
  const min = now.getMinutes()
  const sec = now.getSeconds()

  return { morning, hr, min, sec }
}

const setMorning = morning => {
  if (morning) {
    am.classList.add('on')
    pm.classList.remove('on')
  } else {
    am.classList.remove('on')
    pm.classList.add('on')
  }
}
const setClock = (timeData) => {
  time.forEach((v, i) => v.innerText = setPad(timeData[i]))
}

const clockStart = () => {
  clock = setInterval(() => {
    const { morning, hr, min, sec } = getTime()
    setMorning(morning)
    setClock([hr, min, sec])
  }, THOUSAND)
}
const clockStop = () => {
  clearInterval(clock);
}

const setPad = number => String(number).padStart(2, '0')
// number < 10 && (number = '0' + number)

