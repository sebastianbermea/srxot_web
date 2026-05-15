import React, { useState } from 'react'
import '../styles/Cart.css';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../contexts/cartContext';
import { useUser } from '../contexts/userContext';
import closeIcon from '../assets/icons/close_pink.svg';
import { createCheckoutSession } from "../functions/";
import { useNavigate } from 'react-router-dom';
import { logAnon } from "../functions/auth";


import rightarrow from '../assets/icons/right_arrow_pink.svg';
import lefttarrow from '../assets/icons/left_arrow_pink.svg';
import CheckoutGate from './CheckoutGate';
import { costoEnvioGratis } from '../Data';

const Cart = () => {
    const { isOpen, closeCart, cartItems, updateQuantity } = useCart();
    const { user } = useUser();
    const [loading, setLoading] = useState(false);

    const [showGate, setShowGate] = useState(false);
    const navigate = useNavigate();

    const total = cartItems.reduce((acc, item) => {
        const precioParaSumar = item.discount?.active
            ? item.discount.unit_amount
            : item.price.unit_amount;

        return acc + (precioParaSumar / 100 * item.quantity);
    }, 0);
    
    const handleCheckoutClick = async () => {
        if (loading) return;
        // Si el usuario ya está logueado (y no es anónimo), va directo a Stripe
        if (user && !user.isAnonymous) {
            if (!cartItems || cartItems < 1) {
                alert("Selecciona al menos un elemento a comprar");
                return;
            }
            setLoading(true);
            await createCheckoutSession(user.uid, cartItems);
            setLoading(false);
        } else {
            setShowGate(true);
        }
    };

    const handleContinueAsGuest = async () => {
        if (loading) return;
        setLoading(true);
        // Ejecuta el checkout con el UID actual (que será el anónimo)
        try {
            let currentUser = user;
            if (!currentUser) {
                currentUser = await logAnon();
            }
            await createCheckoutSession(currentUser.uid, cartItems);

            setShowGate(false);
        } catch (error) {
            console.error("Error en el proceso de invitado:", error);
            alert("No se pudo procesar el acceso como invitado.");
        } finally {
            setLoading(false);
        }
    };

    const handleGoToAuth = () => {
        setShowGate(false);
        closeCart();
        navigate('/account'); // O la ruta de tu componente Auth
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Fondo semi-transparente (Overlay) */}
                    <motion.div
                        className="cart-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.8 }}
                        exit={{ opacity: 0 }}
                        onClick={closeCart}
                    />

                    {/* Contenedor del Carrito */}
                    <motion.div
                        className="cart-sidebar"
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'tween', duration: 0.3 }}
                    >
                        <div className="cart-header">
                            <h2>Tu Carrito</h2>
                            <button onClick={closeCart}>
                                <img src={closeIcon}></img>
                            </button>
                        </div>

                        <div className="cart-content">
                            {cartItems.length === 0 ? (
                                <p>El carrito está vacío</p>
                            ) : (
                                cartItems.map((item, index) => (
                                    <div key={item+ "-"+index}>
                                        <div className='cart-item-wrapper'>
                                            <div className='cart-item-image'>
                                                <img src={item.images[0]} alt={item.name}></img>
                                            </div>
                                            <div className='cart-item-descripcion'>
                                                <h3>{item.name}</h3>
                                                <div className='price-wrapper'>
                                                    <h4 className={item.discount ? 'price-discount' : ''}>${item.price.unit_amount / 100}.00 MXN</h4>
                                                    {item.discount && (<h4>${item.discount.unit_amount / 100}.00 MXN</h4>)}
                                                </div>

                                                {item.selectedSize && <p>{`Talla: ${item.selectedSize}`}</p>}
                                                <div className='product-quantity'>
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity - 1, item.selectedSize)}
                                                    >
                                                        <img src={lefttarrow}></img>
                                                    </button>
                                                    <input
                                                        type="text"
                                                        className="product-quantity-input"
                                                        value={item.quantity}
                                                        onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1, item.selectedSize)}
                                                    />
                                                   
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity + 1, item.selectedSize)}
                                                    >
                                                        <img src={rightarrow}></img>
                                                    </button>
                                                </div>
                                                {item?.metadata?.stock && item?.metadata?.stock > 0 && item?.metadata?.stock < 20 && <h6>{`Solo ${item.metadata?.stock} disponibles`}</h6>}
                                                <button className='button-eliminate'
                                                    onClick={() => updateQuantity(item.id, 0, item.selectedSize)}
                                                >
                                                    ELIMINAR
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                        <div className="cart-footer">
                            <div className="total-row">
                                <h5>Subtotal:</h5>
                                <h4>${total.toLocaleString()} MXN</h4>
                                <h6>
                                    {total > costoEnvioGratis ? 'Envio gratis' : 'El envio se calculara a partir de la direccion'}
                                </h6>
                            </div>
                            <button
                                className="button-checkout"
                                //onClick={() => handleCheckoutClick()}
                                onClick={() => handleCheckoutClick()}
                            >
                                {loading ? (
                                    <div className="dot-typing">
                                        <div className="dot"></div>
                                        <div className="dot"></div>
                                        <div className="dot"></div>
                                    </div>
                                ) : (
                                    'Ir a pagar'
                                )}
                            </button>
                        </div>
                    </motion.div>
                    <CheckoutGate
                        isOpen={showGate}
                        onClose={() => setShowGate(false)}
                        onContinueAsGuest={handleContinueAsGuest}
                        onGoToAuth={handleGoToAuth}
                        loading={loading}
                    />

                </>
            )}
        </AnimatePresence>
    );
};

export default Cart;