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

---

# 3. ES6 Promise - then/catch/finally

setTimeout 은 단지 비동기 처리가 된다는걸 보기 위한 것이고... 저기서 setTimeout 을 사용할 이유가 없다. 보통 비동기로 처리되는 네트워크에서 
사용되기 때문에 복잡한 코드보다 단순하게 Promise 의 then, catch, finally 가 어떻게 동작하는지 살펴보자.

```javascript
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
```

```console
start

`success 0`
I'm callback 1 then

`success 1`
I'm callback 2 then

`success 2`
I'm callback 3 then

`fail 3`
I'm callback 4 then
finally cannot receive response and return anything

`🐹 from catch`
I'm callback 5 then
```

