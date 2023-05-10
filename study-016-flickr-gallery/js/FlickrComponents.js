const imageTemplate = data => data.photos.photo.reduce((acc, curr) => acc += oneImageTemplate(curr), '')

const oneImageTemplate = item => {
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
                <span class="userId">${item.owner}</span>              
              </article>
            </div>
          </li>
          `
}

const popupForLargeImageTemplate = url => {
  return `
          <aside>
            <div class="pic">
              <img src="${url}" alt="large image">
            </div>
            <span class="close">Close</span>
          </aside>
          `
}

export {
  imageTemplate,
  popupForLargeImageTemplate
}
