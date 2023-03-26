const viewContentButton = document.getElementById('btnOpen')
const contentModal = document.getElementById('contentModal')
const [_top, _right, _bottom, _left, _inner] = contentModal.children

const THOUSAND = 1000
const seconds = 0.5
const modalDuration = seconds * THOUSAND


viewContentButton.addEventListener('click', (e) => {
  e.preventDefault();
  contentModal.style.zIndex = '1';

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
