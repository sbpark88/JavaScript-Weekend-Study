import {$} from "./Render";
import {curry} from "./FP";

const _eventBind = (selector: string,
                    eventType: keyof ElementEventMap,
                    listener: EventListenerOrEventListenerObject) => {
  const nodeElement: NodeListOf<Element> | Element = $(selector)
  switch (true) {
    case nodeElement instanceof NodeList:
      return eventBindNodeList(<NodeListOf<Element>>nodeElement, eventType, listener)
    case nodeElement instanceof Element:
      return eventBindOneLode(<Element>nodeElement, eventType, listener)
    default:
      return
  }
}

const eventBindNodeList = (els: NodeListOf<Element>,
                           eventType: keyof ElementEventMap,
                           listener: EventListenerOrEventListenerObject) => els.forEach(el => el.addEventListener(eventType, listener))
const eventBindOneLode = (el: Element,
                          eventType: string,
                          listener: EventListenerOrEventListenerObject) => el.addEventListener(eventType, listener)
const eventBind = curry(_eventBind)

export {
  eventBind
}
