import React, { useState, useEffect } from 'react';
import '../styles/TrackingStatus.css';

const TrackingStatus = ({ trackingNumber }) => {
    const [loading, setLoading] = useState(true);
    const [tracking, setTracking] = useState(null);

    const steps = ["Creado", "Enviado", "En tránsito", "En reparto", "Entregado"];

    useEffect(() => {
        // 💡 SI NO HAY GUÍA AÚN: Definimos el estado por defecto como "Creado" en el paso 0 de inmediato
        if (!trackingNumber) {
            setTracking({
                trackUrl: null,
                statusEspañol: "Creado",
                currentStep: 0,
                isErrorStatus: false,
                estimatedDelivery: null
            });
            setLoading(false);
            return;
        }

        const fetchTracking = async () => {
            try {
                setLoading(true);
                const response = await fetch('https://gettrackingstatus-leznyvhhna-uc.a.run.app', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ trackingNumber })
                });

                if (response.status === 200) {
                    const data = await response.json();
                    setTracking(data);
                } else {
                    // Respaldo por si la guía es demasiado nueva y envia.com no la lee aún
                    setTracking({
                        trackUrl: `https://envia.com/rastreo?label=${trackingNumber}`,
                        statusEspañol: "Creado (Guía asignada)",
                        currentStep: 0,
                        isErrorStatus: false
                    });
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchTracking();
    }, [trackingNumber]);

    if (loading) return <div className="dot-typing">
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
    </div>;

    const formatearFechaEntrega = (fechaString) => {
        if (!fechaString) return "No especificada";

        // 1. Extraemos solo la fecha (ej. "2026-05-22")
        const fechaEntrega = fechaString.split(' ')[0];

        // 2. Obtenemos la fecha de hoy en formato YYYY-MM-DD (Hora de México)
        const hoy = new Date().toLocaleDateString('sv-SE', { timeZone: 'America/Mexico_City' });

        // 3. Comparamos
        if (fechaEntrega === hoy) {
            return "Hoy";
        } else {
            const opciones = { year: 'numeric', month: 'long', day: 'numeric' };
            return new Date(fechaEntrega + "T00:00:00").toLocaleDateString('es-MX', opciones);
        }
    };

    if (!tracking) return null;

    const showProgressBar = tracking.currentStep >= 0 && tracking.currentStep < 4;

    return (
        <div className="tracking-section">
                
            {showProgressBar ? (
                <>
                {
                    tracking.estimatedDelivery && (
                        <div className='tracking-delivery'>
                            Entrega estimada: {formatearFechaEntrega(tracking.estimatedDelivery)}
                        </div>
                    )
                }
                <div className='tracking-bar'>
                    <div className='tracking-bar-items'>

                        <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: '5px', backgroundColor: '#e0e0e0', transform: 'translateY(-50%)', zIndex: 1 }} />

                        <div style={{
                            position: 'absolute',
                            top: '50%',
                            left: 0,
                            width: `${(tracking.currentStep / (steps.length - 1)) * 100}%`,
                            height: '5px',
                            backgroundColor: '#e6007e',
                            transform: 'translateY(-50%)',
                            zIndex: 2,
                            transition: 'width 0.4s ease'
                        }} />

                        {steps.map((stepName, index) => {
                            const isActive = index <= tracking.currentStep;
                            return (
                                <div key={index} style={{ zIndex: 3, position: 'relative' }}>
                                    <div style={{
                                        width: '12px',
                                        height: '12px',
                                        borderRadius: '50%',
                                        backgroundColor: isActive ? '#e6007e' : '#b9bfc3',
                                        border: '2px solid #ffffff',
                                        boxShadow: '0 1px 3px rgba(0,0,0,0.15)',
                                        transition: 'background-color 0.3s ease'
                                    }} />
                                </div>
                            );
                        })}
                    </div>

                    {/* Etiquetas de texto abajo de la línea */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '12px' }}>
                        {steps.map((stepName, index) => (
                            <span key={index} style={{
                                width: '80px',
                                textAlign: 'center',
                                fontSize: '16px',
                                fontWeight: index === tracking.currentStep ? 'bold' : 'normal',
                                color: index === tracking.currentStep ? '#e6007e' : '#9d9cad'
                            }}>
                                {stepName}
                            </span>
                        ))}
                    </div>
                </div>
                </>
            ) : (
                <div style={{
                    padding: '8px',
                    textAlign: 'center',
                    fontSize: '18px',
                    color: tracking.statusEspañol === 'Entregado' ? '#137333' : (tracking.isErrorStatus ? '#c5221f' : '#3c4043'),
                    }}>
                       {tracking.currentStep!=4 && "📦 Estado del envío:"} <span style={{fontSize:'24px'}}> {tracking.statusEspañol}</span>
                </div>
            )}
            {tracking.trackUrl && (
                <div className='tracking-button'>
                    <a href={tracking.trackUrl} target="_blank" rel="noreferrer">
                        Ver mas
                    </a>
                </div>
            )}
        </div>
    );
};

export default TrackingStatus;