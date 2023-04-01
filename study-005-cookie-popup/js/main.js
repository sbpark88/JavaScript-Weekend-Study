// Cookie 는 사용자 컴퓨터에 물리적인 형태로 저장하는 경량의 텍스트 자료
// key=value 형식으로 저장. 쿠키 생성시 쿠키 제거 시간을 설정.
// name=value; path=/; expires=만료일;
// document.cookie 에서 확인 가능.

const btnView = document.getElementsByClassName('btnView')[0]
const btnDelete = document.getElementsByClassName('btnDelete')[0]
const btnCreate = document.getElementsByClassName('btnCreate')[0]

const popup = document.querySelector(('.popup'))
const btnClose = document.querySelector('.close')
const checkInput = popup.querySelector('input[type=checkbox]')

let cookieData = document.cookie

// 정규표현식 없이 이렇게도 있는지 없는지 확인 가능.
if (cookieData.indexOf('today=done') < 0) {
  console.log('쿠키 없음')
  popup.style.display = 'block'
} else {
  console.log('쿠키 있음')
  popup.style.display = 'none'
}

// 닫기 버튼 클릭시 체크 박스 활성화 유무 확인
btnClose.addEventListener('click', (e) => {
  e.preventDefault()
  if (checkInput.checked) createCookie({key: 'today', value: 'done'})
  popup.style.display = 'none'
})

btnView.addEventListener('click', () => {
  console.log(document.cookie)
})
btnDelete.addEventListener('click', () => {
  console.log('쿠키 삭제')
  deleteCookie({key: 'today', value: 'done'})
})

btnCreate.addEventListener('click', () => {
  console.log('쿠키 생성')
  createCookie({key: 'today', value: 'done'})
})
const defineCookie = ({key, value, expires}) => {
  document.cookie = `${key}=${value}; path=/; expires=${expires}`
}

const createCookie = ({key, value}) => {
  const expires = setCookieExpires(1)
  defineCookie({key: 'today', value: 'done', expires: expires})
}

const deleteCookie = ({key, value}) => {
  const expires = setCookieExpires(0)
  defineCookie({key: key, value: value, expires: expires})
}

const setCookieExpires = (days = 1) => {
  let today = new Date()
  let dueDate = today.getDate() + days
  today.setDate(dueDate)
  return today.toGMTString()
}
