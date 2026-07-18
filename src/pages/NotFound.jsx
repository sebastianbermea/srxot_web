import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/NotFound.css';
import botellaCaida from '../assets/images/Botella_404.png';

const NotFound = () => {
    return (
        <div className='not-found-container'>
            <div className='not-found-content'>
        
                <img
                    src={botellaCaida}
                    alt="Botella de Sr. Xot caída"
                    className='not-found-img'
                    draggable="false"
                />

                <h1>404</h1>
                <h2>¡Ups! Alguien se pasó de shots y tiró esta página.</h2>
                <p>El enlace que buscabas no existe o fue movido de su lugar.</p>

            
                <div className='not-found-actions'>
                    <Link to="/" className='btn-404 primary'>VOLVER AL INICIO</Link>
                    <Link to="/tienda" className='btn-404 secondary'>IR A LA TIENDA</Link>
                </div>
            </div>
        </div>
    );
};

export default NotFound;