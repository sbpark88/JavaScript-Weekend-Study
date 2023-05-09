import {$, renderInnerHTML} from "./Render.js";
import {eventBind} from "./EventBinding.js";
import {Flickr, FlickrMethodType} from "./Flickr.js";
import {imageTemplate} from "./FlickrComponents.js";
import {isoLayout} from "./Isotope.js";

const searchText = $('#search')
const loading = $('.loading')
const imageMain = $('#list')

// MARK: init

const flickr = new Flickr(await (async () => {
  try {
    return (await import('../../private/flickr.js')).apiKey;
  } catch (error) {
    if (error instanceof TypeError) {
      return prompt('API Key 를 입력하세요')
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

const _ = await requestFlickr()

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
  if (!searchText) return alert('검색어를 입력하세요')
  return requestFlickr({
    method: FlickrMethodType.Search,
    searchText: searchText
  })
}
const imageSearchByUserComponent = event => {
  if (event.target.className !== 'userId') return
  return requestFlickr({
    method: FlickrMethodType.User,
    userId: event.target.textContent
  })
}

// 검색 키워드를 이용한 데이터 요청
const getImagesBySearch = imageSearchByKeywordComponent(searchText)
// 특정 유저의 사진 목록 조회
const getImagesByUser = imageSearchByUserComponent
// Interest(기본값)으로 이미지 조회
const getInterestImages = requestFlickr

// MARK: Event Binding

eventBind('#btnSearch', 'click', getImagesBySearch)
eventBind('#search', 'keyup', event => {
  event.preventDefault()
  if (event.keyCode !== 13) return
  const _ = getImagesBySearch()
})

eventBind('#btnInterest', 'click', getInterestImages)

eventBind('main', 'click', event => {
  event.preventDefault()
  if (event.target.className !== 'userId') return
  const _ = getImagesByUser(event)
})
