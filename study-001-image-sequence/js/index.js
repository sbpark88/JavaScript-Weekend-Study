'use strict';

const frame = document.getElementsByClassName('body__background')[0];

let maxWidth = window.innerWidth;
window.addEventListener('resize', () => (maxWidth = window.innerWidth));

window.addEventListener('load', () => {
  frame.appendChild(initialImage)
  otherImages.forEach(v => frame.appendChild(v))
  attachBackgroundMouseEvent()
});

/********** MARK: 배경 200개 불러오기 **********/
// pic1.jpg ~ pic200.jpg
// const backgrounds = Array.from({ length: 200 }, (_, i) => i + 1).reduce((acc, curr) => {
//   return (acc += `
//   <img src="img/pic${curr}.jpg" alt="Background Images" class="display-none"/>
//   `);
// }, '');

// frame.innerHTML = backgrounds;

const createImageSequence = ({directory, imageName, extension, display = false}) => {
  return imageNumber => {
    const el = document.createElement('img');
    el.setAttribute('src', `${directory}/${imageName}${imageNumber}.${extension}`);
    el.setAttribute('alt', 'BackgroundImage');
    if (!display) el.classList.add('display-none');

    return el
  };
};
const imageConfigBlock = {
  directory: 'assets/images/background',
  imageName: 'pic',
  extension: 'jpg',
  display: true
}
const imageConfigNone = {
  directory: 'assets/images/background',
  imageName: 'pic',
  extension: 'jpg',
}

const initialImage = createImageSequence(imageConfigBlock)(1)
const imageGenerator = createImageSequence(imageConfigNone)
const otherImages = [...Array(199)].map((v, i) => imageGenerator(i + 2))  // index 가 0 ~ 198 이므로 +2 한다.

/********** MARK: 배경 위 마우스 x축 무브 이벤트 **********/
const attachBackgroundMouseEvent = () => {
  const images = [...frame.children];

  frame.addEventListener('mousemove', (evt) => {
    let index = Math.round(((evt.clientX / maxWidth) * (images.length - 1)));
    images.forEach((v, i) => {
      if (i === index) {
        v.classList.remove('display-none')
      } else {
        v.classList.add('display-none')
      }
    })
  });

}
