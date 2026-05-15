import React, { useState, useEffect } from 'react';
import '../styles/ProductTimer.css';

const ProductTimer = ({ deadline }) => {
    // Función para calcular el tiempo restante
    const calculateTimeLeft = () => {
        const difference = (deadline * 1000) - Date.now();
        let timeLeft = {};

        if (difference > 0) {
            timeLeft = {
                horas: Math.floor((difference / (1000 * 60 * 60))),
                minutos: Math.floor((difference / 1000 / 60) % 60),
                segundos: Math.floor((difference / 1000) % 60),
            };
        }
        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setInterval(() => {
            const updatedTime = calculateTimeLeft();
            setTimeLeft(updatedTime);

            // Si el tiempo llega a cero, podrías recargar la página o cambiar un estado
            if (Object.keys(updatedTime).length === 0) {
                clearInterval(timer);
            }
        }, 1000);

        return () => clearInterval(timer);
    }, [deadline]);

    // Si no queda tiempo, no mostramos nada
    if (Object.keys(timeLeft).length === 0) return null;

    return (
        <div className="timer-container">
            <span className="timer-label">La oferta termina en: </span>
            <span className="timer-numbers">
                {timeLeft.horas.toString().padStart(2, '0')}:
                {timeLeft.minutos.toString().padStart(2, '0')}:
                {timeLeft.segundos.toString().padStart(2, '0')}
            </span>
        </div>
    );
};

export default ProductTimer;