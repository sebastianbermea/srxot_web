import React from 'react'

function Sticker(props) {

  return (
      <div className='sticker'>
        <img src={props.sticker} alt="Sr. Xot sticker" />
        {/* <div className='challenges'>
            <div className='challenge'>
                <div className='number'>0</div>
                  <div>Regala un shot a un desconocido.</div>
            </div>
              <div className='challenge'>
                  <div className='number'>1</div>
                  <div>Grita de dolor y luego actua normal y no digas nada mas.</div>
              </div>
              <div className='challenge'>
                  <div className='number'>2</div>
                  <div> Canta una canción a todo pulmón.</div>
              </div>
              <div className='challenge'>
                  <div className='number'>3</div>
                  <div>Habla con alguien desconocido con la lengua de fuera.</div>
              </div>
        </div> */}
      </div>
  )
}

export default Sticker