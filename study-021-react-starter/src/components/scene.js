import React from 'react';

const Scene = (props) => {
  return (
      <article className='mainView__article'>
        <div className="pic">
          <img src={'img/' + props.src} alt={props['tit']}/>
        </div>
        <div className="txt">
          <h2>{props['tit']}</h2>
          <p>{props['con']}</p>
        </div>
      </article>
  );
};

export default Scene;
