/* DOC: https://www.flickr.com/services/api/ */

import {$, renderInnerHTML} from "./Render.js";

const BASE_URL = 'https://www.flickr.com/services/rest'
const OPTIONS = {
  api_key: '',
  method: 'flickr.interestingness.getList',
  per_page: '200',
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
const imageMain = $('#list')
const objToUrlParams = obj => {
  const searchParams = new URLSearchParams()
  for (const [key, value] of Object.entries(obj)) {
    searchParams.append(key, value)
  }
  return searchParams.toString()
}

// MARK: Data
const url = `${BASE_URL}?${objToUrlParams(OPTIONS)}`
const getFlickrList = async () => {
  const response = await fetch(url)
  const data = await response.json()
  const template = createMainDOM(data)
  renderInnerHTML(imageMain)(template)
}

const _ = getFlickrList()

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
