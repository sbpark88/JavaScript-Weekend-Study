import {$, renderBeforeEnd, renderInnerHTML} from "./Render.js";
import {eventBind} from "./EventBinding.js";
import {Flickr, FlickrMethodType} from "./Flickr.js";
import {imageTemplate, popupForLargeImageTemplate} from "./FlickrComponents.js";
import {isoLayout} from "./Isotope.js";
import {escapingClosure} from "../../study-015-youtube-gallery/js/CommonUtils.js";

const MY_PHOTO_STREAM_ID = '186014471@N03'
const body = $('body')
const searchText = $('#search')
const loading = $('.loading')
const imageMain = $('#list')

// MARK: init

const flickr = new Flickr(await (async () => {
  try {
    return (await import('../../private/flickr.js')).apiKey;
  } catch (error) {
    if (error instanceof TypeError) {
      return prompt('API Key 를 입력하세요.')
    } else {
      alert('알 수 없는 에러')
    }
  }
})())

// MARK: Render
const loadingBarComponent = (loadingBar, imageSection) => show => {
  loadingBar.classList.toggle('on', show)
  imageSection.classList.toggle('on', !show)
}
const loadingBarStatus = loadingBarComponent(loading, imageMain)
const clearSearchText = () => (searchText.value = '')
const render = renderInnerHTML(imageMain)

// MARK: Data

const data = await flickr.fetchFlickr({
  method: FlickrMethodType.Interest,
})

async function requestFlickr({method, perPage, searchText, userId} = {}) {
  loadingBarStatus(true)
  try {
    const data = await flickr.fetchFlickr({method, perPage, searchText, userId})
    const template = imageTemplate(data)
    render(template)
    await isoLayout($('img'), loadingBarStatus)

    loadingBarStatus(false)
    if (searchText === undefined || searchText.trim().length === 0) clearSearchText()
  } catch (error) {
    alert(error.message)
    loadingBarStatus(false)
  }
}

// MARK: Methods
const imageSearchByKeywordComponent = inputText => () => {
  const searchText = inputText.value.trim()
  if (!searchText) return alert('검색어를 입력하세요.')
  return requestFlickr({
    method: FlickrMethodType.Search,
    searchText: searchText
  })
}

const imageSearchByUserComponent = userId => {
  if (!userId) return alert('사용자 아이디가 누락되었습니다.')
  return requestFlickr({
    method: FlickrMethodType.User,
    userId: userId
  })
}

// 검색 키워드를 이용한 데이터 요청
const getImagesBySearch = imageSearchByKeywordComponent(searchText)
// 특정 유저의 사진 목록 조회
const getImagesByUser = imageSearchByUserComponent
// Interest(기본값)으로 이미지 조회
const getInterestImages = requestFlickr

// MARK: Event Binding

// 1. Search
eventBind('#btnSearch', 'click', getImagesBySearch)
eventBind('#search', 'keyup', event => {
  event.preventDefault()
  if (event.keyCode !== 13) return
  const _ = getImagesBySearch()
})

// 2. Interest
eventBind('#btnInterest', 'click', getInterestImages)

// 3. User
eventBind('main', 'click', event => {
  event.preventDefault()
  const targetClass = event.target.className
  if (targetClass !== 'userId' && targetClass !== 'pic') return
  if (targetClass === 'userId') getImagesByUser(event.target.textContent)
  if (targetClass === 'pic') popupForLargeImage(event.target.parentElement.getAttribute('href'))
})

const popupForLargeImage = url => {
  renderBeforeEnd(body)(popupForLargeImageTemplate(url))
  const aside = $('aside')
  document.body.style.overflow = 'hidden'
  escapingClosure(() => aside.classList.toggle('on', true))
  eventBind('aside > span.close', 'click', () => {
    aside.classList.toggle('on', false)
    document.body.style.overflow = 'auto'
    escapingClosure(() => aside.remove(), 1)
  })
}

eventBind('#btnMine', 'click', () => getImagesByUser(MY_PHOTO_STREAM_ID))

// MARK: Initial Page
// COMMENT: module 방식에 defer 라서 window.onload 나 window.addEventListener 가 안 먹힌다.
//         `load` 이벤트는 DOM Rendering 을 위해 기다리는 이벤트인데 이미 다 그렸기 때문에
//         굳이 이 JavaScript 파일을 끝까지 기다릴 필요가 없어졌기 때문.

const _ = getImagesByUser(MY_PHOTO_STREAM_ID)
