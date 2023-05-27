import '../scss/section/_card.scss'

export default function Card({title, index, count}) {
  const style = {
    transform: `rotate(${360 / count * index}deg) translateY(-180%)`
  }

  return (
      <article style={style}>
        <div className='inner'>
          <div className='pic'>
            <img src={`${process.env.PUBLIC_URL}/img/${title}.jpg`} alt="{title}"/>
          </div>
          <h2>{title}</h2>
        </div>
      </article>
  )
}
