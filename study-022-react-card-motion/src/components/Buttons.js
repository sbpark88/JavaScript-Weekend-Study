import {useState} from "react";

export default function Buttons({prevClickEvt, nextClickEvt}) {
  const [throttle, setThrottle] = useState(false)

  return (
      <>
        <button className='root__btn-prev' style={prevStyle} onClick={buttonPrevClick}>PREV</button>
        <button className='root__btn-next' style={nextStyle} onClick={buttonNextClick}>NEXT</button>
      </>
  )

  function buttonPrevClick() {
    if (throttle) return
    setThrottling()
    prevClickEvt()
  }

  function buttonNextClick() {
    if (throttle) return
    setThrottling()
    nextClickEvt()
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
