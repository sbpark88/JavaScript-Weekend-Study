/* DOC: https://www.flickr.com/services/api/ */

import {$, renderInnerHTML} from "./Render.js";
import {eventBind} from "./EventBinding.js";

const BASE_URL = 'https://www.flickr.com/services/rest'
const OPTIONS = {
  api_key: '',
  method: 'flickr.interestingness.getList',
  per_page: '50',
  format: 'json',
  nojsoncallback: 1
}

OPTIONS.api_key = await (async () => {
  try {
    return (await import('../../private/flickr.js')).apiKey;
  } catch (error) {
    if (error instanceof TypeError) {
      return prompt('API Key 를 입력하세요')
    } else {
      alert('알 수 없는 에러')
    }
  }
})()
const objToUrlParams = obj => {
  const searchParams = new URLSearchParams()
  for (const [key, value] of Object.entries(obj)) {
    searchParams.append(key, value)
  }
  return searchParams.toString()
}

const url = `${BASE_URL}?${objToUrlParams(OPTIONS)}`
const searchText = $('#search')
const searchButton = $('#btnSearch')
const loading = $('.loading')
const imageMain = $('#list')

// MARK: Data

const getFlickrList = async url => {
  const response = await fetch(url)
  const data = await response.json()
  const template = createMainDOM(data)
  renderInnerHTML(imageMain)(template)
  await isoLayout(loading, imageMain)
}

const _ = getFlickrList(url)

// MARK: Render
const createMainDOM = data => {
  return data.photos.photo.reduce((acc, curr) => acc += imageComponent(curr), '')
}

const imageComponent = item => {
  // https://www.flickr.com/services/api/misc.urls.html
  const imgSrc = `https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}_m.jpg`
  const imgSrcBig = `https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}_b.jpg`
  // https://www.flickr.com/services/api/misc.buddyicons.html
  const imgBuddy = `http://farm${item.farm}.staticflickr.com/${item.server}/buddyicons/${item.owner}.jpg`
  return `
          <li class="item">
            <div>
              <a href="${imgSrcBig}">
                <img src="${imgSrc}" alt="thumbnail" class="pic" />
              </a>
              <p>${item.title}</p>
              <article class="profile">
                <img src="${imgBuddy}" alt="owner profile icon">
                <span>${item.owner}</span>              
              </article>
            </div>
          </li>
          `
}

const isoLayout = async (loadingBar, el) => {
  const imgArray = $('img')
  let promiseArray = []

  const imgDefaultBuddy = `https://www.flickr.com/images/buddyicon.gif`
  imgArray.forEach(img => {
    const promise = new Promise((resolve, reject) => {
      if (img.complete) {
        resolve()
      } else {
        img.addEventListener('load', resolve)
        img.addEventListener('error', () => {
          img.src = imgDefaultBuddy
          resolve()
        })
      }
    })
    promiseArray.push(promise)
  })

  try {
    await Promise.all(promiseArray)
  } catch (error) {
    console.error(error)
  }
  sort()
  loadingBar.classList.toggle('on', false)
  el.classList.toggle('on', true)

  function sort() {
    // https://isotope.metafizzy.co/options.html
    // 첫 번째 파라미터: 배치될 요소들의 부모 선택자
    // 두 번째 파라미터: 설정값을 정의한 객체
    new Isotope('#list', {
      itemSelector: '.item',      // 배치가 될 자식의 클래스 명
      columnWidth: '.item',       // 배치가 될 자식의 넓이값
      transitionDuration: '.5s'   // UI 배치 모션 시간
    })
  }
}

// MARK: Event Binding

const searchComponent = (loadingBar, imageSection, options, restApiUrl, inputBox) => event => {
  event.preventDefault()
  loadingBar.classList.toggle('on', true)
  imageSection.classList.toggle('on', false)

  let NEW_OPTIONS = {...options}
  NEW_OPTIONS.method = 'flickr.photos.search'

  const searchText = inputBox.value.trim()
  if (!searchText) return alert('검색어를 입력하세요')
  const url = `${BASE_URL}?${objToUrlParams(NEW_OPTIONS)}&tags=${searchText}`
  return getFlickrList(url)
}
const search = searchComponent(loading, imageMain, OPTIONS, url, searchText)


eventBind('#btnSearch', 'click', search)
eventBind('#search', 'keyup', event => {
  event.preventDefault()
  if (event.keyCode !== 13) return
  search(event)
})
