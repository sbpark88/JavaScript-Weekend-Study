const sliderTpl = <T extends { title: string }>(item: T): string => {
  return `<li>
            <div class="inner">
              <h2>${item.title}</h2>
            </div>
          </li>
  `
}

const naviTpl = <T extends { direction: string }>(item: T): string => {
  return `<p class="${item.direction}">
            <span></span>
          </p>
  `
}


export {
  sliderTpl,
  naviTpl
}
