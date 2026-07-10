import React from 'react';
import '../styles/HeroVideo.css';
import stars from '../assets/images/Estrellas.png';
import rightarrow from '../assets/icons/arrow_right.svg';
import { Link } from 'react-router-dom';
import { useIsMobile } from '../hooks/useIsMobile';
import template from '../assets/images/TemplateVideo.jpg';

const HeroVideo = () => {

    const isMobile = useIsMobile();

    return (
        <div className='hero-video-divider'>
            <div className='hero-video-container'>
                <img
                    src={template}
                    alt="Template de carga"
                    className="hero-poster-img"
                />
                <video
                    src="https://firebasestorage.googleapis.com/v0/b/srxot-web.firebasestorage.app/o/Hero.mp4?alt=media&token=437152bc-c9f5-4751-92f3-0fb70a695e1d"
                    autoPlay
                    muted
                    loop
                   
                    playsInline
                    preload="auto"
                    className="hero-video"
                />
                <div className="video-overlay-gradient"></div>

                <div className='video-overlay'>
                    <div className='video-review'>
                        <img src={stars}></img>
                        <p>
                            4.8  |  + 500 PALADARES FELICES
                        </p>
                    </div>
                    <h3>
                        SHOT QUE TE HARA PREGUNTAR
                    </h3>
                    <h2>
                        #PREMIO O CASTIGO
                    </h2>
                    <p className='video-description'>
                        Botella premium con sabores unicos y dinamicas.
                    </p>

                    {!isMobile && <div>
                        <p className='video-description'>
                            Un trago que se siente como una recompensa. Olvídate de las bebidas que raspan; nuestra receta es tan suave y deliciosa que le gusta a cualquiera. ¡Pruébalo hoy y nota la diferencia!
                        </p>
                        <Link className='video-action'
                            to='/producto/prod_Tl084N7kpNl0JO'>
                            QUIERO EL PREMIO<img src={rightarrow}></img>
                        </Link>
                        <p className='video-fud'>
                            Garantía de Devolución de 30 días.
                        </p>
                    </div>}
                </div>
            </div>
            {isMobile &&
                <div className='mobile-extra'>
                    <Link className='mobile-cta'
                        to='/producto/prod_Tl084N7kpNl0JO'>
                        QUIERO EL PREMIO<img src={rightarrow}></img>
                    </Link>
                    <div className='mobile-fud'>
                        Garantía de Devolución de 30 días
                        </div>
                </div>
            }
        </div>
    );
};

export default HeroVideo;