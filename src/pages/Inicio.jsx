import React from 'react'
import Hero from '../components/Hero'
import ImageC from '../components/ImageC'
import { img_data } from "../Data"
import '../styles/Inicio.css';

function Inicio() {
  return (
    <>
      <Hero />
      <ImageC data={img_data[0]} />
      <h2 className='divider'>La unica bebida especial para shots</h2>
      <ImageC data={img_data[1]} />
      <h2 className='divider'>Lleva la fiesta al siguiente nivel</h2>
      <ImageC data={img_data[2]} />
    </>
   
    
  )
}

export default Inicio