const cards = document.querySelectorAll('article')
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    entry.target.classList.toggle('on', entry.isIntersecting)
  })
}, {})

cards.forEach(card => observer.observe(card))

