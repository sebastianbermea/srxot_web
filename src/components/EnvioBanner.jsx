import React from 'react';
import '../styles/EnvioBanner.css';
import shot from '../assets/icons/shot.svg';
import { costoEnvioGratis } from '../Data';

const EnvioBanner = () => {
    // Creamos un array simple de 5 elementos para iterar de forma limpia en React
    const items = Array(5).fill(null);

    return (
        <div className='banner'>
            <div className='banner_tracker'>

                {/* 🚀 GRUPO 1: Una sola caja hermética */}
                <div className='banner-group'>
                    {items.map((_, i) => (
                        <div className='banner_item' key={`group-1-${i}`}>
                            <h2>ENVIO GRATIS EN LA COMPRA DE ${costoEnvioGratis.toLocaleString()} MXN</h2>
                            <img src={shot} alt="shot" />
                        </div>
                    ))}
                </div>

                {/* 🚀 GRUPO 2: El clon exacto para el bucle infinito */}
                <div className='banner-group'>
                    {items.map((_, i) => (
                        <div className='banner_item' key={`group-2-${i}`}>
                            <h2>ENVIO GRATIS EN LA COMPRA DE ${costoEnvioGratis.toLocaleString()} MXN</h2>
                            <img src={shot} alt="shot" />
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default EnvioBanner;