import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import { Link } from 'react-router-dom';
import { useIsMobile } from '../hooks/useIsMobile';

// Importa estilos de Swiper
import 'swiper/css';
import 'swiper/css/navigation';
import '../styles/ListProductPopular.css';

import { trackProductClick } from '../functions/events';
import { useCart } from '../contexts/cartContext';
import { useProducts } from "../contexts/productContext";

import rightarrow from '../assets/icons/right_arrow_pink.svg';
import best_icon from '../assets/icons/Best-seller.svg';
import stock_icon from '../assets/icons/casi-agotado.svg';
import lefttarrow from '../assets/icons/left_arrow_pink.svg';
import cart_icon from '../assets/icons/cart_white.svg';

const ListProductPopular = () => {
    const isMobile = useIsMobile();
    const { products } = useProducts();
    const { addToCart } = useCart();

    const popularItems = products.filter(p => p.metadata?.popular === "true");

    if (popularItems.length === 0) return null;

    return (
        <div className='popular-list-wrapper'>
            <div className='title'>
                <h2>Populares</h2>
            </div>

            <div className='popular-list-layout'>
                <button className='popular-list-button popular-list-button-prev'>
                    <img src={lefttarrow} alt="Atrás" />
                </button>
                <Swiper
                    key={popularItems.length}
                    modules={isMobile ? [Autoplay] : [Autoplay, Navigation]}
                    navigation={isMobile ? false : {
                        prevEl: '.popular-list-button-prev',
                        nextEl: '.popular-list-button-next',
                    }}

                    loop={true}
                    loopedSlides={4}
                    autoplay={{ delay: 5000, disableOnInteraction: false }}

                    touchEventsTarget="wrapper"
                    touchStartPreventDefault={false}
                    breakpoints={{
                        0: {
                            slidesPerView: 2.4,
                            spaceBetween: 16,
                            centeredSlides: true // 🎯 Móvil: Centra un producto y muestra las mitades de los lados
                        },
                        880: {
                            slidesPerView: 4,
                            spaceBetween: 20,
                            centeredSlides: false // 🎯 PC: Muestra los 4 productos normales alineados
                        }
                    }}
                    className="popular-swiper"
                >
                    {popularItems.map((p, i) => (
                        <SwiperSlide key={`${i}-${p.id}`}>
                            <div className='popular-item'>
                                <div className='popular-item-img-viewport'>
                                    <Link onClick={() => trackProductClick(p, p.discount?.active)} to={`/producto/${p.id}`}>
                                        <img src={p.images[0]} alt={p.name} decoding="async" draggable="false" />
                                    </Link>

                                    {/* 🎯 Stickers dentro de la caja de imagen para no desbordar */}
                                    {p.metadata?.best && <img className='best-icon' src={best_icon} alt="Best Seller" />}
                                    {p.metadata?.stock && p.metadata?.stock > 0 && p.metadata?.stock < 20 && <img className='casi-agotado' src={stock_icon} alt="Casi Agotado" />}
                                </div>

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
                                    <strong>{p.metadata?.stock == 0 ? "AGOTADO" : "AÑADIR"}</strong>  <img src={cart_icon} alt="Carrito"></img>
                                </button>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>

                <button className='popular-list-button popular-list-button-next'>
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