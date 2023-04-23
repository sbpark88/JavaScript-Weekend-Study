const delay = 1000
const es_promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('success 0')
  }, delay)
})

console.log('start')

es_promise
    .then(response => {
      console.debug(response)
      console.log("I'm callback 1 then")
      return 'success 1'
    })
    .then(response => {
      console.debug(response)
      console.log("I'm callback 2 then")
      return Promise.resolve('success 2')
    })
    .then(response => {
      console.debug(response)
      console.log("I'm callback 3 then")
      return Promise.reject('fail 3')
    })
    .then(response => {
      console.debug(response)
      console.log("I'm callback 4 then")
      return "🐶 from then"
    })
    .catch(response => {
      console.debug(response)
      console.log("I'm callback 4 catch")
      return "🐹 from catch"
    })
    .finally(() => {
      console.log('finally cannot receive response and return anything')
      return "🐵 from finally"
    })
    .then(response => {
      console.debug(response)
      console.log("I'm callback 5 then")
    })
