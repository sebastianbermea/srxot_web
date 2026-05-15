import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/CheckoutGate.css';

const CheckoutGate = ({ isOpen, onClose, onContinueAsGuest, onGoToAuth, loading }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="modal-overlay"
                    onClick={onClose}>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="auth-card modal-content"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h2>Antes de finalizar...</h2>
                        <p>Inicia sesión para tener descuentos, rastrear tu pedido y guardar tus datos para futuras compras.</p>

                        <div className="auth-actions">
                            <button className="btn-primary" onClick={onGoToAuth}>
                                Iniciar Sesión
                            </button>

                            <button className="btn-link" onClick={onContinueAsGuest}>
                                {loading ? (
                                    <div className="dot-typing">
                                        <div className="dot"></div>
                                        <div className="dot"></div>
                                        <div className="dot"></div>
                                    </div>
                                ) :('Continuar como invitado')}
                            </button>
                        </div>

                        <button className="close-x" onClick={onClose}>&times;</button>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default CheckoutGate;