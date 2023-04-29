const key = ''
const list = 'PLRROPbx6xj0H9H4jmTmQ1RS1LoJkG5Jfe'
const num = 10
/* Ref: https://developers.google.com/youtube/v3/docs/?hl=ko#PlaylistItems */
const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=${key}&maxResults=${num}&playlistId=${list}`
const main = document.querySelector('main')

fetch(url)
    .then(response => response.json())
    .then(data => {
      console.log(data)
      let tags = ''
      data.items.forEach(item => {
        tags +=
            `
            <article>
              <h2>${item.snippet.title}</h2>
            </article>
            `
      })
      main.innerHTML = tags
    })
