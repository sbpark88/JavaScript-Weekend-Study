import './scss/style.scss';
import Header from "./components/Header";
import Footer from "./components/Footer";
import Section from "./components/Section";
import Buttons from "./components/Buttons";
import {useRef} from "react";

function App() {
  const frame = useRef(null)
  const cardCount = useRef(0)

  return (
      <>
        <Header/>
        <Section frame={frame} count={cardCount}/>
        <Buttons frame={frame} count={cardCount}/>
        <Footer/>
      </>
  );
}

export default App;
