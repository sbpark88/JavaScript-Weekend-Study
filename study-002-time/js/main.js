window.onload = () => {
  clockStart()
}

const main = document.getElementsByTagName('main')[0]
const time = document.querySelectorAll('.screen span')
const [am, pm] = document.querySelectorAll(('.screen em'))

let clock;
const THOUSAND = 1000

const getTime = () => {
  const now = new Date()
  const hr24 = now.getHours()
  const morning = hr24 < 12
  const hr12 = morning ? hr24 : hr24 - 12
  const min = now.getMinutes()
  const sec = now.getSeconds()

  const themeCondition = [
    {cond: (hr24 >= 5) && (hr24 < 11), name: 'morning'},
    {cond: (hr24 >= 11) && (hr24 < 16), name: 'afternoon'},
    {cond: (hr24 >= 16) && (hr24 < 19), name: 'evening'},
    {cond: (hr24 >= 19) || (hr24 < 5), name: 'night'}
  ]

  return {morning, themeCondition, time: [hr12, min, sec]}
}

const setTheme = theme => {
  theme.forEach(v => {
    if (v.cond) {
      main.className = ''
      main.classList.add((v.name))
    }
  })
}

const setAmPm = morning => {
  if (morning) {
    am.classList.add('on')
    pm.classList.remove('on')
  } else {
    am.classList.remove('on')
    pm.classList.add('on')
  }
}
const setClock = (timeData) => time.forEach((v, i) => v.innerText = setPad(timeData[i]))

const setClockTextColor = () => main.classList.contains('afternoon') ? main.classList.add('dark_text') : main.classList.remove('dark_text')

const clockStart = () => {
  clock = setInterval(() => {
    const {morning, themeCondition: theme, time} = getTime()
    setTheme(theme)
    setAmPm(morning)
    setClock(time)
    setClockTextColor()
  }, THOUSAND)
}
const clockStop = () => clearInterval(clock)

const setPad = number => String(number).padStart(2, '0')
// number < 10 && (number = '0' + number)

