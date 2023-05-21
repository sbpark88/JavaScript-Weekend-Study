import './css/style.css'
import {$, renderBeforeEnd, renderInnerHTML, renderWithTemplate} from "./common/Render";
import {naviTpl, sliderTpl} from "./template";
import {panelList, naviList} from "./data/sample";

const app = <Element>$('#app')
renderInnerHTML(app)(`<ul class="list"></ul>`)

renderWithTemplate('.list')(sliderTpl as (item: Object) => string)(panelList)

renderBeforeEnd(app)(`<nav class="navi"></nav>`)

renderWithTemplate('.navi')(naviTpl as (item: Object) => string)(naviList)
