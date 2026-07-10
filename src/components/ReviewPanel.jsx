import React, { useState, useEffect, useRef } from 'react';
import '../styles/ReviewPanel.css';

import rightarrow from '../assets/icons/right_arrow.svg';
import lefttarrow from '../assets/icons/left_arrow.svg';
import rightarrow2 from '../assets/icons/arrow_right.svg';
import stars from '../assets/images/Estrellas.png';

import rev1 from '../assets/images/reviews/Review1.jpg';
import rev2 from '../assets/images/reviews/Review2.jpg';
import rev3 from '../assets/images/reviews/Review3.jpg';
import rev4 from '../assets/images/reviews/Review4.jpg';
import rev5 from '../assets/images/reviews/Review5.jpg';
import rev6 from '../assets/images/reviews/Review6.jpg';
import rev7 from '../assets/images/reviews/Review7.jpg';
import rev8 from '../assets/images/reviews/Review8.jpg';
import { Link } from 'react-router-dom';



// Datos de prueba estructurados para las reseñas
const mockReviews = [
    { id: 1, name: "Santiago B.", rating: 5, img: rev1, comment: "El sabor es muy rico, no cala en la garganta." },
    { id: 2, name: "Adan A.", rating: 5, img: rev3, comment: "Muy bien empacado con bolsa de plastico y con papel, al principio me causaba duda pero todo bien." },
    { id: 3, name: "Abby R.", rating: 4, img: rev2, comment: "Si sabe a cantarito, la etiqueta un poco movida pero el liquido es lo que importa, super recomendado." },
    { id: 4, name: "Aldo M.", rating: 5, img: rev4, comment: "Rapido el envio y el tequila muy suave, todos tomaron en la posada, jugamos con los stickers." },
    { id: 5, name: "Karla G.", rating: 5, img: rev5, comment: "Mi abuelito no toma mucho pero le encantó, compraré para mi boda." },
    { id: 6, name: "Francisco L.", rating: 5, img: rev6, comment: "Muy bueno con agua mineral y limon, como coctel ya preparado." },
    { id: 7, name: "Raul V.", rating: 5, img: rev7, comment: "Fui la sensación repartiendo shots." },
    { id: 8, name: "Daniel M.", rating: 5, img: rev8, comment: "Excelente para mi bar, preparo bebidas que se venden mucho." }
];

const ReviewPanel = () => {
    // Duplicamos el array para mantener la ilusión del loop infinito sin saltos
    const originalItems = mockReviews;
    const displayReviews = [...originalItems, ...originalItems];

    const [currentIndex, setCurrentIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [dragOffset, setDragOffset] = useState(0);

    const startYRef = useRef(0);
    const isHorizontalSwipeRef = useRef(null);
    const autoPlayRef = useRef(null);

    const stopAutoPlay = () => {
        if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };

    const startAutoPlay = () => {
        stopAutoPlay();
        autoPlayRef.current = setInterval(() => {
            setCurrentIndex(prev => prev + 1);
            setIsTransitioning(true);
        }, 100000);
    };

    useEffect(() => {
        if (!isDragging) startAutoPlay();
        else stopAutoPlay();
        return () => stopAutoPlay();
    }, [isDragging, currentIndex]);

    const handleTransitionEnd = () => {
        if (currentIndex >= originalItems.length) {
            setIsTransitioning(false);
            setCurrentIndex(0);
        } else if (currentIndex < 0) {
            setIsTransitioning(false);
            setCurrentIndex(originalItems.length - 1);
        } else {
            setIsTransitioning(false);
        }
    };

    const nextReview = () => {
        if (isTransitioning) return;
        stopAutoPlay();
        setIsTransitioning(true);
        setCurrentIndex(prev => prev + 1);
    };

    const prevReview = () => {
        if (isTransitioning) return;
        stopAutoPlay();
        setIsTransitioning(true);
        setCurrentIndex(prev => prev - 1);
    };

    const onStart = (x, y = 0) => {
        setIsDragging(true);
        setStartX(x);
        startYRef.current = y;
        isHorizontalSwipeRef.current = null;
        setDragOffset(0);
    };

    const onMove = (x, y = 0, isTouch = false) => {
        if (!isDragging) return;

        const deltaX = x - startX;
        const deltaY = y - startYRef.current;

        if (isTouch && isHorizontalSwipeRef.current === null) {
            if (Math.abs(deltaX) > Math.abs(deltaY)) {
                isHorizontalSwipeRef.current = true;
            } else if (Math.abs(deltaY) > Math.abs(deltaX)) {
                isHorizontalSwipeRef.current = false;
            }
        }

        if (isTouch && isHorizontalSwipeRef.current === false) {
            setIsDragging(false);
            setDragOffset(0);
            return;
        }

        setDragOffset(deltaX);
    };

    const onEnd = () => {
        if (!isDragging) return;
        const threshold = 50;
        if (dragOffset < -threshold) nextReview();
        else if (dragOffset > threshold) prevReview();
        setIsDragging(false);
        setDragOffset(0);
        isHorizontalSwipeRef.current = null;
    };

    // Ajuste proporcional según el tamaño total de elementos renderizados
    const translateX = `calc(${-currentIndex * 100 / displayReviews.length}% + ${dragOffset}px)`;

    return (
        <div className='review-panel-wrapper'>

            <h2 className='review-title'>LOS QUE PROBARON EL PREMIO</h2>
            <div className='review-subtitle'><img src={stars}></img> <h3>4.8 - MAS DE 500 USUARIOS FELICES</h3></div> 
            <div className='review-panel-layout'>
                <button className='review-list-button' onClick={prevReview}>
                    <img src={lefttarrow} alt="Atrás" />
                </button>

                <div className='review-list-viewport'
                    onMouseDown={(e) => onStart(e.clientX)}
                    onMouseMove={(e) => onMove(e.clientX)}
                    onMouseUp={onEnd}
                    onMouseLeave={onEnd}
                    onTouchStart={(e) => onStart(e.touches[0].clientX, e.touches[0].clientY)}
                    onTouchMove={(e) => onMove(e.touches[0].clientX, e.touches[0].clientY, true)}
                    onTouchEnd={onEnd}
                >
                    <div
                        className='review-list'
                        onTransitionEnd={handleTransitionEnd}
                        style={{
                            transform: `translate3d(${translateX}, 0, 0)`,
                            transition: (isTransitioning && !isDragging) ? 'transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)' : 'none',
                            cursor: isDragging ? 'grabbing' : 'grab'
                        }}
                    >
                        {displayReviews.map((r, i) => (
                            <div className='review-item' key={`${i}-${r.id}`}>
                                <div className='review-card-inner'>
                                    <img className='review-card-img' src={r.img} />
                                    <div className='stars-row'>
                                        {"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}
                                    </div>
                                    <p className='review-comment'>"{r.comment}"</p>
                                    <div className='review-bottom'>    
                                        <h3 className='review-author'>{r.name}</h3>
                                        <span className='verified-tag'>✓ Comprador verificado</span>
                                    </div>

                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <button className='review-list-button' onClick={nextReview}>
                    <img src={rightarrow} alt="Siguiente" />
                </button>


            </div>

            <Link className='review-action'
                to='/producto/prod_Tl084N7kpNl0JO'>
                QUIERO COMPRAR<img src={rightarrow2}></img>
            </Link>
        </div>
    );
};

export default ReviewPanel;