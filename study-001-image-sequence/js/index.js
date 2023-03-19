'use strict';

const frame = document.getElementsByClassName('body__background')[0];

let maxWidth = window.innerWidth;
window.addEventListener('resize', () => (maxWidth = window.innerWidth));

// window.addEventListener('load', () => {
//   frame.appendChild(initialImage)
//   otherImages.forEach(v => frame.appendChild(v))
//   attachBackgroundMouseEvent()
// });

/********** MARK: 배경 200개 불러오기 **********/
// pic1.jpg ~ pic200.jpg
// const backgrounds = Array.from({ length: 200 }, (_, i) => i + 1).reduce((acc, curr) => {
//   return (acc += `
//   <img src="img/pic${curr}.jpg" alt="Background Images" class="display-none"/>
//   `);
// }, '');

// frame.innerHTML = backgrounds;

const createImageSequence = ({directory, imageName, extension, display = false}) => {
  return (imageNumber) => {
    const el = document.createElement('img');
    el.setAttribute('src', `${directory}/${imageName}${imageNumber}.${extension}`);
    el.setAttribute('alt', 'BackgroundImage');
    if (!display) el.classList.add('display-none');

    return el;
  };
};
const imageConfigBlock = {
  directory: 'assets/images/background',
  imageName: 'pic',
  extension: 'jpg',
  display: true,
};
const imageConfigNone = {
  directory: 'assets/images/background',
  imageName: 'pic',
  extension: 'jpg',
};

const initialImage = createImageSequence(imageConfigBlock)(1);
const imageGenerator = createImageSequence(imageConfigNone);
const otherImages = [...Array(199)].map((v, i) => imageGenerator(i + 2)); // index 가 0 ~ 198 이므로 +2 한다.

/********** MARK: 배경 위 마우스 x축 무브 이벤트 **********/
const attachBackgroundMouseEvent = () => {
  const images = [...frame.children];

  frame.addEventListener('mousemove', (evt) => {
    let index = Math.round((evt.clientX / maxWidth) * (images.length - 1));
    images.forEach((v, i) => {
      if (i === index) {
        v.classList.remove('display-none');
      } else {
        v.classList.add('display-none');
      }
    });
  });
};

/* 2023-03-18 */
const mask = document.getElementsByTagName('aside')[0];
const percentDom = mask.getElementsByTagName('span')[0];
const loadingBar = mask.getElementsByClassName('bar')[0];

/*
1. CSS 에서 aside 에 연결되어 있는 transitionDuration 값을 가져옴 ('2.5s')
2. '2.5s' 문자값을 숫자로 변환한 뒤 1000을 곱함.
3. 숫자로 변환된 값을 return
*/

const convertFadeOutTime = (element) => {
  // https://davidwalsh.name/css-variables-javascript
  // const speed = getComputedStyle(mask)['transition-duration'];
  const speed = getComputedStyle(element)['transition-duration'];
  const changedTime = Number(speed.replaceAll('s', '')) + 1;
  document.documentElement.style.setProperty('--fade-out-seconds', `${changedTime}s`);

  return changedTime * 1000;
};

const delayTime = convertFadeOutTime(mask);

let count = 0;
let percent = 0;

frame.appendChild(initialImage);
otherImages.forEach((v) => frame.appendChild(v));

const imgDom = [...frame.getElementsByTagName('img')];
const imgDomLength = imgDom.length;

// img DOM 적용 이미지 로스 로딩 완료 될 대마다 반복
imgDom.forEach((img) => {
  img.onload = () => {
    ++count;
    percent = parseInt(`${(count / imgDomLength) * 100}`)

    percentDom.textContent = `${percent}`;
    loadingBar.style.width = `${percent}%`;

    if (count === imgDom.length) {
      console.log('모든 이미지 소스 로딩 완료시 마스크 제거');
      mask.classList.add('off');
      setTimeout(() => {
        // mask.remove();
      }, delayTime);
    }
  };
});

attachBackgroundMouseEvent();

const styles = {
  size: {
    width: 200,
    height: 200
  },
  colors: {
    fontColor: 'red',
    bgColor: 'blue'
  }
}

const {size: {width, height}, colors: {fontColor, bgColor}} = styles
console.log(width)
console.log(bgColor)

