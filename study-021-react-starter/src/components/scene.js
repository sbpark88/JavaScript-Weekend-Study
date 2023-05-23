import {useRef} from "react";
import Detail from "./detail";

const Scene = ({data: {src, tit, bg, con}}) => {
  const el = useRef(null)

  const toggleModal = status => () => el.current.toggleModal(status)
  const openModal = toggleModal(true)
  const closeModal = toggleModal(false)

  return (
      <>
        <article className='mainView__article' onClick={openModal}>
          <div className="pic">
            <img src={'img/' + src} alt={tit}/>
          </div>
          <div className="txt">
            <h2>{tit}</h2>
          </div>
        </article>
        <Detail ref={el} data={{src, tit, bg, con}}/>
      </>
  );
};

export default Scene;
