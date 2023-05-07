/* DOC: https://www.flickr.com/services/api/ */

import {$, renderInnerHTML} from "./Render.js";

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
const imageMain = $('#list')
const loading = $('.loading')

// MARK: Data

const getFlickrList = async () => {
  const response = await fetch(url)
  const data = await response.json()
  const template = createMainDOM(data)
  renderInnerHTML(imageMain)(template)
  await isoLayout(loading, imageMain)
}

const _ = getFlickrList()

// MARK: Render
const createMainDOM = data => {
  return data.photos.photo.reduce((acc, curr) => acc += imageComponent(curr), '')
}

const imageComponent = item => {
  // https://www.flickr.com/services/api/misc.urls.html
  const imgSrc = `https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}_m.jpg`
  const imgSrcBig = `https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}_b.jpg`
  return `
          <li class="item">
            <div>
              <a href="${imgSrcBig}">
                <img src="${imgSrc}" />
              </a>
              <p>${item.title}</p>
            </div>
          </li>
          `
}

const isoLayout = async (loadingBar, el) => {
  const imgArray = [...document.getElementsByTagName('img')]
  let promiseArray = []

  imgArray.forEach(img => {
    const promise = new Promise((resolve, reject) => {
      if (img.complete) {
        resolve()
      } else {
        img.addEventListener('load', resolve)
        img.addEventListener('error', reject)
      }
    })
    promiseArray.push(promise)
  })

  try {
    await Promise.all(promiseArray)
    sort()
    loadingBar.classList.toggle('on', false)
    el.classList.toggle('on', true)
  } catch (error) {
    console.error('isoLayout error', error)
  }

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
