import {$, renderBeforeEnd, renderInnerHTML, renderWithTemplate} from './Render.js'
import {clickEventBind} from "./EventBinding.js";
import {apiKey} from "../../private/youtube-api.js";

const key = apiKey
const list = 'PLRROPbx6xj0H9H4jmTmQ1RS1LoJkG5Jfe'
const num = 10
/* Ref: https://developers.google.com/youtube/v3/docs/?hl=ko#PlaylistItems */
const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=${key}&maxResults=${num}&playlistId=${list}`
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

const createPopupDOM = () => {
  return `
          <aside>
            <div class="content"></div>
            <span class="close">close</span>
          </aside>
         `
}

const createPopup = () => renderBeforeEnd(body)(createPopupDOM())

// MARK: Event Binding
const popupOpenEvent = clickEventBind('main')(event => {
  event.preventDefault()
  if (!(event.target.parentNode.nodeName === 'A')) return
  const videoId = event.target.closest('a').getAttribute('href')
  createPopup()
  clickEventBind('aside')(event => {
    if (event.target.classList.contains('close')) event.currentTarget.remove()
  })
})

