export const isoLayout = async (imageArray, loadingBarStatus) => {
  const imgArray = imageArray
  let promiseArray = []

  const imgDefaultBuddy = `https://www.flickr.com/images/buddyicon.gif`
  imgArray.forEach(img => {
    const promise = new Promise((resolve, reject) => {
      if (img.complete) {
        resolve()
      } else {
        img.addEventListener('load', resolve)
        img.addEventListener('error', () => {
          img.src = imgDefaultBuddy
          resolve()
        })
      }
    })
    promiseArray.push(promise)
  })

  try {
    await Promise.all(promiseArray)
  } catch (error) {
    console.error(error)
  }
  sort()
  if (loadingBarStatus) loadingBarStatus(false)

  function sort() {
    // https://isotope.metafizzy.co/options.html
    // 첫 번째 파라미터: 배치될 요소들의 부모 선택자
    // 두 번째 파라미터: 설정값을 정의한 객체
    new Isotope('#list', {
      itemSelector: '.item',      // 배치가 될 자식의 클래스 명
      columnWidth: '.item',       // 배치가 될 자식의 넓이값
      transitionDuration: '.5s'   // UI 배치 모션 시간
    })
  }
}
