import React from 'react'
import Hero from '../components/Hero'
import '../styles/Inicio.css';
import EnvioBanner from '../components/EnvioBanner';
import ListProductPopular from '../components/ListProductPopular';
import Imagen3D from '../components/Imagen3d';
import Instagram from '../components/Instagram';
import ImageFooter from '../components/ImageFooter';

import img from '../assets/images/banners/BottomBanner.jpg';
import HeroVideo from '../components/HeroVideo';
import ReviewPanel from '../components/ReviewPanel';
import PlaySection from '../components/PlaySection';
import DifferentSection from '../components/DifferentSection';
import Qualities from '../components/Qualities';
import FaqPanel from '../components/FaqPanel';

function Inicio() {
  return (
    <>
      <HeroVideo />
      <EnvioBanner />
      <Imagen3D />
      <ListProductPopular />
      <ReviewPanel />
      
      <Qualities />
      <Hero />
      <DifferentSection />
      <FaqPanel/>
      <Instagram />
      <ImageFooter data={{ img: img }} />
    </>


  )
}

export default Inicio