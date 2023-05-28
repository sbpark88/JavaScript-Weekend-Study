import Card from "./Card";
import '../scss/section/_section.scss'

export default function Section({frame, count}) {
  const style = {
    top: '140%'
  }
  count.current = titles.length;
  return (
      <section style={style} ref={frame}>
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
