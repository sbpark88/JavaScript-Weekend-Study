import {$, renderBeforeEnd, renderInnerHTML} from './Render.js'
import {clickEventBind} from "./EventBinding.js";

export default class Youtube {

  #apiKey

  constructor(attachmentTarget, playList, listCount = 10) {
    // MARK: Dynamic data
    this.attachmentTarget = $(attachmentTarget)
    this.playList = playList
    this.listCount = listCount

    // MARK: Fixed data
    this.body = $('body')

    // MARK: Initializers
    this.getApiKey().then()
  }

  get url() {
    return `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=${this.#apiKey}&maxResults=${this.listCount}&playlistId=${this.playList}`
  }

  async getApiKey() {
    this.#apiKey = await (async () => {
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
    await this.getYoutubeList()
  }

  // MARK: Data
  async getYoutubeList() {
    const response = await fetch(this.url)
    const data = await response.json()
    const template = this.createMainDOM(data)
    renderInnerHTML(this.attachmentTarget)(template)
  }

  // MARK: Render
  createMainDOM(data) {
    return data.items.reduce((acc, curr) => acc += this.videoComponent(curr), '')
  }

  videoComponent(item) {
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

  createPopupDOM(videoId) {
    return `
          <aside>
            <div class="content">
              <iframe src="https://www.youtube.com/embed/${videoId}" width="100%" height="100%"></iframe>
            </div>
            <span class="close">CLOSE</span>
          </aside>
         `
  }

  createPopup(videoId) {
    renderBeforeEnd(this.body)(this.createPopupDOM(videoId))
  }

  // MARK: Event Binding

  popupOpenEvent() {
    clickEventBind('main')(event => {
      event.preventDefault()
      if (!(event.target.parentNode.nodeName === 'A')) return
      const videoId = event.target.closest('a').getAttribute('href')
      this.createPopup(videoId)
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
  }

}
