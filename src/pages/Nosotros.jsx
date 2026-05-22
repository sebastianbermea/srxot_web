import React from 'react'
import '../styles/Nosotros.css';
import img from '../assets/images/banners/BottomBanner5.jpg';
import ImageFooter from '../components/ImageFooter';

function Nosotros() {
  return (
    <>

      <div className='nosotros'>
        <h1>Nosotros</h1>
        <p>
          Somos una empresa de jovenes que busca la innovación, no solo en los sabores, si no en la forma que vives la fiesta, con una botella con dinámicas, con multiples productos extra que complementan las reuniones, con participaciones en redes sociales. Permitiendo vivir experiencias únicas, retos divertidos y desafiantes que llevaran al limite tu valentía.
        </p>
      </div>
      <ImageFooter data={{ img: img }} />
    </>
  )
}

export default Nosotros