import {useEffect, useState} from "react";

export default function Buttons({frame, count}) {
  const [cardIndex, setCardIndex] = useState(0)
  const [throttle, setThrottle] = useState(false)

  useEffect(() => {
    frame.current.style.transform = `rotate(${360 / count * cardIndex}deg)`
  }, [cardIndex])

  return (
      <>
        <button className='root__btn-prev' style={prevStyle} onClick={buttonPrevClick}>PREV</button>
        <button className='root__btn-next' style={nextStyle} onClick={buttonNextClick}>NEXT</button>
      </>
  )

  function buttonPrevClick() {
    if (throttle) return
    setThrottling()
    setCardIndex(cardIndex + 1)
  }

  function buttonNextClick() {
    if (throttle) return
    setThrottling()
    setCardIndex(cardIndex - 1)
  }

  function setThrottling() {
    setThrottle(true)
    setTimeout(() => setThrottle(false), SECTION_TRANSITION_TIME / 2)
  }

}

const btnStyle = {
  position: 'absolute',
  top: '50%',
  marginLeft: '-300px',
  backgroundColor: 'transparent',
  border: 'none',
  font: `bold 24px/1 'arial'`,
  color: '#fff',
  cursor: 'pointer'
}
const prevStyle = {
  ...btnStyle,
  left: '50%',
  marginLeft: '-300px',
}

const nextStyle = {
  ...btnStyle,
  right: '50%',
  marginRight: '-300px'
}

const SECTION_TRANSITION_TIME = 1_000
