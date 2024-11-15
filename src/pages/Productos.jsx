import React from 'react'
import srxotcantarito from '../assets/images/Bottle3.jpg';
import saborcantarito from '../assets/images/saborCantarito.png';
import '../styles/Productos.css';

function Productos() {
  return (
    <div className='products'>
        <div className='product-item'>
            <div className='product-img'>
                  <img src={srxotcantarito} alt="Sr. Xot cantarito" />
            </div>
             
              <div className='product-data'>
                  <img src={saborcantarito} alt="Sabor cantarito" />
                    <p>
                      Inspirado en la bebida iconica de Tequila, Jalisco,  el sabor cantarito combina los sabores citricos y dulces de la toronja el limon la naranja, con algunos toques de chile.  Combinado con el tequila suave de srxot es difrutable para cualquier paladar. 
                    </p>
              </div>
            </div>        
        </div>
  )
}

export default Productos