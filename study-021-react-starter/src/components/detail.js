import {useState, forwardRef, useImperativeHandle} from "react";

const Detail = forwardRef((props, ref) => {
  const [Open, setOpen] = useState(false)

  useImperativeHandle(ref, () => {
    return {toggleModal: status => setOpen(status)}
  })

  const modal = closure => status => closure(status)
  const modalToggle = modal(useState)

  return (
      <>
        {Open &&
            (<aside>
              <div className="pic"></div>
              <div className="txt"></div>
              <span className="close" onClick={() => setOpen(false)}>Close</span>
            </aside>)
        }
      </>
  );
});

export default Detail;
