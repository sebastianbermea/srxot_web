import React, { useEffect } from 'react'
import '../styles/Success.css';
import { useCart } from '../contexts/cartContext';
import { Link, useNavigate } from 'react-router-dom';


function Success() {
    const { clearCart } = useCart();
    
    const navigate = useNavigate();
    useEffect(() => {
        clearCart();
    }, []);

    return (
        <div className='success-wrapper'>
            <h1>Gracias por tu compra!</h1>
            <p>Inicia sesión para tener descuentos, ver tus pedidos, Sr Fiesta premium y guardar tus datos para futuras compras.</p>
            <button className="btn-primary" onClick={()=> navigate('/account')}>
                Iniciar Sesión
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