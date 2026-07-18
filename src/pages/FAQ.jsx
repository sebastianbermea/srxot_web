import React, { useState } from 'react';
import '../styles/FAQ.css';
import arrow from '../assets/icons/dropdown.svg';

function FAQ() {
    // Estado global para controlar qué preguntas están abiertas en cualquier dispositivo[cite: 5]
    const [openQuestions, setOpenQuestions] = useState({});

    const toggleQuestion = (index) => {
        setOpenQuestions(prev => ({
            ...prev,
            [index]: !prev[index]
        }));
    };

    const mockQuestions = [
        {
            id: 1,
            question: "¿Cuál es el tiempo de envío?",
            answer: "Tu pedido será procesado dentro de las próximas 24 horas (en días laborables) y entregado en un plazo de 5 a 10 días hábiles."
        },
        {
            id: 2,
            question: "¿Qué pasa si no estoy satisfecho con Sr. Xot?",
            answer: "¡Tu satisfacción está garantizada! Si no estás conforme, tienes hasta 30 días a partir de la compra para solicitar un reembolso o cambio. Solo envía un WhatsApp al 844 678 5189 con: motivo, lugar y fecha de compra, comprobante de pago y una foto del producto."
        },
        {
            id: 3,
            question: "¿Y si la botella llega dañada?",
            answer: "Tu pedido está respaldado por nuestro control de calidad. Para enviarte una reposición de inmediato, repórtalo vía WhatsApp al 844 678 5189 dentro de los 30 días posteriores a tu compra, incluyendo tu comprobante de pago y una foto clara de la botella dañada."
        },
        {
            id: 4,
            question: "¿Qué tequila es?",
            answer: "Es un tequila premium 100% originario de los Altos de Jalisco."
        },
        {
            id: 5,
            question: "¿Qué licor es?",
            answer: "La base se elabora a partir de un espíritu neutro (vodka puro) macerado con frutas naturales. Posteriormente, esta infusión se mezcla con nuestro tequila premium para dar vida a Sr. Xot."
        },
        {
            id: 6,
            question: "¿Cómo se toma?",
            answer: "Es muy versátil: puedes tomarlo directo como shot (ideal para jugar con los stickers) o preparar un cóctel rápido agregando solo agua mineral o el refresco de tu elección, ya que Sr. Xot aporta todo el sabor."
        },
        {
            id: 7,
            question: "¿Quién lo puede tomar?",
            answer: "Sr. Xot es para TODOS (mayores de 18 años claro). Gracias a su balance premium, no raspa la garganta y es una bebida que cualquiera puede disfrutar."
        },
        {
            id: 8,
            question: "¿Tiene azúcar?",
            answer: "Sí. Además del dulzor natural de las frutas, Sr. Xot incorpora una cantidad moderada de azúcar para lograr la consistencia e intensidad de un buen licor."
        },
        {
            id: 9,
            question: "¿Dónde lo puedo comprar?",
            answer: "Actualmente contamos con puntos de venta físicos en el norte de México (Saltillo y Monterrey). Puedes consultar las ubicaciones exactas y más detalles en nuestro Instagram."
        },
        {
            id: 10,
            question: "¿Puedo hacer un pedido grande?",
            answer: "Sí, claro. Escríbenos por WhatsApp al 844 678 5189 para cotizar pedidos mayoristas o para personalizar botellas destinadas a eventos, fiestas o bares."
        },
        {
            id: 11,
            question: "¿Me puedo hacer distribuidor?",
            answer: "¡Por supuesto! Ponte en contacto con nosotros a través del 844 678 5189 y te compartiremos toda la información y planes comerciales para ser distribuidor autorizado."
        },
    ];

    return (
        <div className='faq'>
            <h1>Preguntas Frecuentes</h1>
            <div className='faq-questions'>
                {mockQuestions.map((q, i) => {
                    const isOpen = !!openQuestions[i];
                    return (
                        <div
                            className={`faq-question ${isOpen ? 'is-open' : ''}`}
                            key={"faq-question-" + i}
                            onClick={() => toggleQuestion(i)}
                        >
                            {/* Cabecera de la pregunta */}
                            <div className='faq-question-header'>
                                <h3>{q.question}</h3>
                                <img
                                    src={arrow}
                                    className={`faq-arrow ${isOpen ? 'is-open' : ''}`}
                                    alt="Desplegar"
                                />
                            </div>

                            {/* Contenedor animado para la respuesta */}
                            <div className='faq-answer-container'>
                                <div className='faq-answer-content'>
                                    <h4>{q.answer}</h4>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default FAQ;