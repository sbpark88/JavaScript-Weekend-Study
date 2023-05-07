import {$} from "./Render.js";
import {curry} from "./FP.js";

const _eventBind = (el, eventType, listener) => $(el).addEventListener(eventType, listener)
const eventBind = curry(_eventBind)

export {
  eventBind
}
