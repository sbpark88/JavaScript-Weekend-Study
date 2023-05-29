const cards = document.querySelectorAll('article')
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    entry.target.classList.toggle('on', entry.isIntersecting)
  })
}, {
  // threshold: .5
  rootMargin: '-140px'
})

cards.forEach(card => observer.observe(card))
