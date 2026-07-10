import React from 'react';
import '../styles/PlaySection.css';
import { useIsMobile } from '../hooks/useIsMobile';

import srfiesta from '../assets/images/Srfiesta.jpg';
import stickers from '../assets/images/Stickers.jpg';
import rightarrow from '../assets/icons/arrow_right.svg';
import { Link } from 'react-router-dom';

const PlaySection = () => {
    const isMobile = useIsMobile();
    return (
        <div className='play-section'>
            <h2>DIVIERTETE CON NOSOTROS</h2>
            {isMobile ?
            <div className='play-component'>
                <div className='play-text'>
                    <h3>SR FIESTA</h3>
                        <p>
                            ¡Cambia el mood de tu reunión en srfiesta! Juega al instante desde tu navegador ingresando los nombres de tu grupo, preparando tus tragos Sr. Xot y eligiendo el modo ideal.
                        </p>
                       
                    <a className='review-action'
                        href='https://srfiesta.srxot.com'>
                        JUGAR SR FIESTA<img src={rightarrow}></img>
                    </a>
                </div>
                <div className='play-img'>
                    <img src={srfiesta}></img>
                </div>
                </div> : <div className='play-component'>
                    <div className='play-text'>
                        <h3>SR FIESTA</h3>
                        <p>
                            ¡Tus reuniones ya no tienen por qué ser aburridas! Con srfiesta.srxot.com, olvídate de descargar aplicaciones: todo el juego funciona al instante desde tu navegador.  Solo necesitas los nombres de tus amigos, tus tragos de Sr. Xot y elegir el modo de juego que mejor vibre con tu grupo:
                        </p>
                        <p>
                            Para convivir: Elige Clásico para arrancar o Fiesta Familiar para un ambiente chill sin complicaciones.
                        </p>
                        <p>
                            Para los que aman competir: Demuestra qué tanto sabes con el modo Música (trends y playlists) o el modo Geek (películas, anime y memes).
                        </p>
                        <p>
                            Para subir la intensidad: Prueba Clásico+ para más ritmo, Yo Nunca Nunca para revelar secretos, o el modo Hot para aumentar la tensión.
                        </p>
                        <p>
                            Para ocasiones especiales: El modo Cumpleañero hace sentir especial al festejado, y Retos pone a todos a prueba con desafíos extremos.
                        </p>

                        <a className='review-action'
                            href='https://srfiesta.srxot.com'>
                            JUGAR SR FIESTA<img src={rightarrow}></img>
                        </a>
                    </div>
                    <div className='play-img'>
                        <img src={srfiesta}></img>
                    </div>
                </div>
            }
            {isMobile ? <div className='play-component'>
                
                <div className='play-text'>
                    <h3>STICKERS</h3>
                    <p>Cada botella de Sr. Xot incluye 12 stickers ocultos con números atrás que te indican los segundos a tomar. Puedes usar esos números con retos especiales según la ocasión.</p>
                    <Link className='review-action'
                        to='/premioocastigo'>
                        PROBAR DINAMICAS<img src={rightarrow}></img>
                    </Link>
                </div>
                <div className='play-img'>
                    <img src={stickers}></img>
                </div>
            </div> : 
            <div className='play-component'>
                    <div className='play-img'>
                        <img src={stickers}></img>
                    </div>
                    <div className='play-text'>
                        <h3>STICKERS</h3>
                        <p>Cada botella de Sr. Xot incluye 12 stickers ocultos. Al despegarlos, encontrarás un número en la parte de atrás que te indica los segundos que te toca tomar.
                            Si prefieres transformar los tragos en una experiencia más dinámica, puedes usar esos mismos números con los retos especiales que diseñamos para ti según el mood de tu evento:</p>
                        <p>FIESTA: Modos intensos y masivos para encender la noche.</p>
                        <p>REUNION: Dinámicas más chill y divertidas para pasar el rato entre amigos.</p>
                        <p>SOLO: Retos individuales para disfrutar tu trago a tu propio ritmo.</p>
                        <p>REGLAS: Las leyes de la noche; reglas especiales que todos deben seguir... ¡o habrá castigo!</p>

                         <Link className='review-action'
                            to='/premioocastigo'>
                            PROBAR DINAMICAS<img src={rightarrow}></img>
                        </Link>
                    </div>
                </div>}




        </div>
    );
};

export default PlaySection;