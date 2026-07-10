import React from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useIsMobile } from '../hooks/useIsMobile';

import '../styles/Imagen3d.css'; 
import img1 from '../assets/images/MangoFresaPro.jpg';
import img1M from '../assets/images/MangoFresaMobile.jpg';
import img2 from '../assets/images/CantaritoPro.jpg';
import img2M from '../assets/images/CantaritoMobile.jpg';
import img3 from '../assets/images/BotellaStickers.png';
import img4 from '../assets/images/StickersWhiteN.png';
import rightarrow from '../assets/icons/arrow_right.svg';
import sticker from '../assets/icons/sticker_play.svg';
import { Link } from 'react-router-dom';


const Imagen3D = () => {
    const { scrollY } = useScroll();
    const isMobile = useIsMobile();
    const yRaw = useTransform(scrollY, [900, 0], [0, isMobile?50:250]);
    const yValue = useSpring(yRaw, { stiffness: 100, damping: 30 }); // Añade suavidad

    return (
        <section className="parallax-wrapper">

            <div className="bg-columns">
                <div className="column left">
                    <img src={isMobile ? img1M:img1} alt="Sr Xot Margarita Mango Fresa" />
                    <Link 
                        to='/producto/prod_Tl07wQD22TP4xp'
                    className='stickers-action'>
                        COMPRAR <img src={rightarrow}></img>
                    </Link>
                </div>
                <div className='stickers-example'>
                    STICKERS CON DINAMICAS
                    <img src={img4} alt="Stickers ejemplo" />
                    <Link 
                    to='/premioocastigo'
                    className='stickers-action stickers-middle'>
                        JUGAR <img src={sticker}></img>
                    </Link>
                </div>
                <div className="column right">
                    <img src={isMobile? img2M:img2} alt="Sr Xot Cantarito" />
                    <Link 
                        to='/producto/prod_TkzUoKBclAB7Ju' 
                    className='stickers-action'>
                        COMPRAR <img src={rightarrow}></img>
                    </Link>
                </div>
            </div>
            <motion.img 
                src={img3} 
                alt="Sr Xot Stickers"
                className="parallax-floating-img"
                style={{ y: yValue }} // Aquí aplicamos el movimiento
            />
            
        </section>
   
    );
};

export default Imagen3D;