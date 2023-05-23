import {useState, forwardRef, useImperativeHandle} from "react";
import {AnimatePresence, motion} from "framer-motion";

const Detail = forwardRef(({data: {bg}}, ref) => {
  const [Open, setOpen] = useState(false)

  useImperativeHandle(ref, () => {
    return {toggleModal: status => setOpen(status)}
  })

  const modal = closure => status => closure(status)
  const modalToggle = modal(useState)

  return (
      <AnimatePresence>
        {Open &&
            (<motion.aside
                initial={{opacity: 0, x: '100%', rotate: 45}}
                animate={{opacity: 1, x: '0%', rotate: 0, transition: {duration: 1}}}
                exit={{opacity: 0, x: '100%', rotate: -45, scale: 0, transition: {duration: .8}}}
                style={{backgroundColor: bg}}
            >
              <div className="pic"></div>
              <div className="txt"></div>
              <motion.span
                  className="close"
                  onClick={() => setOpen(false)}
                  initial={{opacity: 0, x: 50}}
                  animate={{opacity: 1, x: 0, transition: {duration: .5, delay: 1}}}
                  exit={{opacity: 0, x: -50}}
              >Close
              </motion.span>
            </motion.aside>)
        }
      </AnimatePresence>
  );
});

export default Detail;
