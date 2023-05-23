import {useState, forwardRef, useImperativeHandle} from "react";
import {AnimatePresence, motion} from "framer-motion";

const Detail = forwardRef(({data: {src, tit, bg, con}}, ref) => {
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
                initial={{y: '100%'}}
                animate={{y: '0', transition: {duration: .6}}}
                exit={{y: '100%', transition: {duration: .5}}}
            >
              <motion.div
                  className="txt"
                  initial={{x: '100%', opacity: 0}}
                  animate={{x: 0, opacity: 1, transition: {duration: .7, delay: .2}}}
                  exit={{x: '-100%', opacity: 0, transition: {duration: .3}}}
              >
                <h2 style={{color: bg}}>{tit}</h2>
                <p>{con}</p>
              </motion.div>
              <motion.div
                  className="pic"
                  initial={{x: '-300%', width: 0}}
                  animate={{x: 0, width: '50%', transition: {duration: .5, delay: .4}}}
                  exit={{y: '-100%', opacity: 0, transition: {duration: .4}}}
                  style={{backgroundColor: bg}}
              >
                <motion.div
                    initial={{x: '-200%', opacity: 0}}
                    animate={{x: 0, opacity: 1, transition: {duration: .8, delay: .7}}}
                    exit={{x: '100%', opacity: 0, transition: {duration: .4}}}
                >
                  <img src={process.env.PUBLIC_URL + '/img/' + src} alt={tit}/>
                </motion.div>
              </motion.div>
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
