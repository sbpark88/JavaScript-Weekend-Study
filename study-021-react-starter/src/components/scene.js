import {useRef} from "react";
import Detail from "./detail";

const Scene = (props) => {
  const el = useRef(null)

  const toggleModal = status => () => el.current.toggleModal(status)
  const openModal = toggleModal(true)
  const closeModal = toggleModal(false)

  return (
      <>
        <article className='mainView__article' onClick={openModal}>
          <div className="pic">
            <img src={'img/' + props.src} alt={props['tit']}/>
          </div>
          <div className="txt">
            <h2>{props['tit']}</h2>
          </div>
        </article>
        <Detail ref={el}/>
      </>
  );
};

export default Scene;
