import React, { useEffect } from 'react'
import '../styles/Success.css';
import { useCart } from '../contexts/cartContext';
import { Link } from 'react-router-dom';

function Success() {
    const { clearCart } = useCart();

    useEffect(() => {
        clearCart();
    }, []);

    return (
        <div className='success-wrapper'>
            <h1>Gracias por tu compra!</h1>
            <Link
                to="/"
            >
                Volver Al Inicio
            </Link>
        </div>
    )
}

export default Success