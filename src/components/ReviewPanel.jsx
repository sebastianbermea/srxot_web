// import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import { Link } from 'react-router-dom';
import { useIsMobile } from '../hooks/useIsMobile';

// Importa estilos necesarios de Swiper
import 'swiper/css';
import 'swiper/css/navigation';
import '../styles/ReviewPanel.css';

import rightarrow from '../assets/icons/right_arrow_blue.svg';
import lefttarrow from '../assets/icons/left_arrow_blue.svg';
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
import rev9 from '../assets/images/reviews/Review9.jpeg';
import rev10 from '../assets/images/reviews/Review10.jpeg';

const mockReviews = [
    { id: 1, name: "Santiago B.", rating: 5, img: rev1, comment: "El sabor es muy rico, no cala en la garganta." },
    { id: 2, name: "Adan A.", rating: 5, img: rev3, comment: "Muy bien empacado con bolsa de plastico y con papel, al principio me causaba duda pero todo bien." },
    { id: 3, name: "Abby R.", rating: 4, img: rev2, comment: "Si sabe a cantarito, la etiqueta un poco movida pero el liquido es lo que importa, super recomendado." },
    { id: 4, name: "Aldo M.", rating: 5, img: rev4, comment: "Rapido el envio y el tequila muy suave, todos tomaron en la posada, jugamos con los stickers." },
    { id: 5, name: "Karla G.", rating: 5, img: rev5, comment: "Mi abuelito no toma mucho pero le encantó, compraré para mi boda." },
    { id: 6, name: "Francisco L.", rating: 5, img: rev6, comment: "Muy bueno con agua mineral y limon, como coctel ya preparado." },
    { id: 7, name: "Raul V.", rating: 5, img: rev7, comment: "Fui la sensación repartiendo shots." },
    { id: 8, name: "Daniel M.", rating: 5, img: rev8, comment: "Excelente para mi bar, preparo bebidas que se venden mucho." },
    { id: 9, name: "Sofia T.", rating: 5, img: rev9, comment: "Lo recomiendo con ICEE en el cine, delicioso." },
    { id: 10, name: "Lucila B.", rating: 5, img: rev10, comment: "Lo use como regalo de recuerdo en una fiesta, a todos les gusto." }
];

const ReviewPanel = () => {
    const isMobile = useIsMobile();

    return (
        <div className='review-panel-wrapper'>
            <h2 className='review-title'>LOS QUE PROBARON EL PREMIO</h2>
            <div className='review-subtitle'>
                <img src={stars} alt="Estrellas" />
                <h3>4.8 - MAS DE 500 USUARIOS FELICES</h3>
            </div>

            <div className='review-panel-layout'>
                <Swiper
                    key={mockReviews.length}
                    modules={[Autoplay, Navigation]}
                    navigation={{
                        prevEl: '.review-list-button-prev',
                        nextEl: '.review-list-button-next',
                    }}
                    loop={true}
                    autoplay={{ delay: 104000, disableOnInteraction: false }}

                    touchEventsTarget="wrapper"
                    touchStartPreventDefault={false}

                    breakpoints={{
                        0: {
                            slidesPerView: 1.6, 
                            spaceBetween: 18,
                            centeredSlides: true
                        },
                        880: {
                            slidesPerView: 3.3,
                            spaceBetween: 24,
                            centeredSlides: false
                        }
                    }}
                    className="review-swiper"
                >
                    {mockReviews.map((r, i) => (
                        <SwiperSlide key={`${i}-${r.id}`}>
                            <div className='review-item'>
                                <div className='review-card-inner'>
                                    <img
                                        className='review-card-img'
                                        src={r.img}
                                        alt={r.name}
                                        decoding="async"
                                        draggable="false"
                                    />
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
                        </SwiperSlide>
                    ))}
                </Swiper>

            </div>

            

            <div className='buttons-footer'>
                <button className='review-list-button review-list-button-prev'>
                    <img src={lefttarrow} alt="Atrás" />
                </button>
                <button className='review-list-button review-list-button-next'>
                    <img src={rightarrow} alt="Siguiente" />
                </button>
            </div>
            <Link className='review-action' to='/producto/prod_Tl084N7kpNl0JO'>
                QUIERO COMPRAR<img src={rightarrow2} alt="Flecha" />
            </Link>
        </div>
    );
};

export default ReviewPanel;