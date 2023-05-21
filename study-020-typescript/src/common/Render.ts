import {pipe} from "./FP.ts"

type StringOrArray = string | string[]
type Position = 'beforebegin' | 'afterbegin' | 'beforeend' | 'afterend'

const insertHTML = (position: Position) => (el: Element) => (html: string) => el.insertAdjacentHTML(position, html)

const insertHtmlBeforeBegin = insertHTML("beforebegin")
const insertHtmlAfterBegin = insertHTML("afterbegin")
const insertHtmlBeforeEnd = insertHTML("beforeend")
const insertHtmlAfterEnd = insertHTML("afterend")

const $ = (selector: string): NodeListOf<Element> | Element => {
  const nodeList: NodeListOf<Element> = document.querySelectorAll(selector)
  return nodeList.length === 1 ? nodeList[0] : nodeList
}

const guardElement = (el: NodeListOf<Element> | Element): boolean => el instanceof Element

const arrayCheck = (something: StringOrArray): boolean => something instanceof Array
const htmlArrayRemoveComma = (arr: string[]): string => arr.join('')
const safeHtml = (html: StringOrArray): string => arrayCheck(html) ? htmlArrayRemoveComma(html as string[]) : html as string

const renderBeforeBegin = (el: Element) => (html: StringOrArray) => insertHtmlBeforeBegin(el)(safeHtml(html))
const renderAfterBegin = (el: Element) => (html: StringOrArray) => insertHtmlAfterBegin(el)(safeHtml(html))
const renderBeforeEnd = (el: Element) => (html: StringOrArray) => insertHtmlBeforeEnd(el)(safeHtml(html))
const renderAfterEnd = (el: Element) => (html: StringOrArray) => insertHtmlAfterEnd(el)(safeHtml(html))
const renderInnerHTML = (el: Element) => (html: StringOrArray) => el.innerHTML = safeHtml(html)

const renderWithTemplate = (selector: string) => (template: <T extends Object>(item: T) => string) => (jsonData: object[]) => {
  const nodeElement: NodeListOf<Element> | Element = $(selector)
  if (!guardElement(nodeElement)) return
  const attachmentTarget: Element = nodeElement as Element
  const renderWithTemplate = renderInnerHTML(attachmentTarget)
  const createJsonToHtml = (jsonData: object[]): StringOrArray => jsonData.map(item => template(item))

  return pipe(
      createJsonToHtml,
      renderWithTemplate
  )(jsonData)
}

export {
  $,
  guardElement,
  renderBeforeBegin,
  renderAfterBegin,
  renderBeforeEnd,
  renderAfterEnd,
  renderInnerHTML,
  renderWithTemplate
}
