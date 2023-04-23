const delay = 1000
const es_promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('success')
  }, delay)
})

console.log('start')

es_promise
    .then(response => {
      console.log("I'm callback 1.")
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve('success')
        }, delay)
      })
    })
    .then(response => {
      console.log("I'm callback 2.")
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve('success')
        }, delay)
      })
    })
    .then(response => {
      console.log("I'm callback 3.")
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          reject('fail')
        }, delay)
      })
    })
    .then(response => {
      console.log("I'm callback 4.")
      console.debug(response)
    })
    .catch(response => {
      console.log("I'm callback 4.")
      console.debug(response)
    })
    .finally(() => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve('success')
        }, delay)
      })
    })
    .then(response => {
      console.log("I'm callback 5.")
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve('success')
        }, delay)
      })
    })
    .finally(() => console.log('end'))
