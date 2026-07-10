import React, { useState } from 'react';
import '../styles/DifferentSection.css';
import { useIsMobile } from '../hooks/useIsMobile';

import dif1 from '../assets/images/difs/Dif1.png';
import dif2 from '../assets/images/difs/Dif2.png';
import dif3 from '../assets/images/difs/Dif3.png';
import dif4 from '../assets/images/difs/Dif4.png';
import dif5 from '../assets/images/difs/Dif5.png';
import dif6 from '../assets/images/difs/Dif6.png';
import dif7 from '../assets/images/difs/Dif7.png';
import dif8 from '../assets/images/difs/Dif8.png';
import dif9 from '../assets/images/difs/Dif9.png';

import difM from '../assets/images/difs/DifM.png';
import difT from '../assets/images/difs/DifT.png';
import difB from '../assets/images/difs/DifB.png';

import arrow from '../assets/icons/dropdown.svg';

const DifferentSection = () => {
    const isMobile = useIsMobile();

    // Estado para controlar qué columnas están abiertas en móvil (ej. {0: true, 1: false})
    const [openColumns, setOpenColumns] = useState({});

    const toggleColumn = (index) => {
        if (!isMobile) return; // Solo funciona en móvil
        setOpenColumns(prev => ({
            ...prev,
            [index]: !prev[index]
        }));
    };

    const difs = [
        { id: 1, img: dif1, title: "SABOR LIGERO: ", text: "Nada de ahumados ni sabores extraños." },
        { id: 2, img: dif2, title: "NO ES JUGO: ", text: "No es un jugo ni una crema, el sabor viene de las frutas en el alcohol." },
        { id: 3, img: dif3, title: "CALIDAD/PRECIO: ", text: "El sabor como el precio hacen de esta una bebida unica." },
        { id: 4, img: dif4, title: "NO RASPA: ", text: "Es disfrutable al tomarse no cala en la garganta." },
        { id: 5, img: dif5, title: "NO ES PICANTE: ", text: "No necesitamos disimular un mal sabor con picante." },
        { id: 6, img: dif6, title: "COCTEL PREPARADO: ", text: "Se puede tomar asi, o mezclarse con agua mineral solamente para hacer un coctel delicioso." },
        { id: 7, img: dif7, title: "SABOR NATURAL: ", text: "Se utilizan frutas y extractos naturales para darle un sabor real." },
        { id: 8, img: dif8, title: "ALCOHOL: ", text: "Tiene mas alcohol que una bebida regular para disfrutarse tanto como shot o rebajarlo un poco para bebidas." },
        { id: 9, img: dif9, title: "SABOR PREMIUM: ", text: "Al ser un sabor natural y con tequila de calidad, el sabor es como ningun otro." },
    ];

    const columnsData = [
        { title: "DE MEZCALES", img: difM, rows: difs.slice(0, 3) },
        { title: "DE TEQUILAS", img: difT, rows: difs.slice(3, 6) },
        { title: "DE BEBIDAS PREPARADAS", img: difB, rows: difs.slice(6, 9) }
    ];

    return (
        <div className='different-section'>
            <h2>LO QUE NOS DIFERENCIA</h2>
            <div className='different-wrapper'>
                {columnsData.map((col, idx) => {
                    const isOpen = !!openColumns[idx];
                    return (
                        <div
                            key={idx}
                            className={`dif-column ${isOpen ? 'is-open' : ''}`}
                            onClick={() => toggleColumn(idx)}
                        >
                            {/* Cabecera que contendrá la imagen, h3 y la flecha */}
                            <div className='dif-column-header'>
                                <img src={col.img} alt={col.title} />
                                <h3>{col.title}</h3>
                                {isMobile && (
                                    <img src={arrow} className={`dif-arrow ${isOpen ? 'is-open' : ''}`} />
                                )}
                            </div>

                            {/* Contenedor animado para el contenido */}
                            <div className='dif-rows-container'>
                                <div className='dif-rows-content'>
                                    {col.rows.map((dif) => (
                                        <div className='dif-row' key={"dif-" + dif.id}>
                                            <img src={dif.img} alt={dif.title} />
                                            <p><strong>{dif.title}</strong> {dif.text}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default DifferentSection;