import React from 'react';
import '../styles/Qualities.css';

import qual1 from '../assets/images/qualities/quality_icon1.png';
import qual2 from '../assets/images/qualities/quality_icon2.png';
import qual3 from '../assets/images/qualities/quality_icon3.png';
import qual4 from '../assets/images/qualities/quality_icon4.png';

const Qualities = () => {
    const quals = [
        { id: 1, img: qual1, title: "SABOR PREMIUM", text: "Se utlizan frutas frescas e ingredientes naturales de calidad para darle nuestro sabor premium caracteriztico. Ademas de tener sabores unicos." },
        { id: 2, img: qual2, title: "NO RASPA", text: "Se combinan los sabores naturales y el porcentaje de alcohol para hacer que esta botella no cale en la garganta y sea disfrutable para cualquier paladar." },
        { id: 3, img: qual3, title: "DINAMICAS", text: "La botella tiene 12 stickers con numeros por la parte de atras, se pueden usar para determinar segundos, shots o lo que se les venga a la mante, o se pueden utilizar los retos de esta pagina." },
        { id: 4, img: qual4, title: "VERSATIL", text: "Se puede tomar directamente de shot ya que es un sabor disfrutable, o se puede usar para preparar cocteles facilmente solo con agua mineral o algunos otros pocos ingredientes." },
    ];

    return (
        <div>
            <h2 className='qualities-title'>PORQUE SR XOT</h2>
            <div className='qualities-wrapper'>
                {quals.map((qual) => (
                    <div className='qual-row' key={"qual-" + qual.id}>
                        <img src={qual.img}></img>
                        <h4><strong>{qual.title}</strong></h4>
                        <p>{qual.text}</p>
                    </div>
                )
                )}
            </div>
        </div>
    );
};

export default Qualities;