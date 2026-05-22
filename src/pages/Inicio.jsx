import React from 'react'
import Hero from '../components/Hero'
import '../styles/Inicio.css';
import EnvioBanner from '../components/EnvioBanner';
import ListProductPopular from '../components/ListProductPopular';
import Imagen3D from '../components/Imagen3d';
import Instagram from '../components/Instagram';
import ImageFooter from '../components/ImageFooter';

import img from '../assets/images/banners/BottomBanner.jpg';

function Inicio() {
  return (
    <>
      <Hero />
     <EnvioBanner/>
     <ListProductPopular/>
     <Imagen3D/>
     <Instagram/>
     <ImageFooter data={{img:img}}/>
    </>
   
    
  )
}

export default Inicio