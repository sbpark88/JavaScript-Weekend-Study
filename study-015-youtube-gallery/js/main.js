import {$, renderBeforeEnd, renderInnerHTML} from './Render.js'
import {clickEventBind} from "./EventBinding.js";

const apiKey = await (async () => {
  try {
    return (await import('../../private/youtube-api.js')).apiKey;
  } catch (error) {
    if (error instanceof TypeError) {
      return prompt('API Key 를 입력하세요')
    } else {
      alert('알 수 없는 에러')
    }
  }
})()

const list = 'PLRROPbx6xj0H9H4jmTmQ1RS1LoJkG5Jfe'
const num = 10
/* Ref: https://developers.google.com/youtube/v3/docs/?hl=ko#PlaylistItems */
const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=${apiKey}&maxResults=${num}&playlistId=${list}`
const main = $('main')
const body = $('body')

// MARK: Data

const getYoutubeList = async () => {
  const response = await fetch(url)
  const data = await response.json()
  const template = createMainDOM(data)
  renderInnerHTML(main)(template)
}

const _ = getYoutubeList()

// MARK: Render

const createMainDOM = data => {
  return data.items.reduce((acc, curr) => acc += videoComponent(curr), '')
}

const videoComponent = item => {
  const snippet = item.snippet
  const title = snippet.title.length > 50 ? snippet.title : snippet.title.slice(0, 50) + "..."
  const description = snippet.description > 100 ? snippet.description : snippet.description.slice(0, 100) + "..."
  return `
          <article>
            <a class="picture" href="${snippet.resourceId.videoId}">
              <img src="${snippet.thumbnails.standard.url}" alt=${title}>
            </a>
            <div class="content">
              <h3>Title:  ${title}</h3>
              <p>${description}</p>
              <span>${snippet.publishedAt.slice(0, 10)}</span>
            </div>
          </article>
         `
}

const createPopupDOM = videoId => {
  return `
          <aside>
            <div class="content">
              <iframe src="https://www.youtube.com/embed/${videoId}" width="100%" height="100%"></iframe>
            </div>
            <span class="close">CLOSE</span>
          </aside>
         `
}

const createPopup = videoId => renderBeforeEnd(body)(createPopupDOM(videoId))

// MARK: Event Binding

const popupOpenEvent = clickEventBind('main')(event => {
  event.preventDefault()
  if (!(event.target.parentNode.nodeName === 'A')) return
  const videoId = event.target.closest('a').getAttribute('href')
  createPopup(videoId)
  document.body.style.overflow = 'hidden'
  // COMMENT: on 이 없는 상태로 DOM 이 생성되고, 이후 on 이 추가되도록 비동기로 동작해야한다.
  //          현재 이 Closure context 가 Synchronous 일 뿐 아니라 아래 classList.toggle 역시 Synchronous Function 이다.
  //          따라서 이를 비동기 처리 하려면 Closure 를 async 로 바꾸고, 아래 로직을 강제로 Promise 반환하도록 해 비동기 처리를 해야한다.
  //          이런 경우 가장 간단히 처리할 수 있는 방법이 아래와 같이 강제로 setTimeout 을 이용해 callback queue 로 내보내
  //          escaping closures 로 동작시키는 것이다.
  setTimeout(() => $('aside').classList.toggle('on', true), 0)
  clickEventBind('aside')(event => {
    if (!event.target.classList.contains('close')) return
    event.currentTarget.remove()
    document.body.style.overflow = 'auto'
    setTimeout(() => $('aside').classList.toggle('on', false), 0)
  })
})
