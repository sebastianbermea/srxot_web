import React, { useState, useEffect } from 'react'
import '../styles/Premio.css';
import { premio_categories } from "../Data"
import leftarrow from '../assets/icons/arrow_left.svg';
import rightarrow from '../assets/icons/arrow_right.svg';
import Sticker from '../components/Sticker';
import { img_data, game } from "../Data"
import ImageC from '../components/ImageC'
import { useMediaQuery } from 'react-responsive'
import { useAnimate, stagger, AnimatePresence } from 'framer-motion';

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
    const [selectorScope, selectorAnim] = useAnimate();
    const [stickerScope, stickerAnim] = useAnimate();
    const [challengeScope, challengeAnim] = useAnimate();

    const isMobile = useMediaQuery({ query: '(max-width: 680px)' })
    var animatingCategory = false;


    function nextCategory() {
        if (animatingCategory) return;
        animateCategory(false);
        setSticker(0);
        setTimeout(() => {
            if (category < 3) {
                setCategory(category + 1);
            } else {
                setCategory(0);
            }
        }, 600);
    }
    function prevCategory() {
        animateCategory(true);
        setSticker(0);
        setTimeout(() => {
            if (category > 0) {
                setCategory(category - 1);
            } else {
                setCategory(3);
            }
        }, 600);
    }

    function animateCategory(right) {
        const textAnim = async () => {
            await selectorAnim(selectorScope.current, {
                x: right ? "-100vw" : "100vw",
                opacity: 0
            });
            await selectorAnim(selectorScope.current, {
                x: right ? "100vw" : "-100vw",

            }, { duration: 0.1 });
            await selectorAnim(selectorScope.current, {
                x: 0,
                opacity: 1
            });
        }
        const stickerAnimF = async () => {
            await stickerAnim("img", {
                scale: 0
            }, { duration: 0.2 });
            await stickerAnim("img", {
                scale: 1
            }, { delay: stagger(0.05) });
        }
        stickerAnimF();
        textAnim();
    }

    function animateChallenge() {
        const challengeAnimF = async () => {
            await challengeAnim(challengeScope.current, {
                scaleY: 0,

            }, { duration: 0.1 });
        }
        challengeAnimF();
    }

    function changeSticker(i) {
        if (i == sticker) {
            setSticker(0);
        }
        else {
            setSticker(0);
            setTimeout(() => {
                setSticker(i);
            }, 250);
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
                <div ref={selectorScope} className='current'>
                    <img src={premio_categories[category].icon} alt="" />
                    {premio_categories[category].title}
                </div>
                <button onClick={nextCategory}>
                    <img className='' src={rightarrow} alt="" />
                </button>
            </div>
            {
                isMobile ?
                    <div ref={stickerScope} className='game_grid'>
                        <div className='game'>
                            <Sticker sticker={sticker1} id={1} current={sticker} select={changeSticker} />
                            <Sticker sticker={sticker2} id={2} current={sticker} select={changeSticker} />
                        </div>
                        <AnimatePresence>
                            {sticker > 0 && sticker >= 1 && sticker <= 2 && <Challenges data={game[category][sticker - 1]} />}
                        </AnimatePresence>
                        <div className='game'>
                            <Sticker sticker={sticker3} id={3} current={sticker} select={changeSticker} />
                            <Sticker sticker={sticker4} id={4} current={sticker} select={changeSticker} />
                        </div>
                        <AnimatePresence>
                            {sticker > 0 && sticker >= 3 && sticker <= 4 && <Challenges data={game[category][sticker - 1]} />}
                        </AnimatePresence>
                        <div className='game'>
                            <Sticker sticker={sticker5} id={5} current={sticker} select={changeSticker} />
                            <Sticker sticker={sticker6} id={6} current={sticker} select={changeSticker} />
                        </div>
                        <AnimatePresence>
                            {sticker > 0 && sticker >= 5 && sticker <= 6 && <Challenges data={game[category][sticker - 1]} />}
                        </AnimatePresence>
                        <div className='game'>
                            <Sticker sticker={sticker7} id={7} current={sticker} select={changeSticker} />
                            <Sticker sticker={sticker8} id={8} current={sticker} select={changeSticker} />
                        </div>
                        <AnimatePresence>
                            {sticker > 0 && sticker >= 7 && sticker <= 8 && <Challenges data={game[category][sticker - 1]} />}
                        </AnimatePresence>
                        <div className='game'>
                            <Sticker sticker={sticker9} id={9} current={sticker} select={changeSticker} />
                            <Sticker sticker={sticker10} id={10} current={sticker} select={changeSticker} />
                        </div>
                        <AnimatePresence>
                            {sticker > 0 && sticker >= 9 && sticker <= 10 && <Challenges data={game[category][sticker - 1]} />}
                        </AnimatePresence>
                        <div className='game'>
                            <Sticker sticker={sticker11} id={11} current={sticker} select={changeSticker} />
                            <Sticker sticker={sticker12} id={12} current={sticker} select={changeSticker} />
                        </div>
                        <AnimatePresence>
                            {sticker > 0 && sticker >= 11 && sticker <= 12 && <Challenges data={game[category][sticker - 1]} />}
                        </AnimatePresence>
                    </div>
                    :
                    <div ref={stickerScope} className='game_grid'>
                        <div className='game'>
                            <Sticker sticker={sticker1} id={1} current={sticker} select={changeSticker} />
                            <Sticker sticker={sticker3} id={3} current={sticker} select={changeSticker} />
                            <Sticker sticker={sticker5} id={5} current={sticker} select={changeSticker} />
                            <Sticker sticker={sticker7} id={7} current={sticker} select={changeSticker} />
                            <Sticker sticker={sticker9} id={9} current={sticker} select={changeSticker} />
                            <Sticker sticker={sticker11} id={11} current={sticker} select={changeSticker} />
                        </div>
                        <AnimatePresence>
                            {sticker > 0 && sticker % 2 == 1 && <Challenges data={game[category][sticker - 1]} />}
                        </AnimatePresence>
                        <div className='game'>
                            <Sticker sticker={sticker2} id={2} current={sticker} select={changeSticker} />
                            <Sticker sticker={sticker4} id={4} current={sticker} select={changeSticker} />
                            <Sticker sticker={sticker6} id={6} current={sticker} select={changeSticker} />
                            <Sticker sticker={sticker8} id={8} current={sticker} select={changeSticker} />
                            <Sticker sticker={sticker10} id={10} current={sticker} select={changeSticker} />
                            <Sticker sticker={sticker12} id={12} current={sticker} select={changeSticker} />
                        </div>
                        <AnimatePresence>
                            {sticker > 0 && sticker % 2 == 0 && <Challenges data={game[category][sticker - 1]} />}
                        </AnimatePresence>
                    </div>

            }

            {category==3&&
                <div className='reglas'>
                    <p> <strong>Explicaciones:</strong> </p>
                    <p> <strong>Yo nunca nunca:</strong> Levanta 5 o 3 dedos, por turnos cada quien dira algo que no hayan hecho, el que lo haya echo, baja un dedo, el que se quede sin dedos pierde.</p>
                    <p> <strong>Historia:</strong> Cada quien repite y añade una palabra a la historia, el que se equivoque pierde. Ej:(Habia, habia una, habia una niña...).</p>
                    <p> <strong>Gira la botella:</strong> Posiciona la botella horizontalmente en el centro, girala, verdad o reto del que tiene el fondo al que tiene la punta.</p>
                    <p> <strong>Categorias:</strong> Por turnos diran una palabra que cumpla la categoria, el que repita o no responda, pierde</p>
                    <p> <strong>Fui...:</strong> Por turnos añadiran una palabra acorde al tema, repitiendo todo, el que se equivoque o repita, pierde. Ej:(Fui al zoologico y vi una jirafa, un elefante, ...)</p>
                    <p> <strong>Florero:</strong> Todos serviran de su trago en un vaso, el cual deberas tomar.</p>
                    <p> <strong>17:</strong> Por turnos, contaran los numeros del 1 al 17, cada que lleguen, el que le toco podra cambiar cualquier numero por alguna otra palabra, el que se equivoque pierde. Ej:(1,2,Sr. Xot,4,Cerveza,6...)</p>
                    <p> <strong>Preguntas:</strong> Por turnos, una persona preguntara algo a otra, esa otra debera preguntar otra cosa a alguien mas y asi sucesivamente, el que responda, repita, pregunte al que le pregunto, se ria o se tarde, pierde.</p>
                    <p> <strong>Palabra prohibida:</strong> Deberas elegir una palabra prohibida por los siguientes 15 minutos, el que la diga, pierde</p>
                    <p> <strong>No te rias!:</strong> El sigueinte en reirse, pierde.</p>
                    <p> <strong>Regla de oro:</strong> Deberás poner una regla, el que la incumpla, pierde. Ej:(Deberán referirse a mi como Rey)</p>
                    <p> <strong>Cascada:</strong> Empieza a tomar y todos te deberan seguirte, hasta que tu dejes de tomar la persona de la derecha podra hacerlo tambien y asi sucesivamente.</p>
                    <p> <strong>Shot xot:</strong> Date un shot y escoge a una persona que tomara lo mismo que tu al doble.</p>
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