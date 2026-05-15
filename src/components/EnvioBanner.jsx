import React from 'react';
import '../styles/EnvioBanner.css'; // Optional: for styling
import shot from '../assets/icons/shot.svg';
import { costoEnvioGratis } from '../Data';

const EnvioBanner = () => {

    const renderBloques = () => {
        let bloques = [];
        for (let i = 0; i < 5; i++) {
            bloques.push(<div className='banner_item' key={"Banner: " + i}>
                <h2>ENVIO GRATIS EN LA COMPRA DE ${costoEnvioGratis.toLocaleString()} MXN</h2>
                <img src={shot}></img>
            </div>);
            
        }
        return bloques;
    };

    return (
        <div className='banner'>
            <div className='banner_tracker'>
                <div className='banner-group'>
                    {renderBloques()}
                </div>
                <div className='banner-group'>
                    {renderBloques()}
                </div>
            </div>
        
        </div>
    );
};

export default EnvioBanner;