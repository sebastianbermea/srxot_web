import React, { useEffect } from 'react'
import '../styles/Success.css';
import { useCart } from '../contexts/cartContext';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/userContext';

function Success() {
    const { clearCart } = useCart();
    const { user } = useUser();

    const navigate = useNavigate();
    useEffect(() => {
        clearCart();
    }, []);

    return (
        <div className='success-wrapper'>
            <h1>Gracias por tu compra!</h1>
            {(!user || user?.isAnonymous) && (
                <p>Inicia sesión para tener descuentos, ver tus pedidos, Sr Fiesta premium y guardar tus datos para futuras compras.</p>)}

                <button className="btn-primary" onClick={() => navigate('/account')}>
                {(!user || user?.isAnonymous) ? 'Iniciar Sesión' : 'Ver mi pedido'}
                </button>
            <Link
                to="/"
            >
                Volver Al Inicio
            </Link>
        </div>
    )
}

export default Success