import Card from "./Card";
import '../scss/section/_section.scss'

export default function Section() {
  return (
      <section>
        {titles.map((title, index) => <Card key={index} title={title} />)}
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
