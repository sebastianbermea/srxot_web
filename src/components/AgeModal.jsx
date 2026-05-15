import React, { useState, useEffect } from 'react';
import '../styles/AgeModal.css'; // Importamos el CSS que creamos arriba

const AgeModal = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Buscamos si ya existe la marca en el navegador
        const isVerified = localStorage.getItem('isAgeVerified');

        if (!isVerified) {
            setIsVisible(true);
            // Bloqueamos el scroll del body para que no puedan navegar por detrás
            document.body.style.overflow = 'hidden';
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('isAgeVerified', 'true');
        setIsVisible(false);
        // Devolvemos el scroll al body
        document.body.style.overflow = 'auto';
    };

    const handleExit = () => {
        // Si es menor, lo mandamos a otro lado (ej. Google)
        window.location.href = "https://www.google.com";
    };

    if (!isVisible) return null;

    return (
        <div className="age-modal-overlay">
            <div className="age-modal-content">
                <h2>Verificación de Edad</h2>
                <p>¿Confirmas que eres mayor de 18 años?</p>

                <div className="age-modal-buttons">
                    <button className="age-confirm" onClick={handleAccept}>
                        SÍ, SOY MAYOR DE EDAD
                    </button>
                    <button className="age-reject" onClick={handleExit}>
                        Soy menor de edad / Salir
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AgeModal;