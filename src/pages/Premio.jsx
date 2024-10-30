import React, {useState} from 'react'
import '../styles/Premio.css';
import { premio_categories } from "../Data"
import leftarrow from '../assets/icons/arrow_left.svg';
import rightarrow from '../assets/icons/arrow_right.svg';
import Sticker from '../components/Sticker';
import { img_data } from "../Data"
import ImageC from '../components/ImageC'

import sticker1 from '../assets/stickers/1.png';
import sticker2 from '../assets/stickers/2.png';
import sticker3 from '../assets/stickers/3.png';
import sticker4 from '../assets/stickers/4.png';
import sticker5 from '../assets/stickers/5.png';
import sticker6 from '../assets/stickers/6.png';
import sticker7 from '../assets/stickers/7.png';
import sticker8 from '../assets/stickers/8.png';
import sticker9 from '../assets/stickers/9.png';
import sticker10 from '../assets/stickers/10.png';
import sticker11 from '../assets/stickers/11.png';
import sticker12 from '../assets/stickers/12.png';

function Premio() {
    const [category, setCategory] = useState(0);
    function nextCategory(){
        if(category<3){
            setCategory(category+1);
        }else{
            setCategory(0);
        }
    }
    function prevCategory() {
        if (category>0) {
            setCategory(category -1);
        } else {
            setCategory(3);
        }
    }

  return (
    <div className='content'>
        <h1>#PREMIO O CASTIGO</h1>
          <h4>Elige tu tipo de ocasión y juega con tus stickers</h4>
          <div className='selector'>
            <button onClick={prevCategory}>
                  <img className='' src={leftarrow} alt="" />
            </button>
            <div className='current'>
                  <img src={premio_categories[category].icon} alt="" />
                {premio_categories[category].title}
            </div>
              <button onClick={nextCategory}>
                  <img className='' src={rightarrow} alt="" />
              </button>
          </div>
          <div className='game'>
              <Sticker sticker={sticker1}/>
               <Sticker sticker={sticker2}/>
              <Sticker sticker={sticker3}/>
              <Sticker sticker={sticker4}/>
              <Sticker sticker={sticker5}/>
              <Sticker sticker={sticker6}/>
              <Sticker sticker={sticker7} />
              <Sticker sticker={sticker8} />
              <Sticker sticker={sticker9} />
              <Sticker sticker={sticker10} />
              <Sticker sticker={sticker11} />
              <Sticker sticker={sticker12} />
          </div>
     
          <div className='descripcion'>
              Selecciona tu sticker y numero para cumplir el reto
          </div>
          <ImageC data={img_data[3]} />
    </div>
  )
}

export default Premio