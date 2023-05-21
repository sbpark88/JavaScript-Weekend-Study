import './css/style.css'
import {$, renderInnerHTML, renderWithTemplate} from "./common/Render";
import {sliderTpl} from "./template";
import {pannelList} from "./data/sample";

const app = <Element>$('#app')
renderInnerHTML(app)(`
  <ul class="list">
  </ul>
`)

renderWithTemplate('.list')(sliderTpl as ((item: Object) => string))(pannelList)
