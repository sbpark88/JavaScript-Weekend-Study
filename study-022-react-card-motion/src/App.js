import './scss/style.scss';
import Header from "./components/Header";
import Footer from "./components/Footer";
import Section from "./components/Section";
import Buttons from "./components/Buttons";
import {useEffect, useRef, useState} from "react";

function App() {
  const frame = useRef(null)
  const [cardIndex, setCardIndex] = useState(0)

  useEffect(() => {
    frame.current.style.transform = `rotate(${360 / titles.length * cardIndex}deg)`
  }, [cardIndex])

  return (
      <>
        <Header/>
        <Section frame={frame} titles={titles} cardIndex={cardIndex}/>
        <Buttons frame={frame} count={titles.length}
                 prevClickEvt={() => setCardIndex(cardIndex + 1)}
                 nextClickEvt={() => setCardIndex(cardIndex - 1)}/>
        <Footer/>
      </>
  );
}

export default App;

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
