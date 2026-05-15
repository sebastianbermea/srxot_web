import React from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useIsMobile } from '../hooks/useIsMobile';

import '../styles/Imagen3d.css'; 
import img1 from '../assets/images/MangoFresa.png';
import img2 from '../assets/images/Cantarito.png';
import img3 from '../assets/images/BotellaStickers.png';


const Imagen3D = () => {
    const { scrollY } = useScroll();
    const isMobile = useIsMobile();
    const yRaw = useTransform(scrollY, [800, 0], [0, isMobile?100:300]);
    const yValue = useSpring(yRaw, { stiffness: 100, damping: 30 }); // Añade suavidad

    return (
        <section className="parallax-wrapper">

            <div className="bg-columns">
                <div className="column left">
                    <img src={img1} alt="Sr Xot Margarita Mango Fresa" />
                </div>
                <div className="column right">
                    <img src={img2} alt="Sr Xot Cantarito" />
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