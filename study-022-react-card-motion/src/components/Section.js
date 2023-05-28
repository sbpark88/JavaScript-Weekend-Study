import Card from "./Card";
import '../scss/section/_section.scss'

export default function Section({frame, titles}) {
  const style = {
    top: '140%'
  }
  return (
      <section style={style} ref={frame}>
        {titles.map((title, index) =>
            <Card key={title} title={title} count={titles.length} index={index}/>
        )}
      </section>
  )
}

