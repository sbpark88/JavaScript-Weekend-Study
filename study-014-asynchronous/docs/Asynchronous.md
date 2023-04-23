# 1. ES5 Callback Hell

```javascript
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
```

```console
start
I'm callback 1.
I'm callback 2.
I'm callback 3.
I'm callback 4.
I'm callback 5.
end
```

🥶🥶🥶

---

# 2. ES6 Promise

```javascript
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
```

```console
start
I'm callback 1.
I'm callback 2.
I'm callback 3.
I'm callback 4.
`fail`
I'm callback 5.
end
```

🥵🥵🥵
