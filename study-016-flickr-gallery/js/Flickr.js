class Flickr {
  /* DOC: https://www.flickr.com/services/api/ */
  #BASE_URL = 'https://www.flickr.com/services/rest'

  #FLICKR_METHOD

  #options = {
    api_key: '',
    method: '',
    per_page: '',
    format: 'json',
    user_id: '',
    nojsoncallback: 1
  }

  constructor(API_KEY) {
    this.#options.api_key = API_KEY
    this.#FLICKR_METHOD = new Map()
    this.#FLICKR_METHOD[FlickrMethodType.Search] = 'flickr.photos.search'
    this.#FLICKR_METHOD[FlickrMethodType.User] = 'flickr.people.getPhotos'
    this.#FLICKR_METHOD[FlickrMethodType.Interest] = 'flickr.interestingness.getList'
  }

  #setOptions({
                method = FlickrMethodType.Interest,
                perPage = '50',
                searchText = '',
                userId = ''
              }) {
    if ('symbol' !== typeof method) throw new FlickrError('TYPE', '올바른 메서드 타입을 지정하세요.')
    this.#options.method = this.#FLICKR_METHOD[method]
    this.#options.per_page = perPage
    this.#options.tags = searchText
    this.#options.user_id = userId
  }

  #objToUrlParams(object) {
    return Object.entries(object)
        .filter(([key, value]) => validParams(value))
        .reduce((acc, [key, value]) => {
          acc.append(key, value)
          return acc
        }, new URLSearchParams()).toString()

    function validParams(value) {
      if ('number' === typeof value) return !isNaN(value)
      else if (value === undefined || value === null || value instanceof Object) return false
      else return String(value).trim().length > 0
    }
  }

  async fetchFlickr({
                        method = FlickrMethodType.Interest,
                        perPage = '50',
                        searchText = '',
                        userId = ''
                      }) {
    this.#setOptions({method, perPage, searchText, userId})
    const url = `${this.#BASE_URL}?${this.#objToUrlParams(this.#options)}`
    const response = await fetch(url)
    const data = await response.json()
    if (data.photos.total === 0) {
      throw new FlickrError('RESPONSE', '검색 결과가 없습니다.')
    }
    return data
  }
}

const FlickrMethodType = Object.freeze({
  Search: Symbol('search'),
  User: Symbol('user'),
  Interest: Symbol('interest)')
})

class FlickrError extends Error {
  constructor(type, message) {
    super(`Flickr Error ${type}: ${message}`)
    this.type = type
    this.message = message
  }
}

export {
  Flickr,
  FlickrMethodType
}
