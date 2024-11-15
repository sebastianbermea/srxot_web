import React from 'react'
import '../styles/Nosotros.css';
import srxotfoto from '../assets/images/Friends.jpg';

function Nosotros() {
  return (
    <div className='nosotros'>
        <h1>Nosotros</h1>
        <p>
              Somos una empresa de jovenes que busca la innovación, no solo en los sabores, si no en la forma que vives la fiesta, con una botella con dinámicas, con multiples productos extra que complementan las reuniones, con participaciones en redes sociales. Permitiendo vivir experiencias únicas, retos divertidos y desafiantes que llevaran al limite tu valentía.
        </p>
          <img src={srxotfoto} alt="Sr xot friends" />
    </div>
  )
}

export default Nosotros