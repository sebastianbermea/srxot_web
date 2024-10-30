import React from 'react'
import '../styles/Challenges.css';

function Challenges(props) {
  return (
    <div className='challenges'>
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
    </div>


  )
}

export default Challenges