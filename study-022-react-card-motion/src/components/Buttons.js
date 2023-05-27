export default function Buttons() {
  return (
      <>
        <button className='root__btn-prev' style={prevStyle}>PREV</button>
        <button className='root__btn-next' style={nextStyle}>NEXT</button>
      </>
  )
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
