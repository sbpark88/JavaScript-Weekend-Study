import '../scss/section/_card.scss'

export default function Card({title}) {
  return (
      <article>
        <div className='inner'>
          <div className='pic'>
            <img src={`${process.env.PUBLIC_URL}/img/${title}.jpg`} alt="{title}"/>
          </div>
          <h2>{title}</h2>
        </div>
      </article>
  )
}
