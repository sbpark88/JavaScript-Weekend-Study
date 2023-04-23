const delay = 1000
function es5_callback_hell(delay, callback) {
  setTimeout(function () {
    callback()
  }, delay)
}

console.log('start')

es5_callback_hell(delay, function () {
  console.log("I'm callback 1.")
  es5_callback_hell(delay, function () {
    console.log("I'm callback 2.")
    es5_callback_hell(delay, function () {
      console.log("I'm callback 3.")
      es5_callback_hell(delay, function () {
        console.log("I'm callback 4.")
        es5_callback_hell(delay, function () {
          console.log("I'm callback 5.")
          console.log('end')
        })
      })
    })
  })
})

