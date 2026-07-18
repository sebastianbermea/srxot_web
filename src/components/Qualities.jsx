import React from 'react';
import '../styles/Qualities.css';

import qual1 from '../assets/images/qualities/quality_icon1.png';
import qual2 from '../assets/images/qualities/quality_icon2.png';
import qual3 from '../assets/images/qualities/quality_icon3.png';
import qual4 from '../assets/images/qualities/quality_icon4.png';

const Qualities = () => {
    const quals = [
        { id: 1, img: qual1, title: "SABOR PREMIUM", text: "Frutas e ingredientes naturales de calidad para darle su sabor premium. Ademas de sabores unicos." },
        { id: 2, img: qual2, title: "NO RASPA", text: "Lo natural, la calidad y el poco alcohol se combinan para que sea disfrutable para cualquier paladar." },
        { id: 3, img: qual3, title: "DINAMICAS", text: "Tiene 12 stickers con numeros, se pueden usar para determinar segundos, shots o los retos en esta pagina." },
        { id: 4, img: qual4, title: "VERSATIL", text: "Se puede tomar de shot, o se puede usar para preparar cocteles facilmente con pocos ingredientes." },
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