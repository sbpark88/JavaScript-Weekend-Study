import {$, eventBind, clickEventBind} from './domUtil.js'
import {apiKey} from "../../private/youtube-api.js";

const key = apiKey
const list = 'PLRROPbx6xj0H9H4jmTmQ1RS1LoJkG5Jfe'
const num = 10
/* Ref: https://developers.google.com/youtube/v3/docs/?hl=ko#PlaylistItems */
const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=${key}&maxResults=${num}&playlistId=${list}`
const main = $('main')

// MARK: Data

const getYoutubeList = async () => {
  const response = await fetch(url)
  const data = await response.json()
  renderVideoList(data)
}
const _ = getYoutubeList()

// MARK: Render

const renderVideoList = data => {
  let tags = ''
  data.items.forEach(item => {
    const snippet = item.snippet
    const title = snippet.title.length > 50 ? snippet.title : snippet.title.slice(0, 50) + "..."
    const description = snippet.description > 100 ? snippet.description : snippet.description.slice(0, 100) + "..."
    tags +=
        `
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
  })
  main.innerHTML = tags
}

// MARK: Event Binding
clickEventBind('main')(event => {
  event.preventDefault()
  if (!(event.target.parentNode.nodeName === 'A')) return
  const videoId = event.target.closest('a').getAttribute('href')
  console.log(videoId)
})


