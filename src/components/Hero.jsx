import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import '../styles/Hero.css';

import rightarrow from '../assets/icons/right_arrow.svg';
import lefttarrow from '../assets/icons/left_arrow.svg';
import circlefull from '../assets/icons/Circle_Full.svg';
import circleoutline from '../assets/icons/Circle_Outline.svg';


import img1 from '../assets/images/banners/Jugar.jpg';
import img2 from '../assets/images/banners/MerchBanner.jpg';
import img3 from '../assets/images/banners/ComboBanner.jpg';
import img4 from '../assets/images/banners/Personaliza.jpg';
import img5 from '../assets/images/banners/MundialBanner.jpg';
import imgM1 from '../assets/images/banners/JugarM.jpg';
import imgM2 from '../assets/images/banners/MerchBannerM.jpg';
import imgM3 from '../assets/images/banners/ComboBannerM.jpg';
import imgM4 from '../assets/images/banners/PersonalizaM.jpg';
import imgM5 from '../assets/images/banners/MundialBannerM.jpg';



function Hero() {
    const BANNERS = [
        { desktop: img1, mobile: imgM1, url: "/premioocastigo", alt: "Premio o castigo Banner" },
        { desktop: img5, mobile: imgM5, url: "/producto/prod_UW8QkVRuOU8Xb9", alt: "Daiquiri Banner" },
        { desktop: img4, mobile: imgM4, url: "/contacto", alt: "Personaliza sr xot" },
        { desktop: img2, mobile: imgM2, url: "/tienda", alt: "Sr Xot Merch Banner" },
        { desktop: img3, mobile: imgM3, url: "/producto/prod_Tl084N7kpNl0JO", alt: "Como Xot Banner" },
    ]
    const [imgIndex, setImageIndex] = useState(0);

    const [touchStart, setTouchStart] = useState(null);
    const [touchEnd, setTouchEnd] = useState(null);
    const [dragOffset, setDragOffset] = useState(0); // Para el movimiento en tiempo real

    const minSwipeDistance = 50;

      useEffect(() => {
            const interval = setInterval(() => {
                nextImage();
            }, 13550);
    
            return () => clearInterval(interval); // Limpieza
        }, []);

    function nextImage() {
        setImageIndex(index => {
            if (index == BANNERS.length - 1) return 0
            return index + 1
        })
    }

    function prevImage() {
        setImageIndex(index => {
            if (index == 0) return BANNERS.length - 1
            return index - 1
        })
    }

    const onTouchStart = (e) => {
        setTouchStart(e.targetTouches[0].clientX);
        setTouchEnd(0); // Reset
    };

    const onTouchMove = (e) => {
        const currentTouch = e.targetTouches[0].clientX;
        setTouchEnd(currentTouch);

        // Calculamos la diferencia para mover el slider mientras arrastras
        const diff = currentTouch - touchStart;
        setDragOffset(diff);
    };

    const onTouchEnd = () => {
        if (!touchStart || !touchEnd) return;

        const distance = touchStart - touchEnd;

        // Si el arrastre superó el umbral, cambiamos de imagen
        if (distance > minSwipeDistance) nextImage();
        else if (distance < -minSwipeDistance) prevImage();

        // Al soltar, reseteamos el dragOffset para que vuelva a 0
        setDragOffset(0);
    };

    // Calculamos la posición final sumando el índice actual + el arrastre manual
    // Convertimos el dragOffset (px) a porcentaje relativo si lo prefieres, 
    // pero lo más fácil es usar calc() en el inline style.
    const transformStyle = `calc(${-100 * imgIndex}% + ${dragOffset}px)`;

    return (
        <div className='hero'>
            <div
                className='slider'
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
                style={{
                    transform: `translateX(${transformStyle})`,
                    // Quitamos la transición mientras arrastras para que no se sienta "pesado"
                    transition: dragOffset === 0 ? "transform 0.5s ease-out" : "none"
                }}
            >
                {BANNERS.map(({ desktop, mobile, url, alt }, index) => (
                    <Link
                    key={index+"_"+desktop}
                    to={url}>
                        <picture>
                            {/* Source for desktop screens (min-width: 800px) */}
                            <source media="(min-width: 680px)" srcSet={mobile} />
                            {/* Source for mobile screens (max-width: 799px) */}
                            <img src={mobile} alt={alt} key={desktop} />
                        </picture>
                    </Link>

                ))}
            </div>
            <button className='arrow'
                onClick={prevImage}
                style={{ left: 0 }}>
                <img src={lefttarrow}></img>
            </button>
            <button className='arrow'
                onClick={nextImage}
                style={{ right: 0 }}>
                <img src={rightarrow}></img>
            </button>
            <div className='bottom'>
                {BANNERS.map((_, i) => (
                    <button 
                    key={"Hero button-" + i}
                    onClick={() => setImageIndex(i)}>
                        {i == imgIndex ? <img src={circlefull}></img> : <img src={circleoutline}></img>}
                    </button>
                ))}
            </div>

        </div>
    )
}

export default Hero