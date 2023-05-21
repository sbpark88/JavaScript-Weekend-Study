import './css/style.css'
import {$, renderBeforeEnd, renderInnerHTML, renderWithTemplate} from "./common/Render";
import {naviTpl, sliderTpl} from "./template";
import {panelList, naviList} from "./data/sample";
import {eventBind} from "./common/EventBinding";
import {escapingClosure} from "./common/CommonUtils";

// MARK: Initial Render
const app = <Element>$('#app')
renderInnerHTML(app)(`<ul class="list"></ul>`)
renderWithTemplate('.list')(sliderTpl as (item: Object) => string)(panelList)

renderBeforeEnd(app)(`<nav class="navi"></nav>`)
renderWithTemplate('.navi')(naviTpl as (item: Object) => string)(naviList)

// MARK: Event Binding
const frame = <Element>$('.list')
const clickPrev = (target: Element, eventBind: any) => {
  eventBind('.prev', 'click', () => {
    target.prepend(target?.lastElementChild!)
    const prevButton = <Element>$('.prev')
    prevButton.classList.toggle('on', true)
    escapingClosure(() => prevButton.classList.toggle('on', false), 0.5)
  })
}
clickPrev(frame, eventBind)

const clickNext = (target: Element, eventBind: any) => {
  eventBind('.next', 'click', () => {
    target.append(target?.firstElementChild!)
    const nextButton = <Element>$('.next')
    nextButton.classList.toggle('on', false)
    escapingClosure(() => nextButton.classList.toggle('on', false), 0.5)
  })
}
clickNext(frame, eventBind)
