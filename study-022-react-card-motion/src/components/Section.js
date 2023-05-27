import Card from "./Card";
import '../scss/section/_section.scss'

export default function Section() {
  const style = {
    top: '140%'
  }
  return (
      <section style={style}>
        {titles.map((title, index) =>
            <Card key={title} title={title} count={titles.length} index={index}/>
        )}
      </section>
  )
}

const titles = [
  'Blizzards',
  'Calm',
  'Dusty_Road',
  'Escape',
  'Payday',
  'Retreat',
  'Seasonal',
  'Vespers'
]
