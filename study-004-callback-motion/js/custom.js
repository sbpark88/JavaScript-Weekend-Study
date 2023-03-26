const main = document.getElementsByTagName('main')[0]
const btnModalOpen = document.getElementById('btnOpen')
const btnModalClose = document.getElementById('btnClose')
const contentModal = document.getElementById('contentModal')
const [_top, _right, _bottom, _left, _inner] = contentModal.children

const THOUSAND = 1000
const seconds = 0.5
const modalDuration = seconds * THOUSAND

window.addEventListener('load', () => {
  btnModalOpen.addEventListener('click', openModal)
  btnModalClose.addEventListener('click', closeModal)
})

const openModal = async e => {
  e.preventDefault()
  contentModal.style.display = 'block';
  main.classList.add('off')

  await drawModalTop()
  await drawModalRight()
  await drawModalBottom()
  await drawModalLeft()
  await drawModalInner()
}

const closeModal = e => {
  new Anime(_inner, {
    prop: 'opacity',
    value: 0,
    duration: modalDuration / 2,
    callback: () => {
      new Anime(_top, {prop: 'width', value: '0%'}),
          new Anime(_right, {prop: 'height', value: '0%'}),
          new Anime(_bottom, {prop: 'width', value: '0%'}),
          new Anime(_left, {
            prop: 'height', value: '0%', callback: () => {
              contentModal.style.display = 'none'
              main.classList.remove('off')
            }
          })
    }
  })
}

// MARK: Open Modal Functions
const drawModalTop = () => {
  return new Promise(resolve => {
    new Anime(_top, {
      prop: 'width',
      value: '100%',
      duration: modalDuration,
      callback: () => resolve()
    })
  })
}

const drawModalRight = () => {
  return new Promise(resolve => {
    new Anime(_right, {
      prop: 'height',
      value: '100%',
      duration: modalDuration,
      callback: () => resolve()
    })
  })
}

const drawModalBottom = () => {
  return new Promise(resolve => {
    new Anime(_bottom, {
      prop: 'width',
      value: '100%',
      duration: modalDuration,
      callback: () => resolve()
    })
  })
}

const drawModalLeft = () => {
  return new Promise(resolve => {
    new Anime(_left, {
      prop: 'height',
      value: '100%',
      duration: modalDuration,
      callback: () => resolve()
    })
  })
}

const drawModalInner = () => {
  return new Promise(resolve => {
    new Anime(_inner, {
      prop: 'opacity',
      value: 1,
      duration: modalDuration,
      callback: () => resolve()
    })
  })
}
