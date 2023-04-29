import {$} from "./Render.js";

const eventBind = el => eventType => listener => $(el).addEventListener(eventType, listener)
const clickEventBind = el => listener => $(el).addEventListener('click', listener)

export {
  eventBind,
  clickEventBind,
}
