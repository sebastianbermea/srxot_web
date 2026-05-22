import React, { useState, useEffect, useRef } from 'react';
import '../styles/ListProductPopular.css';
import { useIsMobile } from '../hooks/useIsMobile';

import { trackProductClick } from '../functions/events';
import { useCart } from '../contexts/cartContext';

import rightarrow from '../assets/icons/right_arrow_pink.svg';
import best_icon from '../assets/icons/Best-seller.svg';
import stock_icon from '../assets/icons/casi-agotado.svg';
import lefttarrow from '../assets/icons/left_arrow_pink.svg';

import { Link } from 'react-router-dom';
import { useProducts } from "../contexts/productContext";

const ListProductPopular = () => {
    const { products } = useProducts();
    const { addToCart } = useCart();

    const originalItems = products.filter(p => p.metadata?.popular === "true");
    const displayProducts = [...originalItems, ...originalItems];

    const [currentIndex, setCurrentIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [dragOffset, setDragOffset] = useState(0);

    // 🚀 NUEVOS REFS: Para detectar la dirección del dedo y bloquear el scroll de Safari
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
        }, 6200);
    };

    useEffect(() => {
        if (!isDragging) {
            startAutoPlay();
        } else {
            stopAutoPlay();
        }
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

    const nextProduct = () => {
        if (isTransitioning) return;
        stopAutoPlay();
        setIsTransitioning(true);
        setCurrentIndex(prev => prev + 1);
    };

    const prevProduct = () => {
        if (isTransitioning) return;
        stopAutoPlay();
        setIsTransitioning(true);
        setCurrentIndex(prev => prev - 1);
    };

    // 🚀 HANDLERS MEJORADOS PARA EVITAR EL "CLUMSY" Y EL MOVE DIAGONAL
    const onStart = (x, y = 0) => {
        setIsDragging(true);
        setStartX(x);
        startYRef.current = y;
        isHorizontalSwipeRef.current = null; // Reseteamos la dirección del scroll
        setDragOffset(0);
    };

    const onMove = (x, y = 0, isTouch = false) => {
        if (!isDragging) return;

        const deltaX = x - startX;
        const deltaY = y - startYRef.current;

        // Si es touch, detectamos si el usuario va hacia los lados o hacia abajo
        if (isTouch && isHorizontalSwipeRef.current === null) {
            // Si el movimiento en X es mayor que en Y, el usuario quiere ver más productos
            if (Math.abs(deltaX) > Math.abs(deltaY)) {
                isHorizontalSwipeRef.current = true;
            } else if (Math.abs(deltaY) > Math.abs(deltaX)) {
                isHorizontalSwipeRef.current = false;
            }
        }

        // Si determinamos que el usuario va hacia abajo, cancelamos el arrastre del carrusel
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
        if (dragOffset < -threshold) nextProduct();
        else if (dragOffset > threshold) prevProduct();
        setIsDragging(false);
        setDragOffset(0);
        isHorizontalSwipeRef.current = null;
    };

    const translateX = `calc(${-currentIndex * 100 / displayProducts.length}% + ${dragOffset}px)`;

    if (originalItems.length === 0) return null;

    return (
        <div className='popular-list-wrapper'>
            <div className='title'>
                <h2>Populares</h2>
            </div>
            <div className='popular-list-layout'>
                <button className='popular-list-button' onClick={prevProduct}>
                    <img src={lefttarrow} alt="Atrás" />
                </button>

                <div className='popular-list-viewport'
                    onMouseDown={(e) => onStart(e.clientX)}
                    onMouseMove={(e) => onMove(e.clientX)}
                    onMouseUp={onEnd}
                    onMouseLeave={onEnd}
                    onTouchStart={(e) => onStart(e.touches[0].clientX, e.touches[0].clientY)}
                    onTouchMove={(e) => onMove(e.touches[0].clientX, e.touches[0].clientY, true)}
                    onTouchEnd={onEnd}
                >
                    <div
                        className='popular-list'
                        onTransitionEnd={handleTransitionEnd}
                        style={{
                            transform: `translate3d(${translateX}, 0, 0)`, // 🚀 Cambiado a translate3d para fluidez GPU
                            transition: (isTransitioning && !isDragging) ? 'transform 0.5s ease-in-out' : 'none',
                            cursor: isDragging ? 'grabbing' : 'grab'
                        }}
                    >
                        {displayProducts.map((p, i) => (
                            <div className='popular-item' key={`${i}-${p.id}`}>
                                <div className='popular-item-img-viewport'>
                                    <Link
                                        onClick={() => trackProductClick(p, p.discount?.active)}
                                        to={`/producto/${p.id}`}
                                    >
                                        <img src={p.images[0]} alt={p.name} decoding="sync" />
                                    </Link>
                                </div>
                                {p.metadata?.best && <img className='best-icon' src={best_icon} alt="Best Seller" />}
                                {p.metadata?.stock && p.metadata?.stock > 0 && p.metadata?.stock < 20 && <img className='casi-agotado' src={stock_icon} alt="Casi Agotado" />}
                                <h3>{p.name}</h3>
                                <div className='price-wrapper'>
                                    <h4 className={p.discount ? 'price-discount' : ''}>
                                        ${p.price.unit_amount / 100}.00 MXN
                                    </h4>
                                    {p.discount && <h4>${p.discount.unit_amount / 100}.00 MXN</h4>}
                                </div>
                                <button
                                    onClick={() => addToCart(p, 1)}
                                    className={`popular-item-button ${p.metadata?.stock == 0 ? 'out-stock-button' : ''}`}
                                    disabled={p.metadata?.stock == 0}
                                >
                                    {p.metadata?.stock == 0 ? "Agotado" : "Añadir al carrito"}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                <button className='popular-list-button' onClick={nextProduct}>
                    <img src={rightarrow} alt="Siguiente" />
                </button>
            </div>
            <div className='popular-footer'>
                <Link to="/tienda">Ver todo</Link>
            </div>
        </div>
    );
};

export default ListProductPopular;