import React from 'react'
import '../styles/Challenges.css';
import { motion } from "framer-motion";

function Challenges(props) {
  const challengeVars = {
    initial: {
      opacity: 0,
      scaleY:0,
      y:-25
    },
    animate: {
      opacity: 1,
      scaleY: 1,
    y:0,
      transition: {
        duration: 0.25,
        type: 'spring',
        stiffness: 120,
        mass:0.5,
        velocity: 2
      },
    },
    exit: {
      y: -25,
      opacity: 0,
      scaleY: 0,
      transition: {
        duration: 0.25,
      },
    },
  };


  return (
    <motion.div 
      variants={challengeVars}
      initial="initial"
      animate="animate"
      exit="exit"
    className='challenges' style={{originY:0}}>
      <div className='challenge'>
        <div className='number'>0</div>
        <div>{props.data[0]}</div>
      </div>
      <div className='challenge'>
        <div className='number'>1</div>
        <div>{props.data[1]}</div>
      </div>
      <div className='challenge'>
        <div className='number'>2</div>
        <div>{props.data[2]}</div>
      </div>
      <div className='challenge'>
        <div className='number'>3</div>
        <div>{props.data[3]}</div>
      </div>
      <div className='challenge'>
        <div className='number'>4</div>
        <div>{props.data[4]}</div>
      </div>
    </motion.div>


  )
}

export default Challenges