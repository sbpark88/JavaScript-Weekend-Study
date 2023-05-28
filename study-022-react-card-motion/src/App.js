import './scss/style.scss';
import Header from "./components/Header";
import Footer from "./components/Footer";
import Section from "./components/Section";
import Buttons from "./components/Buttons";
import {useRef} from "react";

function App() {
  const frame = useRef(null)

  return (
      <>
        <Header/>
        <Section frame={frame} titles={titles}/>
        <Buttons frame={frame} count={titles.length}/>
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
