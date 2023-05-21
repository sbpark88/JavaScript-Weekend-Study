// const sliderTpl = <T extends {title: string}>(item: T): string => {
const sliderTpl = <T extends {title: string}>(item: T): string => {
  return `<li>
            <div class="inner">
              <h2>${item.title}</h2>
            </div>
          </li>
  `
}

export {
  sliderTpl
}
