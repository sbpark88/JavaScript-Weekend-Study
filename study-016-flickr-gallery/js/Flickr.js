class Flickr {
  #API_KEY
  #BASE_URL = 'https://www.flickr.com/services/rest'

  #options = {
    api_key: '',
    method: '',
    per_page: '',
    format: 'json',
    user_id: '',
    nojsoncallback: 1
  }

  get apiKey() {
    return this.#API_KEY
  }

  set apiKey(value) {
    this.#API_KEY = value
  }

  get options() {
    return this.#options
  }

  setOptions({
               method = FlickrMethodType.Interest,
               per_page = '50',
               user_id = ''
             }) {
    this.#options.method = this.settingFlickrMethod(method)
    this.#options.per_page = per_page
    this.#options.user_id = user_id
  }

  settingFlickrMethod(type) {
    switch (type) {
      case FlickrMethodType.Search:
        return 'flickr.photos.search'
      case FlickrMethodType.User:
        return 'flickr.people.getPhotos'
      default:
        return 'flickr.interestingness.getList'
    }
  }

  objToUrlParams(obj) {
    const searchParams = new URLSearchParams()
    for (const [key, value] of Object.entries(obj)) {
      searchParams.append(key, value)
    }
    return searchParams.toString()
  }

  generateUrl() {
    return `${this.#BASE_URL}?${this.objToUrlParams(this.#options)}`
  }

  async getFlickrList(url) {
    const response = await fetch(url)
    const data = await response.json()
    if (data.photos.total === 0) {
      throw new FlickrError('NO_DATA', '검색 결과가 없습니다.')
    }
    return data
  }
}

const FlickrMethodType = Object.freeze({
  Search: 'search',
  User: 'user',
  Interest: 'interest'
})

class FlickrError extends Error {
  constructor(type, message) {
    super(`Flickr Error ${type}: ${message}`);
    this.type = type
    this.message = message
  }
}

export {
  Flickr,
  FlickrMethodType
}
