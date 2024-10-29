import React from 'react'
import Hero from '../components/Hero'
import ImageC from '../components/ImageC'
import { img_data } from "../Data"

function Inicio() {
  return (
    <>
      <Hero />
      <ImageC data={img_data[0]} />
    </>
   
    
  )
}

export default Inicio