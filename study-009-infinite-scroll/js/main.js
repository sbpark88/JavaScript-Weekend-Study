const cardWrap = document.querySelector('section')
const cards = document.querySelectorAll('article')

// MARK: Observer
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    entry.target.classList.toggle('on', entry.isIntersecting)
  })
}, {
  threshold: .5
  // rootMargin: '-140px'
})

cards.forEach(card => observer.observe(card))

function loadCards() {
  let i = 1
  do {
    const card = document.createElement('article')
    card.classList.add(`card${i}`)
    card.textContent = 'Box Created'
    observer.observe(card)
    cardWrap.append(card)
    i++
  } while (i < 9)
  attachLoadCards()
}

// MARK: Call more card observer (observing last card)
const lastCardObserver = new IntersectionObserver((entries) => {
  const lastCard = entries[0]
  if (lastCard.isIntersecting) {
    loadCards()
    lastCardObserver.unobserve(lastCard.target)
  }
})

const attachLoadCards = () => lastCardObserver.observe(document.querySelector('article:last-child'))
attachLoadCards()
