import React, { useState } from 'react'
import '../styles/Premio.css';
import { premio_categories } from "../Data"
import leftarrow from '../assets/icons/arrow_left.svg';
import rightarrow from '../assets/icons/arrow_right.svg';
import Sticker from '../components/Sticker';
import { img_data } from "../Data"
import ImageC from '../components/ImageC'
import { useMediaQuery } from 'react-responsive'

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
import Challenges from '../components/Challenges';

function Premio() {
    const [category, setCategory] = useState(0);
    const [sticker, setSticker] = useState(0);

    const isMobile = useMediaQuery({ query: '(max-width: 680px)' })

    function nextCategory() {
        if (category < 3) {
            setCategory(category + 1);
        } else {
            setCategory(0);
        }
    }
    function prevCategory() {
        if (category > 0) {
            setCategory(category - 1);
        } else {
            setCategory(3);
        }
    }

    function changeSticker(i){
        if(i==sticker){
            setSticker(0);
        }
        else{
            setSticker(i);
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
            {
                isMobile ?
                    <div className='game_grid'>
                        <div className='game'>
                            <Sticker sticker={sticker1} id={1} current={sticker} select={changeSticker} />
                            <Sticker sticker={sticker2} id={2} current={sticker} select={changeSticker} />
                        </div>
                        {sticker > 0 && sticker >= 1 && sticker<=2 && <Challenges />}
                        <div className='game'>
                            <Sticker sticker={sticker3} id={3} current={sticker} select={changeSticker} />
                            <Sticker sticker={sticker4} id={4} current={sticker} select={changeSticker} />
                        </div>
                        {sticker > 0 && sticker >= 3 && sticker <= 4 && <Challenges />}
                        <div className='game'>
                            <Sticker sticker={sticker5} id={5} current={sticker} select={changeSticker} />
                            <Sticker sticker={sticker6} id={6} current={sticker} select={changeSticker} />
                        </div>
                        {sticker > 0 && sticker >= 5 && sticker <= 6 && <Challenges />}
                        <div className='game'>
                            <Sticker sticker={sticker7} id={7} current={sticker} select={changeSticker} />
                            <Sticker sticker={sticker8} id={8} current={sticker} select={changeSticker} />
                        </div>
                        {sticker > 0 && sticker >= 7 && sticker <= 8 && <Challenges />}
                        <div className='game'>
                            <Sticker sticker={sticker9} id={9} current={sticker} select={changeSticker} />
                            <Sticker sticker={sticker10} id={10} current={sticker} select={changeSticker} />
                        </div>
                        {sticker > 0 && sticker >= 9 && sticker <= 10 && <Challenges />}
                        <div className='game'>
                            <Sticker sticker={sticker11} id={11} current={sticker} select={changeSticker} />
                            <Sticker sticker={sticker12} id={12} current={sticker} select={changeSticker} />
                        </div>
                        {sticker > 0 && sticker >= 11 && sticker <= 12 && <Challenges />}
                    </div>
                    :
                    <div className='game_grid'>
                        <div className='game'>
                            <Sticker sticker={sticker1} id={1} current={sticker} select ={changeSticker}/>
                            <Sticker sticker={sticker3} id={3} current={sticker} select={changeSticker} />
                            <Sticker sticker={sticker5} id={5} current={sticker} select={changeSticker} />
                            <Sticker sticker={sticker7} id={7} current={sticker} select={changeSticker} />
                            <Sticker sticker={sticker9} id={9} current={sticker} select={changeSticker} />
                            <Sticker sticker={sticker11} id={11} current={sticker} select={changeSticker} />
                        </div>
                        {sticker>0 && sticker%2==1 && <Challenges />}
                        <div className='game'>
                            <Sticker sticker={sticker2} id={2} current={sticker} select={changeSticker} />
                            <Sticker sticker={sticker4} id={4} current={sticker} select={changeSticker} />
                            <Sticker sticker={sticker6} id={6} current={sticker} select={changeSticker} />
                            <Sticker sticker={sticker8} id={8} current={sticker} select={changeSticker} />
                            <Sticker sticker={sticker10} id={10} current={sticker} select={changeSticker} />
                            <Sticker sticker={sticker12} id={12} current={sticker} select={changeSticker} />
                        </div>
                        {sticker > 0 && sticker % 2 == 0 && <Challenges />}
                    </div>

            }


            <div className='descripcion'>
                Selecciona tu sticker y numero para cumplir el reto
            </div>
            <ImageC data={img_data[3]} />
        </div>
    )
}

export default Premio