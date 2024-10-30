import React from 'react'
import current from '../assets/icons/current.svg';
import '../styles/Sticker.css';

function Sticker(props) {
  return (
      <button className='sticker' onClick={()=>props.select(props.id)}>
        <img src={props.sticker} alt="Sr. Xot sticker" />
      {props.id == props.current && <img className='current' src={current} alt="" />}
   
      </button>
  )
}

export default Sticker