const buttons = [...document.getElementsByClassName('section__btn')]

buttons[0].addEventListener('click', (event) => {
  const animeTarget = event.currentTarget.nextElementSibling
  new Anime(animeTarget, {
        prop: 'width',
        value: '40',  /* string type : % */
        duration: 1000,
        callback: () => {
          new Anime(animeTarget, {
            prop: 'height',
            value: 400, /* number type : px*/
            duration: 500
          })
        }
      }
  )
})

buttons[1].addEventListener('click', (event) => {
  const animeTarget = event.currentTarget.nextElementSibling
  new Anime(animeTarget, {
        prop: 'margin-left',
        value: '40',  /* string type : % */
        duration: 1000,
        callback: () => {
          new Anime(animeTarget, {
            prop: 'margin-top',
            value: 400, /* number type : px*/
            duration: 500
          })
        }
      }
  )
})
