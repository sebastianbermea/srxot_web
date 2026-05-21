import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import '../styles/Account.css';
import { motion, AnimatePresence } from 'framer-motion';

import { register, login, logout, loginGoogle, forgetPassword } from "../functions/auth";
import { getPaymentsByUID } from "../functions/";
import { useProducts } from "../contexts/productContext";

import { useUser } from '../contexts/userContext';
import { useCart } from '../contexts/cartContext';

import googleIcon from '../assets/icons/google-pink.svg';
import showIcon from '../assets/icons/show_pink.svg';
import hideIcon from '../assets/icons/hide_pink.svg';
import TrackingStatus from '../components/TrackingStatus';

function Account() {
    const { user } = useUser();
    const { products } = useProducts();
    const { cartItems, openCart } = useCart();
    const navigate = useNavigate();

    const [payments, setPayments] = useState([]);

    useEffect(() => {
        async function getPayments() {
            if (!user) return;
            //console.log("user por usar", user.uid);
            const payments = await getPaymentsByUID(user.uid);
            setPayments(payments);
            console.log(payments);
        }
        getPayments();
    }, [user]);

    const [isLogin, setIsLogin] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [emailForReset, setEmailForReset] = useState("");

    const FIREBASE_ERRORS = {
        // Errores de Registro
        'auth/email-already-in-use': 'Este correo ya está registrado. Intenta iniciar sesión.',
        'auth/weak-password': 'La contraseña es muy débil. Usa al menos 6 caracteres.',
        'auth/invalid-email': 'El formato del correo electrónico no es válido.',

        // Errores de Login
        'auth/user-not-found': 'No existe una cuenta con este correo.',
        'auth/invalid-credential': 'Correo y/o contraseña invalidos.',
        'auth/wrong-password': 'La contraseña es incorrecta.',
        'auth/too-many-requests': 'Demasiados intentos fallidos. Intenta más tarde.',

        // Errores de Vinculación (Linking)
        'auth/credential-already-in-use': 'Esta cuenta ya está vinculada a otro usuario.',

        // Error por defecto
        'default': 'Ocurrió un error inesperado. Intenta de nuevo.'
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        const email = e.target.email.value;
        const password = e.target.password.value;
        const username = !isLogin ? e.target.username.value : null;
        try {
            if (isLogin) {
                await login(email, password);
            } else {
                await register(email, password, username);
            }
            navigate("/");
            if (cartItems && cartItems.length > 0) {
                openCart();
            }
        } catch (error) {
            const mensajeAmigable = FIREBASE_ERRORS[error.code] || FIREBASE_ERRORS['default'];
            setError(mensajeAmigable);
        } finally {
            setLoading(false);
        }
    };

    const handleGoogle = async () => {
        setLoading(true);
        try {
            await loginGoogle();
            navigate("/");
            if (cartItems && cartItems.length > 0) {
                openCart();
            }
        } catch (error) {
            const mensajeAmigable = FIREBASE_ERRORS[error.code] || FIREBASE_ERRORS['default'];
            setError(mensajeAmigable);
        } finally {
            setLoading(false);
        }
    };

    const sendMailForget = async () => {
        if (!emailForReset) {
            alert("Por favor, ingresa tu correo electrónico.");
            return;
        }

        try {
            await forgetPassword(emailForReset);
            console.log("Enviando correo a:", emailForReset);

            alert("Si el correo existe, recibirás instrucciones en breve.");
            setIsModalOpen(false);
            setEmailForReset("");
        } catch (error) {
            console.error(error);
            alert("Ocurrió un error al intentar enviar el correo.");
        }
    };

    return (
        <>
            {user && !user.isAnonymous ?
                <div className='user-panel'>
                    <div className='user-header'>
                        <h1>Mi cuenta</h1>
                        <h2>{user.displayName}</h2>
                    </div>
                    <div className='user-container'>
                        <h3>Mis compras</h3>
                        {payments.length > 0 &&
                            payments.map((payment, k) => (
                                <div className="payment-container"
                                    key={"payment: " + k}
                                >
                                  
                                    <h4>{new Date(payment.created * 1000).toLocaleDateString('es-MX', {
                                        day: '2-digit',
                                        month: 'long',
                                        year: 'numeric'
                                    })}</h4>
                                    <div className="payment-items-container">
                                        {payment.items.map((item, i) => {
                                            const productItem = products.find(p => p.id === item.price.product);
                                            return (
                                                <div key={i + "-" + item.id} className="payment-item">
                                                    
                                                    <div className='payment-item-front'>

                                                        <img
                                                            src={productItem?.images[0]}
                                                            alt={item.description}
                                                            className="payment-item-image"
                                                        />
                                                        <h5>{item.description}</h5>
                                                    </div>
                                                    <p>x{item.quantity}</p>
                                                </div>
                                            );
                                        })}
                                    </div>
                                    <TrackingStatus trackingNumber={payment.tracking_number}/>
                                </div>
                            ))}
                        <button
                            onClick={() => logout()}
                        >
                            Cerrar Sesion
                        </button>
                    </div>

                </div> :
                <div className="auth-container">
                    <motion.div
                        layout // Anima el cambio de tamaño del contenedor automáticamente
                        className="auth-card"
                    >
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={isLogin ? 'login' : 'register'}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.3 }}
                            >
                                <h1>{isLogin ? 'Inicio de Sesión' : 'Crear Cuenta'}</h1>

                                <form className="auth-form" onSubmit={(e) => handleSubmit(e)}>
                                    {!isLogin && (
                                        <input name='username' type="text" placeholder="Nombre completo" required />
                                    )}
                                    <input name='email' type="email" placeholder="Correo electrónico" required />
                                    <div className='password-forget-wrapper'>
                                        <div className="password-wrapper">
                                            <input
                                                name="password"
                                                type={showPassword ? "text" : "password"}
                                                placeholder="Contraseña"
                                                required
                                            />
                                            <button
                                                type="button"
                                                className="toggle-password"
                                                onClick={() => setShowPassword(!showPassword)}
                                                tabIndex="-1" // Evita que el tabulador se detenga aquí
                                            >
                                                <img src={showPassword ? hideIcon : showIcon} />
                                            </button>

                                        </div>
                                        {isLogin && <button
                                            type="button"
                                            className="btn-forget"
                                            onClick={() => {
                                                setIsModalOpen(!isModalOpen);
                                                setError("");
                                            }}
                                        >
                                            Olvide mi contraseña
                                        </button>}
                                    </div>
                                    <AnimatePresence>
                                        {error && (
                                            <motion.div
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: 'auto' }}
                                                exit={{ opacity: 0, height: 0 }}
                                                className="error-badge"
                                            >
                                                {error}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                    <div className="auth-actions">
                                        <button type="submit" className="btn-primary">
                                            {loading ? (
                                                <div className="dot-typing">
                                                    <div className="dot"></div>
                                                    <div className="dot"></div>
                                                    <div className="dot"></div>
                                                </div>
                                            ) : (
                                                isLogin ? 'Iniciar Sesión' : 'Registrarse'
                                            )}
                                        </button>
                                        <button type="button" className="btn-google"
                                            onClick={handleGoogle}
                                        >
                                            <img src={googleIcon} alt="Google" />
                                            {isLogin ? 'Inicia sesión con Google' : 'Regístrate con Google'}
                                        </button>

                                        <button
                                            type="button"
                                            className="btn-link"
                                            onClick={() => {
                                                setIsLogin(!isLogin);
                                                setError("");
                                            }}
                                        >
                                            {isLogin ? '¿No tienes cuenta? Crea una' : '¿Ya tienes cuenta? Inicia sesión'}
                                        </button>
                                    </div>
                                </form>
                            </motion.div>
                        </AnimatePresence>
                    </motion.div>
                </div>
            }
            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="recovery-modal auth-form">
                        <h2>Recuperar cuenta</h2>
                        <p>Enviaremos instrucciones a tu correo.</p>
                        <input
                            type="email"
                            placeholder="ejemplo@correo.com"
                            value={emailForReset} // <--- Conectado al estado
                            onChange={(e) => setEmailForReset(e.target.value)} // <--- Captura lo que escribes
                            required
                        />
                        <div className="recovery-buttons">
                            <button className="send" onClick={() => sendMailForget()}>Enviar</button>
                            <button className="cancel" onClick={() => setIsModalOpen(false)}>Cancelar</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Account