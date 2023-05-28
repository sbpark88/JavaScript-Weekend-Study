import Card from "./Card";
import '../scss/section/_section.scss'

export default function Section({frame, titles, cardIndex}) {
  const numberOfCards = titles.length
  const remain = cardIndex % numberOfCards
  const style = {
    top: '140%'
  }
  return (
      <section style={style} ref={frame}>
        {titles.map((title, index) => <Card key={title}
                                            title={title}
                                            count={numberOfCards}
                                            index={index}
                                            active={(remain <= 0 ? remain + numberOfCards : remain) === (numberOfCards - index)}/>
        )}
      </section>
  )
}

