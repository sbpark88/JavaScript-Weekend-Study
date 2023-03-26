const main = document.getElementsByTagName('main')[0]
const btnModalOpen = document.getElementById('btnOpen')
const btnModalClose = document.getElementById('btnClose')
const contentModal = document.getElementById('contentModal')
const [_top, _right, _bottom, _left, _inner] = contentModal.children

const THOUSAND = 1000
const seconds = 0.5
const modalDuration = seconds * THOUSAND


btnModalOpen.addEventListener('click', (e) => {
  e.preventDefault();
  contentModal.style.display = 'block';
  main.classList.add('off')

  new Anime(_top, {
    prop: 'width',
    value: '100%',
    duration: modalDuration,
    callback: () => {
      new Anime(_right, {
        prop: 'height',
        value: '100%',
        duration: modalDuration,
        callback: () => {
          new Anime(_bottom, {
            prop: 'width',
            value: '100%',
            duration: modalDuration,
            callback: () => {
              new Anime(_left, {
                prop: 'height',
                value: '100%',
                duration: modalDuration,
                callback: () => {
                  new Anime(_inner, {
                    prop: 'opacity',
                    value: 1,
                    duration: modalDuration,
                  });
                },
              });
            },
          });
        },
      });
    },
  });
})

btnModalClose.addEventListener('click', (e) => {
  e.preventDefault();
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
})
