import React from 'react'
import current from '../assets/icons/current.svg';
import '../styles/Sticker.css';
import { motion } from "framer-motion";

function Sticker(props) {
  return (
      <motion.button 
      initial={{ '--opacity': 1 }}
      whileTap={{scale:0.8, '--opacity': 0}}

      id='sticker' className='sticker' onClick={()=>props.select(props.id)}>
        <img src={props.sticker} alt="Sr. Xot sticker" />
      {props.id == props.current && <img className='current' style={{opacity: 'var(--opacity)'}} src={current} alt="" />}
   
      </motion.button>
  )
}

export default Sticker