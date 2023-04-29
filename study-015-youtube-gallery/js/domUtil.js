const $ = selector => {
  const nodeList = document.querySelectorAll(selector)
  return nodeList.length === 1 ? nodeList[0] : nodeList
}

const eventBind = el => eventType => listener => $(el).addEventListener(eventType, listener)
const clickEventBind = el => listener => $(el).addEventListener('click', listener)

export {
  $,
  eventBind,
  clickEventBind
}
